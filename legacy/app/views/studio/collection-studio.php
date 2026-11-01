<?php
$collectionId = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 1]]) ?: 0;
$isAlbum = $collectionType === 'album';
$collectionLabel = $isAlbum ? 'Album' : 'Playlist';
$table = $isAlbum ? 'album' : 'playlist';
$nameColumn = $isAlbum ? 'album_name' : 'playlist_name';
$statement = $conn->prepare("SELECT $nameColumn AS name FROM $table WHERE id = ?");
$statement->bind_param('i', $collectionId);
$statement->execute();
$collection = $statement->get_result()->fetch_assoc();
$statement->close();
$collectionName = $collection['name'] ?? "$collectionLabel not found";
?>
<main class="main-karaoke-content" data-collection-type="<?= $collectionType ?>" data-collection-id="<?= $collectionId ?>" data-collection-found="<?= $collection ? 'true' : 'false' ?>">
  <div class="karaoke-heading">
    <div>
      <p class="karaoke-eyebrow">SMARTTUNES / <?= strtoupper($collectionLabel) ?> STUDIO</p>
      <h1>Your set. <span>Your stage.</span></h1>
      <p><?= htmlspecialchars($collectionName) ?> &mdash; pick a track and make it yours.</p>
    </div>
    <div class="studio-intro">
      <div class="studio-wave" aria-hidden="true"><?php for ($i = 0; $i < 15; $i++): ?><span></span><?php endfor; ?></div>
      <p>A little courage. A lot of music.</p>
    </div>
  </div>
  <section class="left-panel" aria-labelledby="library-heading">
    <div class="library-heading">
      <div><p class="karaoke-eyebrow">YOUR <?= strtoupper($collectionLabel) ?></p><h2 id="library-heading"><?= htmlspecialchars($collectionName) ?></h2></div>
      <button id="show-upload-btn" class="btn btn-outline-light"><i class="fa fa-plus" aria-hidden="true"></i> Upload</button>
    </div>
    <form class="collection-add" id="collection-add-form">
      <label for="song-name-input">Add from your song library</label>
      <div>
        <input id="song-name-input" list="song-list-data" placeholder="Find a song to add..." autocomplete="off" required />
        <datalist id="song-list-data"></datalist>
        <input type="hidden" id="selected-song-id" />
        <button id="<?= $isAlbum ? 'add-album-btn' : 'add-playlist-btn' ?>" type="submit">Add</button>
      </div>
      <p id="collection-action-status" role="status" aria-live="polite"></p>
    </form>
    <div class="song-search-area">
      <label class="sr-only" for="song-search">Search this <?= strtolower($collectionLabel) ?></label>
      <div class="search-input-wrapper">
        <input type="text" id="song-search" placeholder="Search this <?= strtolower($collectionLabel) ?>..." />
        <button type="button" class="search-icon" id="search-icon-btn" aria-label="Search songs"><i class="fa fa-search" aria-hidden="true"></i></button>
      </div>
    </div>
    <div class="library-toolbar">
      <label for="sort-dropdown">Sort by</label>
      <select id="sort-dropdown">
        <option value="">Newest</option><option value="az">A - Z</option><option value="za">Z - A</option>
        <option value="views">Most Viewed</option><option value="played">Most Played</option>
      </select>
      <button id="delete-selected-btn" class="btn btn-danger">Remove</button>
    </div>
    <div class="song-list-wrapper" tabindex="0" aria-label="Song list">
      <ul id="<?= $isAlbum ? 'album-songs' : 'playlist-songs' ?>" class="studio-song-list"><li class="song-list-empty">Loading songs...</li></ul>
    </div>
    <div id="collection-song-pagination"></div>
    <p class="library-hint"><i class="fa fa-music" aria-hidden="true"></i> Select a title. The stage is yours.</p>
  </section>
  <?php require LEGACY_ROOT . '/app/views/studio/studio-stage.php'; ?>
</main>
<?php require LEGACY_ROOT . '/app/views/studio/song-forms.php'; ?>
