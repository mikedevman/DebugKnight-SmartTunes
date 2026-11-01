document.addEventListener('DOMContentLoaded', () => {
  const get = id => document.getElementById(id);
  const root = document.querySelector('[data-collection-type]');
  const type = root.dataset.collectionType;
  const id = root.dataset.collectionId;
  const album = type === 'album';
  const list = get(album ? 'album-songs' : 'playlist-songs');
  const endpoint = album ? 'album_get_song.php' : 'display_songs_in_playlist.php';
  let page = 1, search = '', sort = '', request = 0, suggestionsRequest = 0;
  let selected = null, suggestions = [];
  const actions = get('collection-action-status');
  const pager = new SongPagination(get('collection-song-pagination'), loadSongs);

  async function loadSongs(nextPage = page, restoreSelection = false) {
    const version = ++request;
    const params = new URLSearchParams({ id, page: nextPage, sort, q: search });
    const linkedSong = new URLSearchParams(window.location.search).get('song');
    if (restoreSelection && linkedSong) params.set('selected_id', linkedSong);
    pager.loading();
    list.parentElement.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(`${endpoint}?${params}`, { cache: 'no-store' });
      const data = await response.json();
      if (version !== request) return;
      if (!response.ok || !data.success || !Array.isArray(data.songs)) throw new Error('Unable to load songs.');
      page = data.pagination.page;
      list.replaceChildren();
      list.style.counterReset = `track ${(page - 1) * 20}`;
      if (!data.songs.length) {
        const empty = document.createElement('li');
        empty.className = 'song-list-empty';
        empty.textContent = root.dataset.collectionFound !== 'true' ? 'This collection could not be found.' : search ? 'No matching songs.' : 'No songs yet. Add a track from the library above.';
        list.appendChild(empty);
      }
      data.songs.forEach(song => {
        const item = document.createElement('li');
        item.className = 'song-item';
        item.dataset.songId = song.id;
        const title = document.createElement('button');
        title.type = 'button';
        title.className = 'song-title';
        title.textContent = song.title;
        title.addEventListener('click', () => play(song));
        const details = document.createElement('button');
        details.type = 'button';
        details.className = 'view-btn';
        details.textContent = 'Details';
        details.addEventListener('click', () => SongDialogs.edit(song));
        if (selected && String(selected.id) === String(song.id)) item.classList.add('active');
        item.append(title, details);
        list.appendChild(item);
      });
      list.parentElement.scrollTop = 0;
      pager.update(data.pagination);
      if (restoreSelection && data.selected_song) play(data.selected_song);
    } catch (error) {
      if (version !== request) return;
      pager.error();
      if (!list.querySelector('.song-item')) {
        list.replaceChildren();
        const message = document.createElement('li');
        message.className = 'song-list-empty';
        message.textContent = 'Songs could not be loaded. Use Retry below.';
        list.appendChild(message);
      }
      console.error(error);
    } finally {
      if (version === request) list.parentElement.setAttribute('aria-busy', 'false');
    }
  }

  function play(song) {
    if (window.StudioRecorder?.busy()) return;
    selected = song;
    StudioPlayer.mount(song);
    list.querySelectorAll('.song-item').forEach(item => item.classList.toggle('active', item.dataset.songId === String(song.id)));
    const url = new URL(window.location.href);
    url.searchParams.set('song', song.id);
    window.history.replaceState(null, '', url);
    actions.textContent = '';
  }

  async function loadSuggestions(query = '') {
    const version = ++suggestionsRequest;
    try {
      const response = await fetch(`get_songs.php?limit=20&q=${encodeURIComponent(query)}`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load suggestions.');
      const data = await response.json();
      if (version !== suggestionsRequest) return;
      suggestions = data;
      get('song-list-data').replaceChildren();
      data.forEach(song => {
        const option = document.createElement('option');
        option.value = song.name;
        get('song-list-data').appendChild(option);
      });
      const match = suggestions.find(song => song.name === get('song-name-input').value.trim());
      get('selected-song-id').value = match?.song_id || '';
    } catch (error) {
      if (version === suggestionsRequest) actions.textContent = 'Song suggestions are unavailable. Please try again.';
      console.error(error);
    }
  }

  let suggestionTimer;
  get('song-name-input').addEventListener('input', () => {
    ++suggestionsRequest;
    const name = get('song-name-input').value.trim();
    const match = suggestions.find(song => song.name === name);
    get('selected-song-id').value = match?.song_id || '';
    clearTimeout(suggestionTimer);
    suggestionTimer = setTimeout(() => loadSuggestions(name), 250);
  });

  get('collection-add-form').addEventListener('submit', async event => {
    event.preventDefault();
    const songName = get('song-name-input').value.trim();
    const songId = get('selected-song-id').value;
    if (!songId) { actions.textContent = 'Choose a matching song from the suggestions first.'; return; }
    const button = get(album ? 'add-album-btn' : 'add-playlist-btn');
    button.disabled = true;
    actions.textContent = 'Adding song...';
    try {
      const response = await fetch(album ? 'album_add_song.php' : 'playlist_add_song.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album ? { album_id: id, song_name: songName } : { playlist_id: id, song_id: songId })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to add this song.');
      get('song-name-input').value = '';
      get('selected-song-id').value = '';
      actions.textContent = 'Song added to your collection.';
      await loadSongs();
    } catch (error) { actions.textContent = error.message; }
    finally { button.disabled = false; }
  });

  get('delete-selected-btn').addEventListener('click', async () => {
    if (!selected) { actions.textContent = 'Select a song to remove from this collection.'; return; }
    if (!confirm(`Remove "${selected.title}" from this ${type}?`)) return;
    const button = get('delete-selected-btn');
    button.disabled = true;
    try {
      const response = await fetch(album ? 'delete_album_song.php' : 'delete_playlist_song.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album ? { album_id: id, song_id: selected.id } : { playlist_id: id, song_id: selected.id })
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') throw new Error(data.message || 'Unable to remove this song.');
      selected = null;
      StudioPlayer.clear();
      const url = new URL(window.location.href); url.searchParams.delete('song'); window.history.replaceState(null, '', url);
      actions.textContent = 'Song removed from this collection.';
      await loadSongs();
    } catch (error) { actions.textContent = error.message; }
    finally { button.disabled = false; }
  });

  const performSearch = () => { search = get('song-search').value.trim(); loadSongs(1); };
  get('search-icon-btn').addEventListener('click', performSearch);
  get('song-search').addEventListener('keydown', event => { if (event.key === 'Enter') performSearch(); });
  get('sort-dropdown').addEventListener('change', event => { sort = event.target.value; loadSongs(1); });
  document.addEventListener('song-details-saved', () => loadSongs());
  window.addEventListener('popstate', () => loadSongs(page, true));
  loadSuggestions();
  loadSongs(1, true);
});
