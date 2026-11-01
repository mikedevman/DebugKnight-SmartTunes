<?php

// Start the session to access user data
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

// Database connection setup

// Create a connection to the MySQL database
require_once LEGACY_ROOT . '/app/config/database.php';
$conn = smarttunes_db_connect();

// Stop the script and show error if the connection fails
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user session info
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="zxx">
<head>
	<title>SmartTunes - Home</title>
	<meta charset="UTF-8">
	<meta name="description" content="home">
	<meta name="keywords" content="music, html">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- Favicon -->
	<link href="public/assets/img/favicon.ico" rel="shortcut icon"/>

	<!-- Google font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">
 
	<!-- Stylesheets -->
	<link rel="stylesheet" href="public/assets/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="public/assets/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="public/assets/css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="public/assets/css/slicknav.min.css"/>

	<!-- Main Stylesheets -->
	<link rel="stylesheet" href="public/assets/css/style.css"/>


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
			<img src="public/assets/img/logo.png" alt="">
		</a>
		<div class="header-right">
			<a href="logout.php" class="hr-btn">Logout</a>
			<span>|</span>
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

<!-- User Modal -->
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
	<div class="history-btn">
		<a href="history.php" class="profile-history-link"><span class="profile-history-icon" aria-hidden="true"><i class="fa fa-headphones"></i></span><span class="profile-history-copy"><strong>Your recordings &amp; scores</strong><span>Listen back to your performances</span></span><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
	</div>
