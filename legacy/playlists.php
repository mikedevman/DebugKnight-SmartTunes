<?php
// Start a session to manage user login state
session_start();

// Redirect to login page if user is not logged in
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

// Database connection settings
$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';

// Create a new MySQLi connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check if database connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get logged-in user's ID and username from session
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
?>

<!-- HTML document starts -->
<!DOCTYPE html>
<html lang="zxx">
<head>
  <!-- Page metadata -->
  <title>SmartTunes - Playlists</title>
  <meta charset="UTF-8" />
  <meta name="description" content="SmartTunes" />
  <meta name="keywords" content="music, html" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Website favicon -->
  <link href="img/favicon.ico" rel="shortcut icon" />

  <!-- Google font -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:..." rel="stylesheet" />

  <!-- CSS stylesheets -->
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/font-awesome.min.css" />
  <link rel="stylesheet" href="css/owl.carousel.min.css" />
  <link rel="stylesheet" href="css/slicknav.min.css" />
  <link rel="stylesheet" href="css/style.css" />

  <!-- HTML5 support for older IE -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body>

<!-- Preloader animation while the page loads -->
<div id="preloder">
  <div class="loader"></div>
</div>

<!-- Header section with logo, nav, and user panel -->
<header class="header-section clearfix">
  <!-- Website logo -->
  <a href="index.php" class="site-logo">
    <img src="img/logo.png" alt="">
  </a>

  <div class="header-right">
    <!-- Logout link -->
    <a href="logout.php" class="hr-btn">Logout</a>
    <span>|</span>

    <!-- User welcome panel -->
    <div class="user-panel">
      <?php if(isset($_SESSION['user_id'])): ?>
        <!-- Display username if logged in -->
        <button class="user-welcome-btn">
          Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>
        </button>
      <?php else: ?>
        <!-- Show login/register links if not logged in -->
        <a href="login.php" class="login">Login</a>
        <a href="register.php" class="register">Register</a>
      <?php endif; ?>
    </div>

    <!-- Modal overlay and container for user library -->
    <div class="user-modal-overlay"></div>
    <div class="user-modal">
      <div class="modal-header">
        <!-- User library modal header -->
        <h3><?php echo htmlspecialchars($_SESSION['username']); ?>'s Library</h3>
        <button class="close-modal">&times;</button>
      </div>

      <div class="modal-sections">
        <!-- User's playlist section -->
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

        <!-- User's song section -->
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

      <!-- Score history button -->
      <div class="history-btn">
        <a href="history.php"><button>Score History</button></a>
      </div>
    </div>
  </div>

  <!-- Main navigation menu -->
  <ul class="main-menu">
    <li><a href="index.php">Home</a></li>
    <li><a href="karaoke.php">Karaoke</a></li>
    <li><a href="playlists.php">Playlists</a></li>
    <li><a href="albums.php">Albums</a></li>
    <li><a href="leaderboard.php">Leaderboard</a></li>
    <li><a href="contact.php">Contact Us</a></li>
  </ul>
</header>
<!-- Header section end -->

<!-- Playlist section with create button and grid -->
<div class="playlists-header">
  <h2>Your Playlists</h2>
</div>

<div class="playlist-search" style="text-align:center; margin:20px 0;">
  <form id="playlistSearchForm">
    <input type="text" id="playlistSearchInput" 
           placeholder="Search your playlists by name" 
           style="padding:10px; width:260px; border-radius:20px; border:1px solid #ccc; font-size:14px;">
    <button type="submit" class="search-btn">Search</button>
  </form>
</div>

<div class="playlists">
  <div class="playlist-controls">
    <!-- Button to toggle new playlist form -->
    <button class="create-btn" onclick="toggleCreateForm()">Create Playlist</button>

    <!-- Hidden form to input new playlist name -->
    <div id="create-form" class="create-form" style="display: none;">
      <label for="playlistName">Playlist Name:</label>
      <input type="text" id="playlistName" placeholder="Enter playlist name" />
      <button onclick="addPlaylist()">Add</button>
    </div>
  </div>




  <!-- Playlist display area -->
  <div id="playlist-grid" class="playlist-grid"></div>
</div>
<!-- Playlist section end -->

<!-- Footer section -->
	<footer class="footer-section">
		<div class="container">
			<div class="row">
				<div class="col-xl-6 col-lg-7 order-lg-2">
					<div class="row">
						<!-- Company links -->
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
						<!-- Utility links -->
						<div class="col-sm-4">
							<div class="footer-widget">
								<h2>Ultilities</h2>
								<ul>
									<li><a href="karaoke.php">Music</a></li>
									<li><a href="artists.html">Artists</a></li>
									<li><a href="playlists.php">Playlists</a></li>
									<li><a href="albums.php">Albums</a></li>
									<li><a href="karaoke.php">Add Song</a></li>
									<li><a href="playlists.php">Create Playlist</a></li>
								</ul>
							</div>
						</div>
						<!-- Support links -->
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
				<!-- Logo and social links -->
				<div class="col-xl-6 col-lg-5 order-lg-1">
					<a href="index.php" class="site-logo-footer">
						<img src="img/logo.png" alt="">
					</a>
					<div class="copyright">Music from the heart</div>
					<div class="social-links">
						<a href="https://www.instagram.com/mikee.conv/?hl=en"><i class="fa fa-instagram"></i></a>
						<a href="https://www.facebook.com/namanh.ha.1042/"><i class="fa fa-facebook"></i></a>
						<a href="https://www.youtube.com/@Mike-b6t9v"><i class="fa fa-youtube"></i></a>
					</div>
				</div>
			</div>
		</div>
	</footer>

<!-- JavaScript and plugins -->
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.slicknav.min.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/mixitup.min.js"></script>
<script src="js/main.js"></script>
<script src="js/playlists.js"></script>
<script src="js/karaoke-recorder.js"></script>
<script src="js/user-description.js"></script>
<script src="js/search.js"></script>

</body>
</html>
