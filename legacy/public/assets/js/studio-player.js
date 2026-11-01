window.StudioPlayer = {
  youtubeAPI() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (this.apiPromise) return this.apiPromise;
    this.apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { previous?.(); resolve(window.YT); };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = () => reject(new Error('YouTube controls unavailable.'));
      document.head.appendChild(script);
    });
    return this.apiPromise;
  },
  pause() {
    const player = document.getElementById('karaoke-video');
    if (!player) return;
    try {
      if (player.tagName === 'VIDEO') { player.pause(); return; }
      if (this.youtubeReady && this.youtubePlayer?.pauseVideo) { this.youtubePlayer.pauseVideo(); return; }
    } catch { /* Fall back to disabling autoplay if the remote controller is gone. */ }
    if (player.src.includes('autoplay=1')) player.src = player.src.replace('autoplay=1', 'autoplay=0');
  },
  youtubeId(value) {
    if (!value) return null;
    try {
      const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '');
      let id = null;
      if (host === 'youtu.be') id = url.pathname.split('/')[1];
      else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
        id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
      }
      return /^[\w-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  },
  mount(song) {
    if (window.StudioRecorder?.busy()) return null;
    this.youtubePlayer?.destroy(); this.youtubePlayer = null; this.youtubeReady = false;
    const wrapper = document.getElementById('karaoke-video-wrapper');
    const id = this.youtubeId(song.video);
    const player = document.createElement(id ? 'iframe' : 'video');
    player.id = 'karaoke-video';
    if (id) {
      player.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
      player.title = `${song.title} - karaoke player`;
      player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      player.allowFullscreen = true;
    } else {
      // Assign URLs as properties rather than interpolating database values into HTML.
      const url = new URL(song.video || '', window.location.href);
      if (song.video && ['http:', 'https:'].includes(url.protocol)) player.src = url.href;
      player.controls = true;
      player.autoplay = true;
      player.preload = 'metadata';
    }
    wrapper.replaceChildren(player);
    this.currentSong = { ...song };
    if (id) this.youtubeAPI().then(YT => {
      if (!wrapper.contains(player)) return;
      this.youtubePlayer = new YT.Player(player.id, { events: { onReady: () => { this.youtubeReady = true; } } });
    }).catch(() => {});
    window.CURRENT_SONG_ID = Number(song.id);
    document.dispatchEvent(new CustomEvent('studio-song-changed', { detail: song }));
    return player;
  },
  clear() {
    this.youtubePlayer?.destroy(); this.youtubePlayer = null; this.youtubeReady = false;
    document.getElementById('karaoke-video-wrapper').replaceChildren();
    window.CURRENT_SONG_ID = 0;
    this.currentSong = null;
    document.dispatchEvent(new CustomEvent('studio-song-changed', { detail: null }));
  }
};
