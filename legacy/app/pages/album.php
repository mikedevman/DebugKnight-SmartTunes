<?php
// Start session and redirect if not logged in
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

// Database connection

require_once LEGACY_ROOT . '/app/config/database.php';
$conn = smarttunes_db_connect();

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
	<link href="public/assets/img/favicon.ico" rel="shortcut icon"/>
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="public/assets/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="public/assets/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="public/assets/css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="public/assets/css/slicknav.min.css"/>
	<link rel="stylesheet" href="public/assets/css/style.css"/>
    <link rel="stylesheet" href="public/assets/css/song-pagination.css?v=<?= filemtime(LEGACY_ROOT . '/public/assets/css/song-pagination.css') ?>"/>
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
    <link rel="stylesheet" href="public/assets/css/karaoke.css?v=<?= filemtime(LEGACY_ROOT . '/public/assets/css/karaoke.css') ?>" />
    <link rel="stylesheet" href="public/assets/css/song-forms.css?v=<?= filemtime(LEGACY_ROOT . '/public/assets/css/song-forms.css') ?>" />
  <link rel="stylesheet" href="public/assets/css/responsive.css?v=<?= filemtime(LEGACY_ROOT . '/public/assets/css/responsive.css') ?>" />
</head>
<body class="karaoke-page">
	<!-- Page preloader -->
	<div id="preloder">
		<div class="loader"></div>
	</div>

	<!-- Header section -->
	<header class="header-section clearfix">
		<a href="index.php" class="site-logo">
			<img src="public/assets/img/logo.png" alt="">
		</a>
		<div class="header-right">
			<a href="logout.php" class="hr-btn">Logout</a>
			<span>|</span>

			<!-- User panel / login state -->
			<div class="user-panel">
				<?php if(isset($_SESSION['user_id'])): ?>
					<button type="button" class="user-welcome-btn" aria-haspopup="dialog" aria-expanded="false">
              <span class="profile-avatar" aria-hidden="true"><i class="fa fa-user"></i></span>
              <span class="profile-label"><span class="profile-greeting">Welcome back</span><span class="profile-username"><?php echo htmlspecialchars($_SESSION['username']); ?></span></span>
              <i class="fa fa-angle-down profile-chevron" aria-hidden="true"></i>
            </button>
				<?php else: ?>
					<a href="login.php" class="login">Login</a>
					<a href="register.php" class="register">Register</a>
				<?php endif; ?>
			</div>

			<!-- User modal content -->
			<div class="user-modal-overlay"></div>
			<div class="user-modal" role="dialog" aria-modal="true" aria-label="Your music profile" aria-hidden="true" tabindex="-1">
				<div class="modal-header">
            <div class="profile-identity">
              <span class="profile-portrait" aria-hidden="true"><i class="fa fa-user"></i></span>
              <div class="profile-heading"><p class="profile-kicker">YOUR PERSONAL BACKSTAGE</p><h3><?php echo htmlspecialchars($_SESSION['username']); ?></h3><p class="profile-subtitle">Your music, all in one place.</p></div>
            </div>
            <button type="button" class="close-modal" aria-label="Close profile"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>

				<!-- Playlists section -->
				<div class="modal-sections">
					<div class="modal-section">
						<div class="profile-section-heading"><span class="profile-section-icon" aria-hidden="true"><i class="fa fa-list-ul"></i></span><div><p class="profile-section-kicker">YOUR COLLECTIONS</p><h4>Your Playlists</h4></div></div>
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
						<div class="profile-section-heading"><span class="profile-section-icon" aria-hidden="true"><i class="fa fa-music"></i></span><div><p class="profile-section-kicker">UPLOADED BY YOU</p><h4>Your Songs</h4></div></div>
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
					<a href="history.php" class="profile-history-link"><span class="profile-history-icon" aria-hidden="true"><i class="fa fa-headphones"></i></span><span class="profile-history-copy"><strong>Your recordings &amp; scores</strong><span>Listen back to your performances</span></span><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
				</div>
			</div>
		</div>

		<!-- Main menu navigation -->
		<ul class="main-menu">
			<li><a href="index.php">Home</a></li>
			<li><a href="karaoke.php">Karaoke</a></li>
			<li><a href="playlists.php">Playlists</a></li>
			<li><a href="albums.php">Albums</a></li>
			<li><a href="leaderboard.php">Leaderboard</a></li>
			<li><a href="contact.php">Contact Us</a></li>
		</ul>
	</header>

<?php $collectionType = 'album'; require LEGACY_ROOT . '/app/views/studio/collection-studio.php'; ?>

	<!-- Footer section -->
	<footer class="footer-section">
		<div class="container">
			<div class="row">
				<div class="col-xl-6 col-lg-7 order-lg-2">
					<div class="row">
						<!-- Company links -->
						<div class="col-sm-4">
							<div class="footer-widget">
								<h2>Our Website</h2>
								<ul>
									<li><a href="contact.php">Our Website</a></li>
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
									<li><a href="karaoke.php">Song library</a></li>
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
						<img src="public/assets/img/logo.png" alt="">
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
	<script src="public/assets/js/jquery-3.2.1.min.js"></script>
	<script src="public/assets/js/bootstrap.min.js"></script>
	<script src="public/assets/js/jquery.slicknav.min.js"></script>
	<script src="public/assets/js/owl.carousel.min.js"></script>
	<script src="public/assets/js/mixitup.min.js"></script>
	<script src="public/assets/js/main.js"></script>
	<script src="public/assets/js/user-description.js"></script>
    <script src="public/assets/js/song-pagination.js?v=<?= filemtime(LEGACY_ROOT . '/public/assets/js/song-pagination.js') ?>"></script>
	<script>window.CURRENT_SONG_ID = 0;</script>
    <script src="public/assets/js/studio-player.js?v=<?= filemtime(LEGACY_ROOT . '/public/assets/js/studio-player.js') ?>"></script>
    <script src="public/assets/js/studio-dialogs.js?v=<?= filemtime(LEGACY_ROOT . '/public/assets/js/studio-dialogs.js') ?>"></script>
    <script src="public/assets/js/collection-studio.js?v=<?= filemtime(LEGACY_ROOT . '/public/assets/js/collection-studio.js') ?>"></script>
	<script src="public/assets/js/jquery.jplayer.min.js"></script>
	<script src="public/assets/js/wavesurfer.min.js"></script>
	<script src="public/assets/js/karaoke-recorder.js?v=<?= filemtime(LEGACY_ROOT . '/public/assets/js/karaoke-recorder.js') ?>"></script>
	<script src="public/assets/js/search.js"></script>
</body>
</html>

