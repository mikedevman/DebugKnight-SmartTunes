<?php
$songFormAlbums = $conn->query('SELECT id, album_name FROM album ORDER BY album_name ASC')->fetch_all(MYSQLI_ASSOC);
$songFormFields = [
    ['title', 'Song title', 'text', 'Give this track a name', 'wide'],
    ['content', 'YouTube link', 'text', 'https://www.youtube.com/watch?v=...', 'wide'],
    ['tempo', 'Tempo (BPM)', 'number', 'e.g. 120', ''],
    ['songkey', 'Musical key', 'text', 'e.g. C major or Gm', ''],
    ['genre', 'Genre', 'text', 'e.g. Pop, Jazz, R&B', ''],
    ['year', 'Release year', 'number', 'e.g. 2024', ''],
];
?>
<div id="song-dialog-backdrop" class="song-dialog-backdrop" hidden></div>
<?php foreach ([false, true] as $editing):
    $dialogId = $editing ? 'viewEditContainer' : 'uploadContainer';
    $prefix = $editing ? 'edit_' : 'upload_';
?>
<section class="upload-container song-dialog" id="<?= $dialogId ?>" style="display: none" role="dialog" aria-modal="true" aria-labelledby="<?= $prefix ?>heading" tabindex="-1">
  <button class="close-upload" id="<?= $editing ? 'closeViewEditBtn' : 'closeUploadBtn' ?>" type="button" aria-label="Close <?= $editing ? 'song details' : 'upload form' ?>">&times;</button>
  <div class="song-dialog-intro">
    <span class="song-dialog-icon"><i class="fa <?= $editing ? 'fa-sliders' : 'fa-music' ?>" aria-hidden="true"></i></span>
    <p class="song-dialog-eyebrow">SMARTTUNES / YOUR LIBRARY</p>
    <h2 id="<?= $prefix ?>heading"><?= $editing ? 'Fine-tune your track.' : 'Add your next favorite.' ?></h2>
    <p><?= $editing ? 'Keep the details in harmony with your music.' : 'A great performance starts with a great song.' ?></p>
  </div>
  <form class="upload-form song-details-form" id="<?= $editing ? 'viewEditForm' : 'songUploadForm' ?>" action="<?= $editing ? 'update_song_details.php' : 'upload_song.php' ?>" method="POST">
    <?php if ($editing): ?><input type="hidden" name="id" id="edit_id" /><?php endif; ?>
    <div class="song-form-section"><span>01</span><h3>The track</h3><p>All fields are required</p></div>
    <div class="song-form-grid">
      <?php foreach ($songFormFields as [$name, $label, $type, $placeholder, $width]): ?>
      <div class="song-form-field <?= $width === 'wide' ? 'song-form-wide' : '' ?>">
        <label for="<?= $prefix . $name ?>"><?= $label ?></label>
        <input id="<?= $prefix . $name ?>" name="<?= $name ?>" type="<?= $type ?>" <?= $name === 'content' ? 'inputmode="url"' : '' ?> placeholder="<?= $placeholder ?>" required />
        <?php if ($name === 'content'): ?><small>Paste a YouTube video or karaoke backing track link.</small><?php endif; ?>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="song-form-section"><span>02</span><h3>Make it part of a collection</h3></div>
    <div class="song-form-field">
      <label for="<?= $prefix ?>album">Album</label>
      <select id="<?= $prefix ?>album" name="album" required>
        <option value="" disabled selected>Choose an album</option>
        <?php foreach ($songFormAlbums as $formAlbum): ?>
        <option value="<?= (int) $formAlbum['id'] ?>"><?= htmlspecialchars($formAlbum['album_name']) ?></option>
        <?php endforeach; ?>
      </select>
      <?php if (!$songFormAlbums): ?><small>Create an album on the <a href="albums.php">Albums page</a> before uploading a song.</small><?php endif; ?>
    </div>
    <p class="song-form-feedback" role="status" aria-live="polite"></p>
    <div class="song-form-actions">
      <button type="button" class="song-form-cancel" data-close-song-dialog="<?= $dialogId ?>">Cancel</button>
      <button type="submit" class="site-btn"><i class="fa <?= $editing ? 'fa-check' : 'fa-plus' ?>" aria-hidden="true"></i> <?= $editing ? 'Save changes' : 'Add to library' ?></button>
    </div>
  </form>
</section>
<?php endforeach; ?>
