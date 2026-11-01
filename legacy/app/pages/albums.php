<?php
// Start the session and redirect if not logged in
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}

// Database connection setup

require_once LEGACY_ROOT . '/app/config/database.php';
$conn = smarttunes_db_connect();
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user session info
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Handle search query for songs
$songResults = [];
if (isset($_GET['search'])) {
    $query = is_string($_GET['search']) ? trim($_GET['search']) : '';
    $searchTerm = '%' . $query . '%';
    $stmt = $conn->prepare("SELECT song_id AS id, name AS song_name FROM song WHERE name LIKE ?");
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $songResults = $stmt->get_result();
}

// Get all albums for displaying in dropdown
$stmt = $conn->prepare("SELECT id, album_name FROM album");
$stmt->execute();
$result = $stmt->get_result();
$all_albums = $result->fetch_all(MYSQLI_ASSOC);

// Get albums the current user is an author of
$stmt2 = $conn->prepare("SELECT album_id FROM album_author WHERE author_id = ?");
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$member_result = $stmt2->get_result();

// Get all album data
$albums = $conn->query("SELECT * FROM album");
$query = "SELECT id, album_name FROM album";
$result = $conn->query($query);

// Store albums in array
$user_albums = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $user_albums[] = $row;
    }
}

// Determine which albums are editable by current user
$editable_albums = [];
while ($row = $member_result->fetch_assoc()) {
    $editable_albums[] = $row['album_id'];
}
?>

<!DOCTYPE html>
<html lang="zxx">
<head>
	<!-- Page Metadata and Styles -->
	<title>SmartTunes - Albums</title>
	<meta charset="UTF-8">
	<meta name="description" content="albums">
	<meta name="keywords" content="music, html">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="public/assets/img/favicon.ico" rel="shortcut icon"/>
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="public/assets/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="public/assets/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="public/assets/css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="public/assets/css/slicknav.min.css"/>
	<link rel="stylesheet" href="public/assets/css/style.css"/>
</head>
<body>

<!-- Page Preloader -->
<div id="preloder"><div class="loader"></div></div>

<!-- Header Section -->
<header class="header-section clearfix">
	<a href="index.php" class="site-logo">
		<img src="public/assets/img/logo.png" alt="">
	</a>
	<div class="header-right">
		<a href="logout.php" class="hr-btn">Logout</a>
		<span>|</span>
		<div class="user-panel">
<?php if(isset($_SESSION['user_id'])): ?>
	<!-- Show welcome if logged in -->
	<button type="button" class="user-welcome-btn" aria-haspopup="dialog" aria-expanded="false">
              <span class="profile-avatar" aria-hidden="true"><i class="fa fa-user"></i></span>
              <span class="profile-label"><span class="profile-greeting">Welcome back</span><span class="profile-username"><?php echo htmlspecialchars($_SESSION['username']); ?></span></span>
              <i class="fa fa-angle-down profile-chevron" aria-hidden="true"></i>
            </button>
<?php else: ?>
	<!-- Show login/register if not logged in -->
	<a href="login.php" class="login">Login</a>
	<a href="register.php" class="register">Register</a>
<?php endif; ?>
</div>

<!-- User Library Modal -->
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
		<!-- User Playlists -->
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

		<!-- User Songs -->
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
</div>

<!-- Main Navigation -->
<ul class="main-menu">
	<li><a href="index.php">Home</a></li>
	<li><a href="karaoke.php">Karaoke</a></li>
	<li><a href="playlists.php">Playlists</a></li>
	<li><a href="albums.php">Albums</a></li>
	<li><a href="leaderboard.php">Leaderboard</a></li>
	<li><a href="contact.php">Contact Us</a></li>
</ul>
</header>

<!-- Albums Page Header -->
<div class="albums-header">
	<h2>Albums</h2>
</div>

<div class="album-search" style="text-align:center; margin:20px 0;">
  <form id="albumSearchForm">
    <input type="text" id="albumSearchInput" 
           placeholder="Search albums by name" 
           style="padding:10px; width:260px; border-radius:20px; border:1px solid #ccc; font-size:14px;">
    <button type="submit" class="search-btn">Search</button>
  </form>
</div>

<!-- Album Creation Form -->
<form method="POST" action="create_album.php" style="margin-bottom: 20px;">
	<input type="text" name="album_name" placeholder="New album name" required>
	<button type="submit">Create Album</button>
</form>

<?php
// Fetch albums and check authorship
$user_id = $_SESSION['user_id'];
$albums = [];
$sql = "
    SELECT a.id, a.album_name,
           GROUP_CONCAT(u.username SEPARATOR ', ') AS authors,
           CASE WHEN EXISTS (
                SELECT 1 FROM album_author aa 
                WHERE aa.album_id = a.id AND aa.author_id = ?
           ) THEN 1 ELSE 0 END AS is_author
    FROM album a
    JOIN album_author aa ON a.id = aa.album_id
    JOIN user u ON aa.author_id = u.id
    GROUP BY a.id, a.album_name
    ORDER BY a.id DESC
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$albums = [];
while ($row = $result->fetch_assoc()) {
    $albums[] = $row;
}
?>

<!-- Albums Display Grid -->
<div class="album-grid">
<?php foreach ($albums as $album): ?>
	<div class="album-card">
		<a href="album.php?id=<?= $album['id'] ?>">
			<img src="public/assets/img/album-img.jpg" alt="Album Thumbnail">
		</a>
		<h3>
			<a href="album.php?id=<?= $album['id'] ?>" style="text-decoration: none; color: black;">
				<?= htmlspecialchars($album['album_name']) ?>
			</a>
		</h3>
		
		<p style="font-size:13px; color:#333;">
    		Authors: <?= htmlspecialchars($album['authors']) ?>
		</p>

		<?php if ($album['is_author'] === "1" || $album['is_author'] === 1): ?>
			<form action="delete_albums.php" method="POST" 
				onsubmit="return confirm('Delete?')" 
				style="margin-top: 10px;">
				<input type="hidden" name="album_id" value="<?= $album['id'] ?>">
				<button type="submit">x</button>
			</form>
		<?php endif; ?>
	</div>
<?php endforeach; ?>
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

<!-- JavaScript Files -->
<script src="public/assets/js/jquery-3.2.1.min.js"></script>
<script src="public/assets/js/bootstrap.min.js"></script>
<script src="public/assets/js/jquery.slicknav.min.js"></script>
<script src="public/assets/js/owl.carousel.min.js"></script>
<script src="public/assets/js/mixitup.min.js"></script>
<script src="public/assets/js/main.js"></script>
<script src="public/assets/js/user-description.js"></script>
<script src="public/assets/js/search.js"></script>
</body>
</html>
