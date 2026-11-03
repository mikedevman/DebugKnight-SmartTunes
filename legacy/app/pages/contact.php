<?php
// Start the session to access session variables
session_start();

// Check if the user is not logged in, redirect to login page
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

// Set database connection credentials

// Create a new connection to the MySQL database
require_once LEGACY_ROOT . '/app/config/database.php';
$conn = smarttunes_db_connect();

// If connection fails, stop script and show error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user info from session
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Query to get playlists created by the logged-in user
$sql_playlists = "SELECT id, playlist_name AS name FROM playlist WHERE user_created = ?";
$stmt1 = $conn->prepare($sql_playlists);
$stmt1->bind_param("i", $user_id);
$stmt1->execute();
$result1 = $stmt1->get_result();
$user_playlists = $result1->fetch_all(MYSQLI_ASSOC);

// Query to get songs uploaded by the user
$sql_songs = "SELECT song_id, name AS name FROM song WHERE song_id = ?";
$stmt2 = $conn->prepare($sql_songs);
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$result2 = $stmt2->get_result();
$user_songs = $result2->fetch_all(MYSQLI_ASSOC);
?>

<!-- Start of HTML Document -->
<!DOCTYPE html>
<html lang="zxx">
<head>
	<title>SmartTunes - Contact</title>
	<meta charset="UTF-8">
	<meta name="description" content="contact">
	<meta name="keywords" content="music, html">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Favicon -->
	<link href="public/assets/img/favicon.ico" rel="shortcut icon"/>

	<!-- Google Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
 
	<!-- CSS Stylesheets -->
	<link rel="stylesheet" href="public/assets/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="public/assets/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="public/assets/css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="public/assets/css/slicknav.min.css"/>
	<link rel="stylesheet" href="public/assets/css/style.css"/>

	<!-- Support for older IE browsers -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
  <link rel="stylesheet" href="public/assets/css/responsive.css?v=<?= filemtime(LEGACY_ROOT . '/public/assets/css/responsive.css') ?>" />
</head>

<body>

<!-- Loading animation while page loads -->
<div id="preloder">
	<div class="loader"></div>
</div>

<!-- Website header with logo, menu, and user section -->
<header class="header-section clearfix">
	<a href="index.php" class="site-logo">
		<img src="public/assets/img/logo.png" alt="">
	</a>

	<div class="header-right">
		<!-- Logout button -->
		<a href="logout.php" class="hr-btn">Logout</a>
		<span>|</span>

		<!-- User panel (shows welcome or login/register buttons) -->
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

		<!-- User modal with playlists and songs -->
		<div class="user-modal-overlay"></div>
		<div class="user-modal" role="dialog" aria-modal="true" aria-label="Your music profile" aria-hidden="true" tabindex="-1">
			<div class="modal-header">
            <div class="profile-identity">
              <span class="profile-portrait" aria-hidden="true"><i class="fa fa-user"></i></span>
              <div class="profile-heading"><p class="profile-kicker">YOUR PERSONAL BACKSTAGE</p><h3><?php echo htmlspecialchars($_SESSION['username']); ?></h3><p class="profile-subtitle">Your music, all in one place.</p></div>
            </div>
            <button type="button" class="close-modal" aria-label="Close profile"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>

			<div class="modal-sections">
				<!-- Show user's playlists -->
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

				<!-- Show user's uploaded songs -->
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

			<!-- Button to view user's score history -->
			<div class="history-btn">
				<a href="history.php" class="profile-history-link"><span class="profile-history-icon" aria-hidden="true"><i class="fa fa-headphones"></i></span><span class="profile-history-copy"><strong>Your recordings &amp; scores</strong><span>Listen back to your performances</span></span><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
			</div>
		</div>
	</div>

	<!-- Navigation menu -->
	<ul class="main-menu">
		<li><a href="index.php">Home</a></li>
		<li><a href="karaoke.php">Karaoke</a></li>
		<li><a href="playlists.php">Playlists</a></li>
		<li><a href="albums.php">Albums</a></li>
		<li><a href="leaderboard.php">Leaderboard</a></li>
		<li><a href="contact.php">Contact Us</a></li>
	</ul>
</header>

<!-- Contact section with Google Map and team info -->
<section class="contact-section">
	<div class="container-fluid">
		<div class="row">
			<!-- Embedded Google Map -->
			<div class="col-lg-6 p-0">
				<div class="map">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.027513591999!2d105.78045937479627!3d21.03158508768244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135bfa667a7dee9%3A0x2ac9ba5f99e4f389!2sSwinburne%20Innovation%20Space!5e0!3m2!1sen!2s!4v1753154972084!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>

			<!-- Team info and contact form -->
			<div class="col-lg-6 p-0">
				<div class="contact-warp">
					<div class="section-title mb-0">
						<h3>Our Team - DebugKnight</h3>
					</div>
					<p>We are a dedicated team aiming to build clean, bug-free, quality applications.</p>
					<ul>
						<li>80 Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi</li>
						<li>+86 394415380</li>
						<li>mikedang1304@gmail.com</li>
					</ul>

					<!-- Contact form for users to send messages -->
					<form class="contact-from">
						<div class="row">
							<div class="col-md-6">
								<input type="text" placeholder="Your name">
							</div>
							<div class="col-md-6">
								<input type="text" placeholder="Your e-mail">
							</div>
							<div class="col-md-12">
								<input type="text" placeholder="Subject">
								<textarea placeholder="Message"></textarea>
								<button class="site-btn">send message</button>
							</div>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>
</section>

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

<!-- JavaScript scripts to enable interactivity and UI effects -->
<script src="public/assets/js/jquery-3.2.1.min.js"></script>
<script src="public/assets/js/bootstrap.min.js"></script>
<script src="public/assets/js/jquery.slicknav.min.js"></script>
<script src="public/assets/js/owl.carousel.min.js"></script>
<script src="public/assets/js/mixitup.min.js"></script>
<script src="public/assets/js/main.js"></script>
<script src="public/assets/js/user-description.js"></script>

</body>
</html>