</div>
		</div>
		</div>
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

	<!-- Hero section -->
	<section class="hero-section">
		<div class="hero-slider owl-carousel">
			<div class="hs-item">
				<div class="container">
					<div class="row">
						<div class="col-lg-6">
							<div class="hs-text">
								<h2><span>Welcome, </span><?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
								<p>This is a website specifically designed for karaoke singing. In addition, it also serves as a platform where you can listen to music (similar to Spotify) but with the added feature of singing karaoke. </p>
								<a href="karaoke.php" class="site-btn">Karaoke Singing</a>
								<a href="playlists.php" class="site-btn sb-c2">Create Your Own Playlist!</a>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="hr-img">
								<img src="public/assets/img/hero-bg.png" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hs-item">
				<div class="container">
					<div class="row">
						<div class="col-lg-6">
							<div class="hs-text">
								<h2><span>Listen </span> to new music.</h2>
								<p>When you access this website to sing, your vocals will be compared to a standard, and based on that standard, we can assign a score. Additionally, each song has its own leaderboard, so give it your best shot to claim the top spot! </p>
								<a href="contact.php" class="site-btn">Contact Us</a>
								<a href="karaoke.php" class="site-btn sb-c2">Listen Now</a>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="hr-img">
								<img src="public/assets/img/hero-bg.png" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Hero section end -->

	<!-- Intro section -->
	<section class="intro-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="section-title">
						<h2>Unlimited Access to Music Tracks</h2>
					</div>
				</div>
				<div class="col-lg-6">
					<p>When you visit this website to listen to music, each song is delivered with high-quality audio and curated playlists to match your mood. Our platform doesn't just play music—it enhances your listening experience with personalized recommendations and trending tracks. You can explore a wide variety of genres, discover new artists, and even follow your favorite ones. Plus, there’s a ranking system for the most popular songs, so you’ll always know what’s trending. Dive in and see if your favorite tracks make it to the top of the charts!</p>
					<a href="karaoke.php" class="site-btn">Try it now</a>
				</div>
			</div>
		</div>
	</section>
	<!-- Intro section end -->

	<!-- How section -->
	<section class="how-section spad set-bg" data-setbg="public/assets/img/how-to-bg.jpg">
		<div class="container text-white">
			<div class="section-title">
				<h2>How it works</h2>
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="how-item">
						<div class="hi-icon">
							<img src="public/assets/img/icons/brain.png" alt="">
						</div>
						<h4>Create an account</h4>
						<p>Sign up quickly with your email or social login to get started. Creating an account lets you track your scores, save your favorite songs, and join the community. </p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="how-item">
						<div class="hi-icon">
							<img src="public/assets/img/icons/pointer.png" alt="">
						</div>
						<h4>Listen to Music</h4>
						<p>Enjoy a wide library of songs across all genres. Whether you're here to relax or warm up your voice, our platform lets you stream high-quality music anytime. </p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="how-item">
						<div class="hi-icon">
							<img src="public/assets/img/icons/smartphone.png" alt="">
						</div>
						<h4>Download Music</h4>
						<p>Love a track? You can download it and listen offline. Perfect for when you're on the go or want to sing along without using data. </p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="how-item">
						<div class="hi-icon">
							<img src="public/assets/img/icons/pointer.png" alt="">
						</div>
						<h4>Karaoke Singing!</h4>
						<p>Pick your favorite songs and start singing with karaoke mode. Lyrics will appear in real-time while the instrumental plays—just like a karaoke machine! </p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="how-item">
						<div class="hi-icon">
							<img src="public/assets/img/icons/brain.png" alt="">
						</div>
						<h4>Vocal Scoring</h4>
						<p>Our smart scoring system analyzes your singing and compares it to pitch and rhythm standards. You'll get instant feedback and a score to help you improve. </p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="how-item">
						<div class="hi-icon">
							<img src="public/assets/img/icons/smartphone.png" alt="">
						</div>
						<h4>Download Your Vocal</h4>
						<p>After recording your karaoke performance, you can download your vocal track to share it with friends or keep it as a memory. </p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- How section end -->

	<!-- Subscription section -->
	<section class="subscription-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="sub-text">
						<h2>Discover the Ultimate Karaoke & Music Experience</h2>
						<h3>No sign-up fees. No subscriptions. Just pure music enjoyment.</h3>
						<p>Sing your heart out, stream your favorite tracks, and explore a new way to enjoy music—all in one place. Whether you're practicing your vocals, competing for high scores, or just vibing to top hits, our platform has everything you need to make music fun and social.</p>
						<a href="karaoke.php" class="site-btn">Try it now - it's completely free!</a>
					</div>
				</div>
				<div class="col-lg-6">
					<ul class="sub-list">
						<li><img src="public/assets/img/icons/check-icon.png" alt="">Play any track</li>
						<li><img src="public/assets/img/icons/check-icon.png" alt="">Listen offline</li>
						<li><img src="public/assets/img/icons/check-icon.png" alt="">No ad interruptions</li>
						<li><img src="public/assets/img/icons/check-icon.png" alt="">Unlimited skips</li>
						<li><img src="public/assets/img/icons/check-icon.png" alt="">High quality audio</li>
						<li><img src="public/assets/img/icons/check-icon.png" alt="">Shuffle play</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<!-- Subscription section end -->

	<!-- Premium section end -->
	<section class="premium-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="section-title">
						<h2>Why Choose Us</h2>
					</div>
				</div>
				<div class="col-lg-6">
					<p>We’re more than just a karaoke site—we’re a complete music experience. Stream songs, sing along with real-time lyrics, get vocal scores, and download your performances, all in one fun and easy-to-use platform. Whether you're a casual listener or a passionate performer, our tools are designed to make your music journey exciting, engaging, and totally free.</p>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3 col-sm-6">
					<div class="premium-item">
						<img src="public/assets/img/premium/1.jpg" alt="">
						<h4>No ad interruptions </h4>
						<p>Enjoy music without ads.</p>
					</div>
				</div>
				<div class="col-lg-3 col-sm-6">
					<div class="premium-item">
						<img src="public/assets/img/premium/2.jpg" alt="">
						<h4>High Quality</h4>
						<p>Crystal-clear audio experience.</p>
					</div>
				</div>
				<div class="col-lg-3 col-sm-6">
					<div class="premium-item">
						<img src="public/assets/img/premium/3.jpg" alt="">
						<h4>Listen Offline</h4>
						<p>Play music anytime, anywhere.</p>
					</div>
				</div>
				<div class="col-lg-3 col-sm-6">
					<div class="premium-item">
						<img src="public/assets/img/premium/4.jpg" alt="">
						<h4>Download Music</h4>
						<p>Save songs to device.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Premium section end -->

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
	
	<!--====== Javascripts & Jquery ======-->
	<script src="public/assets/js/jquery-3.2.1.min.js"></script>
	<script src="public/assets/js/bootstrap.min.js"></script>
	<script src="public/assets/js/jquery.slicknav.min.js"></script>
	<script src="public/assets/js/owl.carousel.min.js"></script>
	<script src="public/assets/js/mixitup.min.js"></script>
	<script src="public/assets/js/main.js"></script>
	<script src="public/assets/js/user-description.js"></script>
	</body>
</html>
