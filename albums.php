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

$songResults = [];
if (isset($_GET['search'])) {
    $searchTerm = '%' . $conn->real_escape_string($_GET['search']) . '%';
    $stmt = $conn->prepare("SELECT id, song_name FROM song WHERE song_name LIKE ?");
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $songResults = $stmt->get_result();
}

$stmt = $conn->prepare("SELECT id, album_name FROM album");
$stmt->execute();
$result = $stmt->get_result();
$all_albums = $result->fetch_all(MYSQLI_ASSOC);

$stmt2 = $conn->prepare("SELECT album_id FROM album_author WHERE author_id = ?");
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$member_result = $stmt2->get_result();

$albums = $conn->query("SELECT * FROM album");

$query = "SELECT id, album_name FROM album";
$result = $conn->query($query);

$user_albums = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $user_albums[] = $row;
    }
}

$editable_albums = [];
while ($row = $member_result->fetch_assoc()) {
    $editable_albums[] = $row['album_id'];
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

<h2>Your Albums</h2>

<!-- Create Album Form -->
<form method="POST" action="create_album.php" style="margin-bottom: 20px;">
    <input type="text" name="album_name" placeholder="New album name" required>
    <button type="submit">Create Album</button>
</form>

<!-- Album Cards -->
<div style="display: flex; flex-wrap: wrap; gap: 20px;">
<?php foreach ($user_albums as $album): ?>
    <div style="width: 200px; border: 1px solid #ccc; border-radius: 8px; padding: 10px; text-align: center;">
        <h3 style="margin: 0;">
            <a href="album.php?id=<?= $album['id'] ?>" style="text-decoration: none; color: black; font-size: 14px;">
                <?= htmlspecialchars($album['album_name']) ?>
            </a>
        </h3>
    </div>
<?php endforeach; ?>
</div>

<style>
    

h2 {
    margin: 40px auto 20px;
    text-align: center;
    color: #333;
    font-weight: 600;
}

form {
    max-width: 500px;
    margin: 0 auto 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

form input[type="text"],
form textarea {
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
}

form button {
    background-color: #ff0055;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

form button:hover {
    background-color: #e6004c;
}

.album-card {
    background-color: #fff;
    margin: 30px auto;
    max-width: 700px;
    border-radius: 10px;
    padding: 20px 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.album-card h3 {
    margin-bottom: 15px;
    font-size: 22px;
    color: #222;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
}

.album-card h4 {
    margin-top: 25px;
    margin-bottom: 10px;
    color: #555;
    font-size: 18px;
}

.album-card ul {
    list-style: none;
    padding-left: 0;
}

.album-card li {
    margin-bottom: 8px;
}

.album-card a {
    text-decoration: none;
    color: #0066cc;
}

.album-card a:hover {
    text-decoration: underline;
}

</style>

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