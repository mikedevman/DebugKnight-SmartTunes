<?php
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

$song_id = $_GET['id'] ?? 0;

?>

<!DOCTYPE html>
<html lang="zxx">
  <head>
    <title>SmartTunes - Karaoke</title>
    <meta charset="UTF-8" />
    <meta name="description" content="karaoke" />
    <meta name="keywords" content="music, html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="img/favicon.ico" rel="shortcut icon" />

    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/owl.carousel.min.css" />
    <link rel="stylesheet" href="css/slicknav.min.css" />

    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <!-- View/Edit Song Details -->  
    <div class="upload-container" style="display: none" id="viewEditContainer">
      <button class="close-upload" id="closeViewEditBtn">&times;</button>
      <h2>Edit Song Details</h2>
      <form class="upload-form" id="viewEditForm" onsubmit="return saveEditedSong(event)">
        <input type="hidden" name="id" id="edit_id" />

        <label for="edit_title">Song Title:</label>
        <input type="text" name="title" id="edit_title" required />

        <label for="edit_content">YouTube Link:</label>
        <input type="text" name="content" id="edit_content" required />

        <label for="edit_tempo">Tempo (BPM):</label>
        <input type="number" name="tempo" id="edit_tempo" required />

        <label for="edit_songkey">Key:</label>
        <input type="text" name="songkey" id="edit_songkey" required />

        <label for="edit_genre">Genre:</label>
        <input type="text" name="genre" id="edit_genre" required />

        <label for="edit_year">Year Published:</label>
        <input type="number" name="year" id="edit_year" required />

            <?php
            $albums = [];
            $stmt = $conn->prepare("SELECT id, album_name FROM album ORDER BY album_name ASC");
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $albums[] = $row;
            }
            $stmt->close();
            ?>
              <label for="edit_album">Album:</label>
              <select name="album" id="edit_album" required>
              <option value="" disabled selected>Select album</option>
              <?php foreach ($albums as $album): ?>
                <option value="<?php echo htmlspecialchars($album['id']); ?>">
                  <?php echo htmlspecialchars($album['album_name']); ?>
                </option>
              <?php endforeach; ?>
              </select>
                <button type="submit" class="site-btn">Save</button>
              </form>
            </div>

    <div id="preloder">
      <div class="loader"></div>
    </div>

     <!-- Header section -->
	<header class="header-section clearfix">
		<a href="index.php" class="site-logo">
			<img src="img/logo.png" alt="">
		</a>
		<div class="header-right">
			<a href="logout.php" class="hr-btn">Logout</a>
			<span>|</span>
			<div class="user-panel">
    <?php if(isset($_SESSION['user_id'])): ?>
        <button class="user-welcome-btn">
            Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>
        </button>
    <?php else: ?>
        <a href="login.php" class="login">Login</a>
        <a href="register.php" class="register">Register</a>
    <?php endif; ?>
</div>

