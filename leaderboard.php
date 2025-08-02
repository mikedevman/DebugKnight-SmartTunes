<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$sql = "
    SELECT 
        u.username, 
        MAX(ph.score) AS max_score, 
        ph.user_recording, 
        ph.date
    FROM playhistory ph
    JOIN user u ON ph.user_id = u.id
    GROUP BY u.username
    ORDER BY max_score DESC
";
$result = $conn->query($sql);
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
	<link href="img/favicon.ico" rel="shortcut icon"/>

	<!-- Google font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet">
 
	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
	<link rel="stylesheet" href="css/font-awesome.min.css"/>
	<link rel="stylesheet" href="css/owl.carousel.min.css"/>
	<link rel="stylesheet" href="css/slicknav.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- Main Stylesheets -->
	<link rel="stylesheet" href="css/style.css"/>


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
	<div class="history-btn">
		<a href="history.php"><button>Score History</button></a>
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

  <style>
    body {
        background: white;
        font-family: 'Montserrat', sans-serif;
        color: #fff;
    }
    .leaderboard-section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 200px); /* leave room for header & footer */
        padding: 40px 20px;
    }
    .leaderboard-container {
        width: 100%;
        max-width: 1000px;
        background: #111b4a;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        overflow: hidden;
    }
    .leaderboard-header {
        text-align: center;
        padding: 40px 20px;
        background: #0f1a4c;
    }
    .leaderboard-header h2 {
        margin: 0;
        font-size: 36px;
        font-weight: 700;
        color: #ff0059;
    }
    .leaderboard-header p {
        color: #d1d5db;
        font-size: 18px;
    }
    thead {
        background: #192255;
    }
    thead th {
        font-weight: 600;
        font-size: 18px;
        color: #ff9bd3;
        padding: 18px;
    }
    tbody td {
        font-size: 16px;
        padding: 16px;
    }
    tbody tr {
        transition: background 0.3s ease;
    }
    tbody tr:hover {
        background: rgba(255, 255, 255, 0.07);
    }
    .rank {
        font-weight: bold;
        font-size: 20px;
    }
    .rank-1 { color: gold; }
    .rank-2 { color: silver; }
    .rank-3 { color: #cd7f32; } /* bronze */
    .btn-listen {
        background: #ff0059;
        color: white;
        font-weight: 500;
        padding: 8px 20px;
        border-radius: 25px;
        text-decoration: none;
        transition: background 0.3s ease;
        font-size: 14px;
    }
    .btn-listen:hover {
        background: #ff3385;
        color: #fff;
    }
    .no-scores {
        text-align: center;
        padding: 30px;
        font-style: italic;
        color: #bbb;
        font-size: 18px;
    }
    .header-section .main-menu a {
    text-decoration: none;
    }
  </style>
</head>
<body>

<div class="leaderboard-section">
  <div class="leaderboard-container">
    <div class="leaderboard-header">
      <h2>Karaoke Leaderboard</h2>
      <p>Top Singers with the Highest Scores</p>
    </div>
    <div class="table-responsive">
      <table class="table table-borderless align-middle text-center mb-0">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Recording</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <?php
          $rank = 1;
          if ($result && $result->num_rows > 0):
              while ($row = $result->fetch_assoc()):
                  $rankClass = "";
                  $medal = "";
                  if ($rank === 1) { $rankClass = "rank-1"; $medal = "🥇"; }
                  elseif ($rank === 2) { $rankClass = "rank-2"; $medal = "🥈"; }
                  elseif ($rank === 3) { $rankClass = "rank-3"; $medal = "🥉"; }
          ?>
          <tr>
            <td class="rank <?= $rankClass ?>">#<?= $rank ?> <?= $medal ?></td>
            <td><?= htmlspecialchars($row['username']) ?></td>
            <td><?= isset($row['max_score']) && is_numeric($row['max_score']) 
                ? number_format($row['max_score'], 2) 
                : 'N/A'; ?></td>
            <td>
              <?php if (!empty($row['user_recording'])): ?>
                        <audio controls style="width: 200px;">
                            <source src="<?= htmlspecialchars($row['user_recording']); ?>" type="audio/wav">
                            Your browser does not support the audio element.
                        </audio>
              <?php else: ?>
                N/A
              <?php endif; ?>
            </td>
            <td><?= htmlspecialchars($row['date']) ?></td>
          </tr>
          <?php $rank++; endwhile; else: ?>
          <tr>
            <td colspan="5" class="no-scores">No scores available yet.</td>
          </tr>
          <?php endif; ?>
        </tbody>
      </table>
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
	
	<!--====== Javascripts & Jquery ======-->
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.slicknav.min.js"></script>
	<script src="js/owl.carousel.min.js"></script>
	<script src="js/mixitup.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/user-description.js"></script>
    </body>
</html>

<?php $conn->close(); ?>
        