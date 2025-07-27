<?php
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
	<title>SmartTunes - Home</title>
	<meta charset="UTF-8">
	<meta name="description" content="SolMusic HTML Template">
	<meta name="keywords" content="music, html">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- Favicon -->
	<link href="img/favicon.ico" rel="shortcut icon"/>

	<!-- Google font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">
 
	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
	<link rel="stylesheet" href="css/font-awesome.min.css"/>
	<link rel="stylesheet" href="css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="css/slicknav.min.css"/>

	<!-- Main Stylesheets -->
	<link rel="stylesheet" href="css/style.css"/>


	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

</head>
<body>
	<!-- Page Preloder -->


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

<?php
$album_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($album_id <= 0) die("Invalid album ID");

// Get album name
$stmt = $conn->prepare("SELECT album_name FROM album WHERE id = ?");
$stmt->bind_param("i", $album_id);
$stmt->execute();
$stmt->bind_result($album_name);
$stmt->fetch();
$stmt->close();

// Display album title
echo "<h1>Album: " . htmlspecialchars($album_name) . "</h1>";

// Display songs already in the album
$stmt = $conn->prepare("SELECT song_id, name FROM song WHERE album = ?");
$stmt->bind_param("i", $album_id);
$stmt->execute();
$result = $stmt->get_result();

echo "<h2>Songs in this Album</h2>";
if ($result->num_rows > 0) {
    echo "<ul>";
    while ($row = $result->fetch_assoc()) {
        echo "<li>" . htmlspecialchars($row['name']) . "</li>";
    }
    echo "</ul>";
} else {
    echo "<p>No songs in this album yet.</p>";
}
$stmt->close();

// Handle add song to album
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_song'])) {
    $song_id = intval($_POST['song_id']);
    $stmt = $conn->prepare("UPDATE song SET album = ? WHERE id = ?");
    $stmt->bind_param("ii", $album_id, $song_id);
    if ($stmt->execute()) {
        echo "<p style='color: green;'>Song added to album successfully.</p>";
    } else {
        echo "<p style='color: red;'>Failed to add song.</p>";
    }
    $stmt->close();
}

// Song Search Form
?>
<h2>Add Song to This Album</h2>
<form method="POST" action="album.php?id=<?php echo $album_id; ?>">
    <input type="text" name="search_term" placeholder="Search song name..." required>
    <button type="submit" name="search">Search</button>
</form>

<?php
// Handle search
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['search'])) {
    $search_term = "%" . $_POST['search_term'] . "%";
    $stmt = $conn->prepare("SELECT song_id, name FROM song WHERE name LIKE ? AND (album IS NULL OR album != ?)");
    $stmt->bind_param("si", $search_term, $album_id); // Avoid showing songs already in the album
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<form method='POST' action='album.php?id=" . $album_id . "'>";
        echo "<input type='hidden' name='album_id' value='" . $album_id . "'>";
        echo "<select name='song_id'>";
        while ($row = $result->fetch_assoc()) {
            echo "<option value='" . $row['id'] . "'>" . htmlspecialchars($row['name']) . "</option>";
        }
        echo "</select> ";
        echo "<button type='submit' name='add_song'>Add to Album</button>";
        echo "</form>";
    } else {
        echo "<p>No songs found.</p>";
    }
    $stmt->close();
}
?>

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
									<li><a href="">Our Story</a></li>
									<li><a href="">Sol Music Blog</a></li>
									<li><a href="">History</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="footer-widget">
								<h2>Products</h2>
								<ul>
									<li><a href="">Music</a></li>
									<li><a href="">Subscription</a></li>
									<li><a href="">Custom Music</a></li>
									<li><a href="">Footage</a></li>
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
					<img src="img/logo.png" alt="">
					<div class="copyright">
Made in <script>document.write(new Date().getFullYear());</script> | This website is made with <i class="fa fa-heart-o" aria-hidden="true"></i>
					</div>
					<div class="social-links">
						<a href=""><i class="fa fa-instagram"></i></a>
						<a href=""><i class="fa fa-pinterest"></i></a>
						<a href=""><i class="fa fa-facebook"></i></a>
						<a href=""><i class="fa fa-twitter"></i></a>
						<a href=""><i class="fa fa-youtube"></i></a>
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
	</body>