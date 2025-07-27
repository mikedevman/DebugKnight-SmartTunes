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

$playlist_id = $_GET['id'];
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Truy vấn playlist
$user_id = $_SESSION['user_id'];
$sql_playlists = "SELECT id, playlist_name AS name FROM playlist WHERE user_created = ?";
$stmt1 = $conn->prepare($sql_playlists);
$stmt1->bind_param("i", $user_id);
$stmt1->execute();
$result1 = $stmt1->get_result();
$user_playlists = $result1->fetch_all(MYSQLI_ASSOC);

// Truy vấn song
$sql_songs = "SELECT song_id, name AS name FROM song WHERE song_id = ?";
$stmt2 = $conn->prepare($sql_songs);
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$result2 = $stmt2->get_result();
$user_songs = $result2->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="zxx">
  <head>
    <title>SmartTunes - Playlist</title>
    <meta charset="UTF-8" />
    <meta name="description" content="SmartTunes" />
    <meta name="keywords" content="music, html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="shortcut icon" />

    <!-- Google font -->
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap"
      rel="stylesheet"
    />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/owl.carousel.min.css" />
    <link rel="stylesheet" href="css/slicknav.min.css" />

    <!-- Main Stylesheets -->
    <link rel="stylesheet" href="css/style.css" />

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <!-- Page Preloder -->
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

    <!-- Playlist section -->
    <div class="playlist-1">
      <div class="d-flex h-100 align-items-end">
        <form class="search-form">
          <input type="text" placeholder=" Add Song Into Playlist" />
          <button>Add</button>
        </form>
      </div>
      
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
          style="max-height: 690px; overflow-y: auto"
        >
        <div class="song-list-header-2">
            <h2>Song List</h2>
            <button id="delete-selected-btn" class="btn btn-danger-2">
            Delete
            </button>
          </div>
          <ul id="song-list"></ul>
        </div>
      </div>

      <div class="right-panel">
        <div id="karaoke-container">
          <div id="karaoke-video-wrapper">
            <video id="karaoke-video" controls style="width: 100%; border-radius: 8px;"></video>
          </div>
        </div>
        <div id="recording-panel" style="margin-top: 20px; padding: 20px; border-radius: 10px; background: #181818; color: white; box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 100%;">
          <h3 style="margin-bottom: 15px;"><i class="fa fa-microphone"></i> Vocal Recorder</h3>
          <div id="record-controls" style="display: flex; gap: 10px; align-items: center;">
            <button id="start-recording" class="btn btn-success">
              <i class="fa fa-circle"></i> Start Recording
            </button>
            <button id="stop-recording" class="btn btn-danger" disabled>
              <i class="fa fa-stop"></i> Stop
            </button>
            <span id="recording-status" style="margin-left: 10px; font-weight: 600;"></span>
          </div>
          <audio id="playback" controls style="display: none; margin-top: 15px; width: 100%;"></audio>
        </div>
        
      </div>

    </div>
    <!-- Playlist section end -->

    <!-- Footer section -->
    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-7 order-lg-2">
            <div class="row">
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>About us</h2>
                  <ul>
                    <li><a href="index.php">Our Story</a></li>
                    <li><a href="">Sol Music Blog</a></li>
                    <li><a href="">History</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>Ultilities</h2>
                  <ul>
                    <li><a href="karaoke.php">Music</a></li>
                    <li><a href="artists.html">Artists</a></li>
                    <li><a href="karaoke.php">Karaoke</a></li>
                    <li><a href="karaoke.php">Add Song</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>Playlists</h2>
                  <ul>
                    <li><a href="">Newsletter</a></li>
                    <li><a href="">Careers</a></li>
                    <li><a href="">Press</a></li>
                    <li><a href="">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-5 order-lg-1">
            <img src="img/logo.png" alt="" />
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

    <!--====== Javascripts & Jquery ======-->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.slicknav.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/mixitup.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/user-description.js"></script>
    <script src="js/karaoke_playlist.js"></script>

  </body>
</html>
