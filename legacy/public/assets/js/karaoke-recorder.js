(() => {
  const get = id => document.getElementById(id);
  const start = get('start-recording'), stop = get('stop-recording');
  if (!start || !stop) return;
  const status = get('recording-status'), timer = get('record-timer');
  const result = get('recording-result'), playback = get('playback');
  const download = get('download-recording'), retry = get('retry-recording-upload');
  let phase = 'idle', recorder = null, context = null, destination = null;
  let microphone = null, sharedTab = null, voiceGain = null, backingGain = null;
  let mixedCapture = null, voiceCapture = null, captureInfo = null, analyser = null, meterSamples = null;
  let clock = null, limit = null, startedAt = 0, previewUrl = null, lastTake = null;
  const locked = new Map();
  const busy = () => phase !== 'idle';
  window.StudioRecorder = { busy };

  function syncControls() {
    start.disabled = busy() || !Number(window.CURRENT_SONG_ID);
    stop.disabled = phase !== 'recording';
    retry.disabled = busy();
    get('recording-panel').dataset.state = phase;
    const selectors = '.song-item button, #delete-selected-btn, #show-upload-btn, #sort-dropdown, #song-search, #search-icon-btn, .song-pagination button, #collection-add-form input, #collection-add-form button';
    if (busy()) {
      document.querySelectorAll(selectors).forEach(element => {
        if (!locked.has(element)) locked.set(element, element.disabled);
        element.disabled = true;
      });
    } else {
      locked.forEach((disabled, element) => { element.disabled = disabled; });
      locked.clear();
    }
  }

  async function releaseDevices() {
    clearInterval(clock); clearTimeout(limit);
    for (const capture of [mixedCapture, voiceCapture]) {
      if (capture?.recorder.state === 'recording') capture.recorder.stop();
    }
    for (const stream of [microphone, sharedTab, destination?.stream]) {
      stream?.getTracks().forEach(track => track.stop());
    }
    microphone = null; sharedTab = null; destination = null;
    if (context && context.state !== 'closed') await context.close().catch(() => {});
    context = null; voiceGain = null; backingGain = null; analyser = null; meterSamples = null;
    get('voice-level-meter').value = 0;
  }

  function bindPreview(blob, filename) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(blob);
    playback.src = previewUrl;
    download.href = previewUrl;
    download.download = filename;
    result.hidden = false;
  }

  function filenameFor(take, extension) {
    const title = take.title.replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '-').slice(0, 70) || 'Karaoke-performance';
    return `${title}-${take.timestamp}.${extension}`;
  }

  function triggerDownload() {
    const link = document.createElement('a');
    link.href = download.href;
    link.download = download.download;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function uploadTake(take) {
    phase = 'saving'; syncControls();
    status.textContent = 'Saving your mix and preparing the download...';
    retry.hidden = true;
    for (const id of ['recording-history-link', 'recording-leaderboard-link']) {
      if (get(id)) get(id).hidden = true;
    }
    get('recording-score-value').textContent = '--';
    get('recording-result-heading').textContent = 'Preparing your performance...';
    get('recording-save-note').textContent = '';
    const form = new FormData();
    form.append('audio', take.blob, `mixed-recording.${take.extension}`);
    form.append('voice_audio', take.voiceBlob, `microphone.${take.extension}`);
    form.append('song_id', take.songId);
    form.append('audio_mix', 'voice_and_backing');
    try {
      const response = await fetch('upload_and_score.php', { method: 'POST', body: form, cache: 'no-store' });
      let data;
      try { data = await response.json(); }
      catch { throw new Error('The server could not save this recording. Please retry the upload.'); }
      if (!response.ok || !data.success) throw new Error(data.error || 'Unable to upload the recording.');
      if (!Number.isInteger(data.score) || data.score < 0 || data.score > 100 || data.score_type !== 'voice_level') {
        throw new Error('The recording response was incomplete. Please retry.');
      }
      let exportBlob = take.blob, extension = take.extension;
      let formatNote = 'WAV';
      try {
        // The saved audio URL may be Supabase; WAV downloads stay on this server.
        const audioUrl = new URL(data.download_url || data.audio_url, window.location.href);
        if (audioUrl.origin !== window.location.origin) throw new Error('Invalid recording URL.');
        const audioResponse = await fetch(audioUrl, { cache: 'no-store' });
        if (!audioResponse.ok) throw new Error('WAV download unavailable.');
        exportBlob = await audioResponse.blob();
        if (!exportBlob.size) throw new Error('Empty audio export.');
        extension = 'wav';
      } catch {
        formatNote = take.extension.toUpperCase();
      }
      bindPreview(exportBlob, filenameFor(take, extension));
      triggerDownload();
      get('recording-score-value').textContent = String(data.score);
      const historySaved = data.history_saved !== false;
      get('recording-result-heading').textContent = historySaved ? 'Upload completed' : 'Audio saved; history pending';
      get('recording-result-description').textContent = `Voice + backing track / ${formatNote} / ${take.duration}`;
      status.textContent = historySaved ? 'Upload completed' : 'Audio saved; history pending';
      retry.hidden = historySaved;
      for (const id of ['recording-history-link', 'recording-leaderboard-link']) {
        if (get(id)) get(id).hidden = !historySaved;
      }
      get('recording-save-note').textContent = data.notice || 'Your audio download has started. Choose Save if your browser asks.';
      if (extension !== 'wav') get('recording-save-note').textContent += ` The original mixed ${formatNote} file was downloaded because WAV retrieval was unavailable.`;
      if (historySaved) document.dispatchEvent(new CustomEvent('recording-uploaded', { detail: data }));
    } catch (error) {
      bindPreview(take.blob, filenameFor(take, take.extension));
      triggerDownload();
      get('recording-result-heading').textContent = 'Your mix is safe on this device';
      get('recording-result-description').textContent = `Voice + backing track / ${take.extension.toUpperCase()} / ${take.duration}`;
      status.textContent = error.message;
      get('recording-save-note').textContent = 'A local audio download has started. Upload is not complete; retry below to save your score.';
      retry.hidden = false;
    } finally {
      phase = 'idle'; syncControls();
    }
  }

  function makeCapture(stream, mimeType, bitrate) {
    const instance = new MediaRecorder(stream, { mimeType, audioBitsPerSecond: bitrate });
    const chunks = [];
    let finish, fail;
    const done = new Promise((resolve, reject) => { finish = resolve; fail = reject; });
    done.catch(() => {});
    instance.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    instance.onstop = () => finish(new Blob(chunks, { type: instance.mimeType || mimeType }));
    instance.onerror = () => { fail(new Error('Recording failed. Please try again.')); stopRecording(); };
    return { recorder: instance, done, mimeType };
  }

  async function finishCapture(seconds) {
    try {
      const [blob, voiceBlob] = await Promise.all([mixedCapture.done, voiceCapture.done]);
      const mimeType = mixedCapture.mimeType;
      const extension = mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm';
      await releaseDevices(); timer.textContent = '';
      if (!blob.size || !voiceBlob.size) throw new Error('The recording was empty. Please try again.');
      const duration = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
      lastTake = { ...captureInfo, blob, voiceBlob, extension, duration };
      await uploadTake(lastTake);
    } catch (error) {
      await releaseDevices(); phase = 'idle'; timer.textContent = ''; syncControls();
      status.textContent = error.message;
    }
  }

  function stopRecording() {
    if (phase !== 'recording') return;
    phase = 'saving'; syncControls();
    window.StudioPlayer?.pause();
    status.textContent = 'Finishing your recording...';
    clearInterval(clock); clearTimeout(limit);
    const seconds = Math.max(1, Math.round((performance.now() - startedAt) / 1000));
    if (mixedCapture.recorder.state === 'recording') mixedCapture.recorder.stop();
    if (voiceCapture.recorder.state === 'recording') voiceCapture.recorder.stop();
    finishCapture(seconds);
  }

  function updateMeter() {
    if (!analyser || !meterSamples) return;
    analyser.getFloatTimeDomainData(meterSamples);
    let energy = 0, peak = 0;
    for (const value of meterSamples) { energy += value * value; peak = Math.max(peak, Math.abs(value)); }
    const rms = Math.sqrt(energy / meterSamples.length);
    const db = rms > 0 ? 20 * Math.log10(rms) : -120;
    get('voice-level-meter').value = Math.max(0, Math.min(100, (db + 55) / 27 * 100));
    const clipped = peak >= 0.98;
    get('voice-level-hint').textContent = clipped ? 'Microphone clipping: lower your microphone input level.' : db < -50 ? 'Move a little closer to the microphone.' : 'Clear voice level. No need to shout.';
    get('voice-level-hint').dataset.clipping = clipped ? 'true' : 'false';
  }

  start.addEventListener('click', async () => {
    if (busy()) return;
    const songId = Number(window.CURRENT_SONG_ID);
    if (!Number.isInteger(songId) || songId <= 0) { status.textContent = 'Select a song before recording.'; return; }
    if (!navigator.mediaDevices?.getDisplayMedia || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder || !window.AudioContext) {
      status.textContent = 'Voice + beat export needs tab-audio sharing. Open this studio in desktop Chrome or Edge using HTTPS or localhost.';
      return;
    }
    const song = window.StudioPlayer?.currentSong;
    const takeInfo = { songId, title: song?.title || 'Karaoke performance', timestamp: new Date().toISOString().replace(/[:.]/g, '-') };
    phase = 'preparing'; syncControls(); playback.pause();
    status.textContent = 'Choose this studio tab, enable Share tab audio, then allow your microphone.';
    try {
      // Create the audio context while the Record click still provides user activation.
      context = new AudioContext({ sampleRate: 48000, latencyHint: 'interactive' });
      context.resume().catch(() => {});
      sharedTab = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' }, audio: { suppressLocalAudioPlayback: false },
        preferCurrentTab: true, selfBrowserSurface: 'include', systemAudio: 'exclude', surfaceSwitching: 'exclude'
      });
      const sharedAudio = sharedTab.getAudioTracks();
      const surface = sharedTab.getVideoTracks()[0]?.getSettings().displaySurface;
      if (!sharedAudio.length) throw new Error('No backing audio was shared. Retry, select this studio tab, and enable Share tab audio.');
      if (surface && surface !== 'browser') throw new Error('Please share this studio browser tab, rather than a screen or window, to include the correct backing track.');
      microphone = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1, sampleRate: 48000 } });
      if (sharedAudio[0].readyState === 'ended') throw new Error('Tab sharing stopped before recording began. Please try again.');
      await context.resume();
      destination = context.createMediaStreamDestination();
      voiceGain = context.createGain(); backingGain = context.createGain();
      // At maximum slider settings the nominal sum remains below full scale.
      voiceGain.gain.value = 0.55 * Number(get('voice-volume').value) / 100;
      backingGain.gain.value = 0.30 * Number(get('backing-volume').value) / 100;
      const microphoneSource = context.createMediaStreamSource(microphone);
      const highpass = context.createBiquadFilter();
      highpass.type = 'highpass'; highpass.frequency.value = 70; highpass.Q.value = 0.707;
      const bus = context.createGain();
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -6; compressor.knee.value = 6; compressor.ratio.value = 12;
      compressor.attack.value = 0.003; compressor.release.value = 0.15;
      const headroom = context.createGain(); headroom.gain.value = 0.9;
      microphoneSource.connect(highpass).connect(voiceGain).connect(bus);
      context.createMediaStreamSource(sharedTab).connect(backingGain).connect(bus);
      bus.connect(compressor).connect(headroom).connect(destination);
      analyser = context.createAnalyser(); analyser.fftSize = 2048;
      meterSamples = new Float32Array(analyser.fftSize);
      microphoneSource.connect(analyser);
      const formats = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
      const mimeType = formats.find(type => MediaRecorder.isTypeSupported(type));
      if (!mimeType) throw new Error('This browser cannot encode the mixed recording. Try desktop Chrome or Edge.');
      mixedCapture = makeCapture(destination.stream, mimeType, 256000);
      // This independent dry microphone recording is the only scoring input.
      voiceCapture = makeCapture(microphone, mimeType, 96000);
      recorder = mixedCapture.recorder;
      captureInfo = takeInfo;
      sharedTab.getTracks().forEach(track => track.addEventListener('ended', stopRecording, { once: true }));
      microphone.getAudioTracks().forEach(track => track.addEventListener('ended', stopRecording, { once: true }));
      result.hidden = true;
      startedAt = performance.now();
      recorder.start(1000);
      voiceCapture.recorder.start(1000);
      phase = 'recording'; syncControls();
      status.textContent = 'Recording your voice + backing track. Press Stop & download when finished.';
      const tick = () => { const seconds = Math.floor((performance.now() - startedAt) / 1000); timer.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; };
      tick(); updateMeter(); clock = setInterval(() => { tick(); updateMeter(); }, 100);
      limit = setTimeout(stopRecording, 600000);
    } catch (error) {
      await releaseDevices(); phase = 'idle'; syncControls();
      status.textContent = error.name === 'NotAllowedError' ? 'Recording was not started. Allow tab audio and microphone access, then try again.' : error.message;
    }
  });
  stop.addEventListener('click', stopRecording);
  playback.addEventListener('play', () => window.StudioPlayer?.pause());
  retry.addEventListener('click', () => { if (lastTake && !busy()) uploadTake(lastTake); });
  for (const [id, output, node] of [['voice-volume', 'voice-volume-value', () => voiceGain], ['backing-volume', 'backing-volume-value', () => backingGain]]) {
    get(id).addEventListener('input', event => {
      get(output).textContent = `${event.target.value}%`;
      if (node()) node().gain.setTargetAtTime((id === 'voice-volume' ? 0.55 : 0.30) * Number(event.target.value) / 100, context.currentTime, 0.02);
    });
  }
  document.addEventListener('studio-song-changed', () => {
    syncControls();
    if (!busy()) status.textContent = Number(window.CURRENT_SONG_ID) ? 'Ready to record voice + backing track.' : 'Select a song to record.';
  });
  window.addEventListener('beforeunload', event => { if (busy()) { event.preventDefault(); event.returnValue = ''; } });
  syncControls();
})();
