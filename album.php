<?php
// Start session and redirect if not logged in
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

// Database connection
$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<!DOCTYPE html>
<html lang="zxx">
<head>
	<!-- Page Metadata and Styles -->
	<title>SmartTunes - Album</title>
	<meta charset="UTF-8">
	<meta name="description" content="SolMusic HTML Template">
	<meta name="keywords" content="music, html">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="img/favicon.ico" rel="shortcut icon"/>
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
	<link rel="stylesheet" href="css/font-awesome.min.css"/>
	<link rel="stylesheet" href="css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="css/slicknav.min.css"/>
	<link rel="stylesheet" href="css/style.css"/>
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<!-- Page preloader -->
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

			<!-- User panel / login state -->
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

			<!-- User modal content -->
			<div class="user-modal-overlay"></div>
			<div class="user-modal">
				<div class="modal-header">
					<h3><?php echo htmlspecialchars($_SESSION['username']); ?>'s Library</h3>
					<button class="close-modal">&times;</button>
				</div>

				<!-- Playlists section -->
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

					<!-- Songs section -->
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

		<!-- Main menu navigation -->
		<ul class="main-menu">
			<li><a href="index.php">Home</a></li>
			<li><a href="karaoke.php">Karaoke</a></li>
			<li><a href="playlists.php">Playlists</a></li>
			<li><a href="albums.php">Albums</a></li>
			<li><a href="contact.php">Contact Us</a></li>
		</ul>
	</header>

	<!-- Album song search input -->
	<div class="search-form-2">
		<input id="song-name-input" list="song-list-data" placeholder="Add song into album..." />
		<datalist id="song-list-data"></datalist>
		<input type="hidden" id="selected-song-id" />
		<button id="add-album-btn">Add</button>
	</div>

	<!-- Main content area -->
	<div class="main-karaoke-content">
		<div class="left-panel">
			<!-- Song search bar -->
			<div class="song-search-area">
				<div class="search-input-wrapper">
					<input type="text" id="song-search" placeholder="Enter song name or artist"/>
					<i class="fa fa-search search-icon" id="search-icon-btn"></i>
				</div>
			</div>

			<!-- Album song list -->
			<div class="song-list-wrapper">
				<div class="song-list-header-2">
					<h2>Song List</h2>
					<button id="delete-selected-btn" class="btn btn-danger-2">Delete</button>
				</div>
				<ul id="album-songs"></ul>
			</div>
		</div>

		<!-- Right panel with video player -->
		<div class="right-panel">
			<div id="karaoke-container">
				<div id="karaoke-video-wrapper">
					<video id="karaoke-video" controls style="width: 100%; border-radius: 8px;"></video>
				</div>
			</div>
		</div>
	</div>

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

	<!-- JS scripts -->
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.slicknav.min.js"></script>
	<script src="js/owl.carousel.min.js"></script>
	<script src="js/mixitup.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/user-description.js"></script>
	<script src="js/album.js"></script>
	<script src="js/jquery.jplayer.min.js"></script>
	<script src="js/wavesurfer.min.js"></script>
	<script src="js/WaveSurferInit.js"></script>
	<script src="js/jplayerInit.js"></script>
	<script src="js/karaoke-recorder.js"></script>
</body>
</html>

