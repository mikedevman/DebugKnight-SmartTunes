/* Accessible, shared song upload and details dialogs. */
window.SongDialogs = (() => {
  let active = null;
  let previousFocus = null;
  let previousOverflow = '';
  const get = id => document.getElementById(id);
  function close() {
    if (!active) return;
    active.style.display = 'none';
    active = null;
    get('song-dialog-backdrop').hidden = true;
    document.body.style.overflow = previousOverflow;
    document.querySelector('.main-karaoke-content')?.classList.remove('blur-background');
    previousFocus?.focus();
  }
  function open(id) {
    if (active) close();
    const dialog = get(id);
    if (!dialog) return;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    active = dialog;
    dialog.style.display = 'block';
    get('song-dialog-backdrop').hidden = false;
    document.body.style.overflow = 'hidden';
    dialog.querySelector('.song-form-feedback').textContent = '';
    dialog.querySelector('input:not([type="hidden"])')?.focus();
  }
  function edit(song) {
    for (const [field, value] of Object.entries({ id: song.id, title: song.title, content: song.video, tempo: song.tempo, songkey: song.songkey, genre: song.genre, year: song.year, album: song.album })) {
      get(`edit_${field}`).value = value ?? '';
    }
    open('viewEditContainer');
  }
  document.addEventListener('DOMContentLoaded', () => {
    get('show-upload-btn')?.addEventListener('click', () => open('uploadContainer'));
    get('closeUploadBtn')?.addEventListener('click', close);
    get('closeViewEditBtn')?.addEventListener('click', close);
    get('song-dialog-backdrop')?.addEventListener('click', close);
    document.querySelectorAll('[data-close-song-dialog]').forEach(button => button.addEventListener('click', close));
    document.addEventListener('keydown', event => {
      if (!active) return;
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        const focusable = [...active.querySelectorAll('button:not(:disabled), input:not([type="hidden"]), select, a[href]')];
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    get('viewEditForm')?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const feedback = form.querySelector('.song-form-feedback');
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      feedback.textContent = 'Saving changes...';
      try {
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), cache: 'no-store' });
        const result = await response.text();
        if (!response.ok || result.trim() !== 'success') throw new Error('Unable to save this song. Please try again.');
        close();
        document.dispatchEvent(new CustomEvent('song-details-saved'));
      } catch (error) {
        feedback.textContent = error.message;
      } finally {
        submit.disabled = false;
      }
    });
  });
  return { open, close, edit };
})();
