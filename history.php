<?php
// Start session to access user data
session_start();

// Database connection settings
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

// Connect to the database
$conn = new mysqli($host, $user, $password, $dbname);

// Stop if connection fails
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Query to get play history joined with song name
$sql = "SELECT p.id, s.name, p.date, p.score, p.user_recording 
        FROM playhistory p 
        JOIN song s ON p.song_played = s.song_id 
        WHERE p.user_id = ? 
        ORDER BY p.date DESC";

// Prepare and run the query
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="zxx">
<head>
    <title>SmartTunes - Play History</title>
    <meta charset="UTF-8">
    <meta name="description" content="home">
    <meta name="keywords" content="music, html">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="shortcut icon"/>

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">

    <!-- CSS Stylesheets -->
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/font-awesome.min.css"/>
    <link rel="stylesheet" href="css/owl.carousel.min.css"/>
    <link rel="stylesheet" href="css/slicknav.min.css"/>
    <link rel="stylesheet" href="css/style.css"/>
</head>
<body>

<!-- Page Preloader -->
<div id="preloder">
    <div class="loader"></div>
</div>

<!-- Header Section -->
<header class="header-section clearfix">
    <!-- Logo -->
    <a href="index.php" class="site-logo">
        <img src="img/logo.png" alt="">
    </a>

    <!-- User & Nav -->
    <div class="header-right">
        <a href="logout.php" class="hr-btn">Logout</a>
        <span>|</span>

        <!-- User Panel -->
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

        <!-- User Modal for Library -->
        <div class="user-modal-overlay"></div>
        <div class="user-modal">
            <div class="modal-header">
                <h3><?php echo htmlspecialchars($_SESSION['username']); ?>'s Library</h3>
                <button class="close-modal">&times;</button>
            </div>

            <!-- Modal Sections -->
            <div class="modal-sections">
                <!-- User Playlists -->
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

                <!-- User Songs -->
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

            <!-- History Button -->
            <div class="history-btn">
                <a href="history.php"><button>Score History</button></a>
            </div>
        </div>
    </div>

    <!-- Navigation Menu -->
    <ul class="main-menu">
        <li><a href="index.php">Home</a></li>
        <li><a href="karaoke.php">Karaoke</a></li>
        <li><a href="playlists.php">Playlists</a></li>
        <li><a href="albums.php">Albums</a></li>
        <li><a href="contact.php">Contact Us</a></li>
    </ul>
</header>
<!-- Header End -->

<!-- History Section -->
<h1 class="history-title">Your Karaoke History</h1>
<div class="history-container">
    <table class="history-table">
        <thead>
            <tr>
                <th>Song</th>
                <th>Date</th>
                <th>Score</th>
                <th>Recording</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['name']); ?></td>
                    <td><?php echo date("F j, Y, g:i a", strtotime($row['date'])); ?></td>
                    <td><span class="score-badge"><?php echo $row['score']; ?></span></td>
                    <td><audio controls src="<?php echo $row['user_recording']; ?>"></audio></td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
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
					<img src="img/logo.png" alt="">
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

<!-- JS Scripts -->
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.slicknav.min.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/mixitup.min.js"></script>
<script src="js/main.js"></script>
<script src="js/user-description.js"></script>
</body>
</html>