<!-- User Modal -->
<div class="user-modal-overlay"></div>
<div class="user-modal">
    <div class="modal-header">
        <h3><?php echo htmlspecialchars($_SESSION['username']); ?>'s Library</h3>
        <button class="close-modal">&times;</button>
    </div>
    
    <div class="modal-sections">
        <div class="modal-section">
            <h4>Your Playlists</h4>
            <div class="items-container">
                <?php if(!empty($user_playlists)): ?>
                    <ul class="items-list">
                        <?php foreach($user_playlists as $playlist): ?>
                            <li>
                                <a href="playlist.php?id=<?php echo $playlist['id']; ?>">
                                    <?php echo htmlspecialchars($playlist['name']); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php else: ?>
                    <p class="no-items">No playlists created yet</p>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="modal-section">
            <h4>Your Songs</h4>
            <div class="items-container">
                <?php if(!empty($user_songs)): ?>
                    <ul class="items-list">
                        <?php foreach($user_songs as $song): ?>
                            <li>
                                <a href="karaoke.php?id=<?php echo $song['song_id']; ?>">
                                    <?php echo htmlspecialchars($song['name']); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php else: ?>
                    <p class="no-items">No songs uploaded yet</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
			</div>
		</div>
      <ul class="main-menu">
        <li><a href="index.php">Home</a></li>
        <li><a href="karaoke.php">Karaoke</a></li>
        <li><a href="playlists.php">Playlists</a></li>
        <li><a href="albums.php">Albums</a></li>
        <li><a href="contact.php">Contact Us</a></li>
      </ul>
	</header>
	<!-- Header section end -->

    <div class="main-karaoke-content">
      <div class="left-panel">
        <div class="song-search-area">
          <div class="search-input-wrapper">
            <input
              type="text"
              id="song-search"
              placeholder="Enter song name or artirst"
            />
            <i class="fa fa-search search-icon" id="search-icon-btn"></i>
          </div>
        </div>

        <div
          class="song-list-wrapper"
          style="max-height: 690px; overflow-y: auto;"
        >
        <div class="song-list-header">
          <button id="show-upload-btn" class="btn btn-outline-light">
            Upload Song
            </button>
            <h2>Song List</h2>
            <button id="delete-selected-btn" class="btn btn-danger">
            Delete
            </button>
          </div>
          <ul id="song-list"></ul>
        </div>
        <select id="sort-dropdown">
          <option value="">Newest</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="views">Most Viewed</option>
          <option value="played">Most Played</option>
        </select>
      </div>

      <div class="right-panel">
        <div id="karaoke-container">
          <div id="karaoke-video-wrapper">
            <video id="karaoke-video" controls style="width: 100%; border-radius: 8px;"></video>
          </div>
        </div>
        <div id="recording-panel" style="margin-top: 20px; padding: 20px; border-radius: 10px; background: #181818; color: white; box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 100%;">
          <h3 style="margin-bottom: 15px;"><i class="fa fa-microphone"></i> Karaoke Voice Recorder</h3>
            <div id="record-controls" style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button id="start-recording" class="btn btn-success">
                <i class="fa fa-circle"></i> Start Recording
              </button>
              <button id="stop-recording" class="btn btn-danger" disabled>
                <i class="fa fa-stop"></i> Stop
              </button>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span id="record-timer" style="font-weight: bold;"></span>
              <span id="recording-status" style="font-weight: 600;"></span>
            </div>
          </div>
            <audio id="playback" controls style="display: none; margin-top: 15px; width: 100%;"></audio>
          </div>
        </div>
      </div>


    <!-- Upload Form Popup -->
    <div class="upload-container" style="display: none" id="uploadContainer">
  <button class="close-upload" id="closeUploadBtn">&times;</button>
  <h2>Upload Song</h2>
  <form class="upload-form" action="upload_song.php" method="POST">
    <label for="title">Song Title:</label>
    <input type="text" name="title" placeholder="Enter song title" required />

    <label for="content">YouTube Link:</label>
    <input type="text" name="content" placeholder="https://www.youtube.com/watch?v=..." required />

    <label for="tempo">Tempo (BPM):</label>
    <input type="number" name="tempo" placeholder="Enter tempo" required />

    <label for="songkey">Key:</label>
    <input type="text" name="songkey" placeholder="Enter song key (e.g. C, Gm)" required />

    <label for="genre">Genre:</label>
    <input type="text" name="genre" placeholder="Enter genre" required />

    <label for="year">Year Published:</label>
    <input type="number" name="year" placeholder="2020" required />

    <?php
    $albums = [];
    $stmt = $conn->prepare("SELECT id, album_name FROM album ORDER BY album_name ASC");
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $albums[] = $row;
    }
    $stmt->close();
    ?>

    <label for="album">Album:</label>
    <select name="album" required>
      <option value="" disabled selected>Select album</option>
      <?php foreach ($albums as $album): ?>
        <option value="<?php echo htmlspecialchars($album['id']); ?>">
          <?php echo htmlspecialchars($album['album_name']); ?>
        </option>
      <?php endforeach; ?>
    </select>

    <button type="submit" class="site-btn">Upload</button>
  </form>
</div>

    <!-- Footer section -->
	<footer class="footer-section">
		<div class="container">
			<div class="row">
				<div class="col-xl-6 col-lg-7 order-lg-2">
					<div class="row">
						<div class="col-sm-4">
							<div class="footer-widget">
								<h2>Our Company</h2>
								<ul>
									<li><a href="contact.php">Our Story</a></li>
									<li><a href="contact.php">Contact Us</a></li>
									<li><a href="contact.php">Careers</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="footer-widget">
								<h2>Ultilities</h2>
                  				<ul>
                    				<li><a href="karaoke.php">Music</a></li>
                    				<li><a href="artists.html">Artists</a></li>
                    				<li><a href="">Playlists</a></li>
                    				<li><a href="">Albums</a></li>
                    				<li><a href="karaoke.php">Add Song</a></li>
                    				<li><a href="">Create Playlist</a></li>
                  				</ul>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="footer-widget">
								<h2>Support</h2>
								<ul>
									<li><a href="contact.php">FAQ</a></li>
									<li><a href="contact.php">Help</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-6 col-lg-5 order-lg-1">
					<img src="img/logo.png" alt="">
					<div class="copyright">
                Music from the heart
            </div>
            <div class="social-links">
              <a href="https://www.instagram.com/mikee.conv/?hl=en"><i class="fa fa-instagram"></i></a>
              <a href="https://www.facebook.com/namanh.ha.1042/"><i class="fa fa-facebook"></i></a>
              <a href="https://www.youtube.com/@Mike-b6t9v"><i class="fa fa-youtube"></i></a>
            </div>
				</div>
			</div>
		</div>
	</footer>
	<!-- Footer section end -->

    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.slicknav.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/mixitup.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/karaoke.js"></script>
    <script src="js/user-description.js"></script>
    <script>
      const CURRENT_SONG_ID = <?php echo json_encode($song_id); ?>;
    </script>

    <script src="js/jquery.jplayer.min.js"></script>
    <script src="js/wavesurfer.min.js"></script>

    <script src="js/WaveSurferInit.js"></script>
    <script src="js/jplayerInit.js"></script>
    <script src="js/karaoke-recorder.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/pitchy@1.2.0/dist/pitchy.umd.js"></script>
  </body>
</html>