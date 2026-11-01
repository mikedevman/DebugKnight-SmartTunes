<!-- Shared player and recorder for karaoke, albums, and playlists. -->
<div class="right-panel">
  <div class="stage-heading">
    <h2><span class="section-number">01</span> The stage</h2>
    <span><i class="fa fa-expand" aria-hidden="true"></i> Fullscreen available in player</span>
  </div>
  <div class="stage-screen">
    <div id="karaoke-container">
      <div id="karaoke-video-wrapper">
        <div class="stage-empty">
          <div class="stage-mic"><i class="fa fa-microphone" aria-hidden="true"></i></div>
          <p class="stage-overline">EVERY VOICE DESERVES A STAGE</p>
          <h3>Make this moment yours.</h3>
          <p>Pick a track from the song library to begin.</p>
        </div>
      </div>
    </div>
    <div class="stage-caption">
      <span><i class="fa fa-headphones" aria-hidden="true"></i> Headphones on. World off.</span>
      <span>SING IT YOUR WAY</span>
    </div>
  </div>
  <section id="recording-panel" aria-labelledby="recorder-heading">
    <div class="recorder-heading">
      <span class="recorder-icon"><i class="fa fa-microphone" aria-hidden="true"></i></span>
      <div>
        <p class="karaoke-eyebrow">02 / YOUR VOICE</p>
        <h3 id="recorder-heading">Your voice. The full mix.</h3>
        <p>A cleaner voice-and-backing mix, saved as a high-quality WAV download.</p>
      </div>
    </div>
    <div class="recording-guide">
      <span><b>1</b> Play your song</span><span><b>2</b> Share this tab + audio</span><span><b>3</b> Sing, then stop</span>
    </div>
    <p class="recording-help" id="recording-help">Choose this studio tab and enable <strong>Share tab audio</strong>. Use headphones so the backing track is not picked up twice. Sing at a comfortable level. Only audio is saved, up to 10 minutes.</p>
    <div class="recording-mixer">
      <label for="voice-volume"><i class="fa fa-microphone" aria-hidden="true"></i> Your voice <input id="voice-volume" type="range" min="0" max="125" value="100" /><output id="voice-volume-value" for="voice-volume">100%</output></label>
      <label for="backing-volume"><i class="fa fa-music" aria-hidden="true"></i> Backing track <input id="backing-volume" type="range" min="0" max="100" value="60" /><output id="backing-volume-value" for="backing-volume">60%</output></label>
    </div>
    <div class="voice-level-monitor"><label for="voice-level-meter">Microphone level</label><meter id="voice-level-meter" min="0" max="100" value="0">0</meter><span id="voice-level-hint">Sing at a comfortable level.</span></div>
    <div id="record-controls" aria-describedby="recording-help">
      <button id="start-recording" class="btn btn-success" disabled><i class="fa fa-circle" aria-hidden="true"></i> Record voice + beat</button>
      <button id="stop-recording" class="btn btn-danger" disabled><i class="fa fa-stop" aria-hidden="true"></i> Stop &amp; download</button>
      <div class="recording-feedback" role="status" aria-live="polite">
        <span id="record-timer"></span>
        <span id="recording-status">Select a song to record.</span>
      </div>
    </div>
    <div class="recording-result" id="recording-result" hidden>
      <div class="recording-result-top">
        <div class="recording-score"><span id="recording-score-value">--</span><span>/ 100</span></div>
        <div><p class="recording-result-label">VOICE LEVEL SCORE</p><h4 id="recording-result-heading">Your performance is ready.</h4><p id="recording-result-description">Voice + backing track</p></div>
      </div>
      <audio id="playback" controls preload="metadata"></audio>
      <div class="recording-result-actions">
        <a id="download-recording" class="recording-download" download><i class="fa fa-download" aria-hidden="true"></i> Download again</a>
        <a id="recording-history-link" class="recording-download" href="history.php" hidden><i class="fa fa-headphones" aria-hidden="true"></i> Your recordings</a>
        <a id="recording-leaderboard-link" class="recording-download" href="leaderboard.php" hidden><i class="fa fa-trophy" aria-hidden="true"></i> Leaderboard</a>
        <button type="button" id="retry-recording-upload" hidden>Retry upload</button>
        <span id="recording-save-note" role="status"></span>
      </div>
    </div>
  </section>
</div>
