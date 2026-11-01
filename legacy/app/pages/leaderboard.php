<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

require_once LEGACY_ROOT . '/app/config/database.php';
$conn = smarttunes_db_connect();
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$perPage = 10;
$page = filter_var($_GET['page'] ?? 1, FILTER_VALIDATE_INT, [
    'options' => ['default' => 1, 'min_range' => 1],
]) ?: 1;

// Count the same grouped entries that appear in the leaderboard.
$countResult = $conn->query("
    SELECT COUNT(*) AS total FROM (
        SELECT 1
        FROM playhistory ph
        JOIN user u ON ph.user_id = u.id
        JOIN song s ON ph.song_played = s.song_id
        GROUP BY u.username, s.name, ph.user_recording, ph.date
    ) AS leaderboard_entries
");
$totalEntries = (int) $countResult->fetch_assoc()['total'];
$countResult->free();
$totalPages = max(1, (int) ceil($totalEntries / $perPage));
$page = min($page, $totalPages);
$offset = ($page - 1) * $perPage;
$firstEntry = $totalEntries > 0 ? $offset + 1 : 0;
$lastEntry = min($offset + $perPage, $totalEntries);

$sql = "
    SELECT 
        u.username, 
        s.name AS song_played,
        MAX(ph.score) AS max_score, 
        ph.user_recording, 
        ph.date
    FROM playhistory ph
    JOIN user u ON ph.user_id = u.id
    JOIN song s ON ph.song_played = s.song_id
    GROUP BY u.username, s.name, ph.user_recording, ph.date
    ORDER BY max_score DESC, ph.date DESC, u.username ASC, s.name ASC, ph.user_recording ASC
    LIMIT ? OFFSET ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $perPage, $offset);
$stmt->execute();
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="zxx">
<head>
	<title>SmartTunes - Leaderboard</title>
	<meta charset="UTF-8">
	<meta name="description" content="Hear the performances and explore the SmartTunes karaoke leaderboard.">
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

<style>
.leaderboard-page .leaderboard-section {
  --board-muted: #9aaac4;
  --board-accent: #ff477f;
  margin: 0;
  min-height: 65vh;
  padding: 44px max(24px, calc((100% - 1440px) / 2)) 64px;
  color: #edf2fc;
  background: radial-gradient(ellipse at 8% 0%, #fc025413, transparent 42%), #0a0f1c;
  font-family: 'Montserrat', 'Segoe UI', sans-serif;
}
.leaderboard-page .board-hero { display: flex; align-items: center; justify-content: space-between; gap: 32px; margin-bottom: 32px; }
.leaderboard-page .board-eyebrow { margin: 0 0 14px; color: #ff8eaf; font-size: 10px; font-weight: 700; letter-spacing: 2px; line-height: 1.5; }
.leaderboard-page .board-eyebrow::before { content: ''; display: inline-block; width: 24px; height: 2px; margin: 0 10px 3px 0; background: var(--board-accent); }
.leaderboard-page .board-hero h1 { margin: 0; color: #fff; font-size: clamp(34px, 4.4vw, 60px); font-weight: 700; line-height: 1.12; letter-spacing: -2.4px; }
.leaderboard-page .board-hero h1 span { color: #ff6191; }
.leaderboard-page .board-description { max-width: 580px; margin: 16px 0 0; color: var(--board-muted); font-size: 13px; font-weight: 400; line-height: 1.8; }
.leaderboard-page .board-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.leaderboard-page .board-badges span { padding: 7px 11px; border: 1px solid #ffffff17; border-radius: 20px; color: #b9c6dd; background: #ffffff03; font-size: 10px; }
.leaderboard-page .board-badges i { margin-right: 5px; color: #ff87ac; }
.leaderboard-page .board-trophy { position: relative; display: grid; place-items: center; flex: 0 0 180px; width: 180px; height: 180px; margin: 0 40px; border: 1px solid #ff477f1c; border-radius: 50%; background: radial-gradient(circle, #fc025414, transparent 70%); }
.leaderboard-page .board-trophy::before { content: ''; position: absolute; inset: 17px; border: 1px solid #ff477f26; border-radius: 50%; }
.leaderboard-page .board-trophy > .fa-trophy { color: #ff8eaf; font-size: 58px; filter: drop-shadow(0 8px 24px #fc02543d); transform: rotate(-8deg); }
.leaderboard-page .board-trophy > .fa-star { position: absolute; right: 13px; top: 19px; color: #ffd59d; font-size: 13px; }
.leaderboard-page .board-trophy > .board-star-small { left: 15px; top: auto; bottom: 29px; right: auto; font-size: 8px; opacity: .7; }
.leaderboard-page .leaderboard-container { width: 100%; max-width: none; margin: 0; overflow: hidden; border: 1px solid #ffffff14; border-radius: 16px; background: #121b2b; box-shadow: 0 18px 60px #00000024; }
.leaderboard-page .leaderboard-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; padding: 24px; border-bottom: 1px solid #ffffff12; background: #151f31; text-align: left; }
.leaderboard-page .leaderboard-header h2 { color: #f0f4fe; font-size: 19px; font-weight: 600; line-height: 1.4; letter-spacing: -.5px; }
.leaderboard-page .leaderboard-header p { margin: 5px 0 0; color: var(--board-muted); font-size: 11px; font-weight: 400; line-height: 1.7; }
.leaderboard-page .board-studio-link { display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #ff477f40; border-radius: 8px; background: #fc02540d; color: #ffadc7; font-size: 11px; font-weight: 600; white-space: nowrap; }
.leaderboard-page .board-studio-link:hover { background: #fc025426; color: #fff; }
.leaderboard-page .leaderboard-table { width: 100%; margin: 0; border-collapse: collapse; color: #e5edfb; text-align: left; }
.leaderboard-page .leaderboard-table thead { background: #0e1625; }
.leaderboard-page .leaderboard-table th { padding: 16px; border: 0; color: #7f91ae; font-size: 9px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; }
.leaderboard-page .leaderboard-table td { padding: 18px 16px; border: 0; border-bottom: 1px solid #ffffff0a; vertical-align: middle; }
.leaderboard-page .leaderboard-table tr:last-child td { border-bottom: 0; }
.leaderboard-page .leaderboard-table tbody tr { background: #121b2b; transition: background .15s; }
.leaderboard-page .leaderboard-table tbody tr:nth-child(even) { background: #141e2f; }
.leaderboard-page .leaderboard-table tbody tr:hover { background: #1c273c; }
.leaderboard-page .leaderboard-table .rank { width: 92px; color: #90a0bc; font-size: 13px; font-weight: 600; white-space: nowrap; }
.leaderboard-page .rank-number { display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-width: 48px; min-height: 35px; padding: 5px 9px; border: 1px solid #ffffff12; border-radius: 9px; background: #ffffff04; }
.leaderboard-page .rank-1 .rank-number { color: #ffda86; border-color: #e8be5738; background: #e8be570c; }
.leaderboard-page .rank-2 .rank-number { color: #cfdaef; border-color: #c5d6f42b; background: #c5d6f408; }
.leaderboard-page .rank-3 .rank-number { color: #e6ad8a; border-color: #c9805030; background: #c980500b; }
.leaderboard-page .singer-cell { min-width: 150px; }
.leaderboard-page .singer { display: flex; align-items: center; gap: 10px; }
.leaderboard-page .singer-icon { display: grid; place-items: center; flex: 0 0 32px; height: 32px; border: 1px solid #ff477f20; border-radius: 50%; background: #fc02540b; color: #cc8ca8; font-size: 12px; }
.leaderboard-page .singer-name { color: #f0f3fb; font-size: 12px; font-weight: 600; overflow-wrap: anywhere; }
.leaderboard-page .song-cell { width: 22%; min-width: 150px; }
.leaderboard-page .track-name { display: block; color: #b2c0d8; font-size: 12px; font-weight: 400; line-height: 1.7; overflow-wrap: anywhere; }
.leaderboard-page .score-cell { width: 110px; white-space: nowrap; }
.leaderboard-page .board-score { color: #ff85aa; font-size: 22px; font-weight: 700; letter-spacing: -.8px; }
.leaderboard-page .board-score-max { display: block; color: #7386a6; font-size: 9px; line-height: 1.5; }
.leaderboard-page .recording-cell { width: 330px; min-width: 290px; }
.leaderboard-page .recording-player { padding: 8px 9px 7px; border: 1px solid #35415b; border-radius: 10px; background: #0b1322; }
.leaderboard-page .leaderboard-audio { display: block; width: 100%; min-width: 250px; height: 40px; margin: 0; border-radius: 8px; color-scheme: dark; }
.leaderboard-page .recording-open { display: inline-flex; align-items: center; gap: 5px; margin: 7px 4px 0; color: #9eafcc; font-size: 9px; text-decoration: none; }
.leaderboard-page .recording-open:hover { color: #ffadc7; }
.leaderboard-page .date-cell { min-width: 110px; max-width: 150px; color: #8b9db9; font-size: 10px; font-variant-numeric: tabular-nums; line-height: 1.8; }
.leaderboard-page .recording-unavailable { color: #6e819f; font-size: 10px; white-space: nowrap; }
.leaderboard-page .recording-unavailable i { margin-right: 5px; }
.leaderboard-page .no-scores { padding: 50px 20px !important; color: #9aaac4; font-size: 13px; text-align: center; }
.leaderboard-page .leaderboard-pagination { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 20px 24px; border-top: 1px solid #ffffff12; background: #10192a; }
.leaderboard-page .leaderboard-pagination p { margin: 0; color: var(--board-muted); font-size: 10px; line-height: 1.6; }
.leaderboard-page .leaderboard-pagination ul { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; margin: 0; padding: 0; list-style: none; }
.leaderboard-page .leaderboard-pagination :is(a,.page-current,.page-disabled,.page-gap) { display: block; min-width: 31px; padding: 8px 10px; border-radius: 6px; color: #b2c0d8; font-size: 10px; text-align: center; }
.leaderboard-page .leaderboard-pagination a { border: 1px solid #ffffff14; background: #1b263b; }
.leaderboard-page .leaderboard-pagination a:hover,.leaderboard-page .leaderboard-pagination .page-current { background: #fc0254; color: #fff; }
.leaderboard-page .leaderboard-pagination .page-disabled { color: #586c8f; }
.leaderboard-page .leaderboard-section a:focus-visible,.leaderboard-page .leaderboard-audio:focus-visible { outline: 2px solid #ff91b3; outline-offset: 3px; }
@media (max-width: 1100px) {
  .leaderboard-page .board-trophy { margin-right: 10px; }
  .leaderboard-page .leaderboard-table td,.leaderboard-page .leaderboard-table th { padding-left: 11px; padding-right: 11px; }
  .leaderboard-page .recording-cell { min-width: 270px; }
  .leaderboard-page .singer-cell { min-width: 130px; }
}
@media (max-width: 950px) {
  .leaderboard-page .leaderboard-section { padding: 30px 20px 40px; }
  .leaderboard-page .board-trophy { flex-basis: 125px; width: 125px; height: 125px; margin: 0; }
  .leaderboard-page .board-trophy > .fa-trophy { font-size: 43px; }
  .leaderboard-page .leaderboard-container { background: transparent; border: 0; box-shadow: none; overflow: visible; }
  .leaderboard-page .leaderboard-header { margin-bottom: 14px; padding: 20px; border: 1px solid #ffffff14; border-radius: 12px; }
  .leaderboard-page .table-responsive { overflow: visible; }
  .leaderboard-page .leaderboard-table,.leaderboard-page .leaderboard-table tbody { display: block; }
  .leaderboard-page .leaderboard-table thead { display: none; }
  .leaderboard-page .leaderboard-table tbody tr { display: grid; grid-template-columns: 50px minmax(0,1fr) auto; align-items: center; gap: 10px 12px; margin-bottom: 12px; padding: 16px; border: 1px solid #ffffff14; border-radius: 12px; }
  .leaderboard-page .leaderboard-table td { display: block; width: auto; min-width: 0; max-width: none; padding: 0; border: 0; }
  .leaderboard-page .leaderboard-table .rank { grid-column: 1; grid-row: 1; width: auto; }
  .leaderboard-page .rank-number { min-width: 44px; padding: 5px; }
  .leaderboard-page .singer-cell { grid-column: 2; grid-row: 1; }
  .leaderboard-page .singer-icon { display: none; }
  .leaderboard-page .score-cell { grid-column: 3; grid-row: 1 / 3; text-align: right; }
  .leaderboard-page .song-cell { grid-column: 1 / 3; grid-row: 2; }
  .leaderboard-page .recording-cell { grid-column: 1 / -1; grid-row: 3; }
  .leaderboard-page .leaderboard-audio { min-width: 0; }
  .leaderboard-page .date-cell { grid-column: 1 / -1; grid-row: 4; color: #7185a4; }
  .leaderboard-page .leaderboard-pagination { border: 1px solid #ffffff14; border-radius: 12px; }
  .leaderboard-page .leaderboard-table .no-scores { grid-column: 1 / -1; }
}
@media (max-width: 540px) {
  .leaderboard-page .leaderboard-section { padding: 26px 16px 36px; }
  .leaderboard-page .board-hero { gap: 0; margin-bottom: 24px; }
  .leaderboard-page .board-hero h1 { font-size: 40px; letter-spacing: -1.8px; }
  .leaderboard-page .board-hero h1 span { display: block; }
  .leaderboard-page .board-description { font-size: 11px; }
  .leaderboard-page .board-eyebrow { font-size: 8px; letter-spacing: 1.5px; }
  .leaderboard-page .board-trophy { display: none; }
  .leaderboard-page .leaderboard-header { align-items: flex-start; padding: 18px; }
  .leaderboard-page .leaderboard-header h2 { font-size: 17px; }
  .leaderboard-page .board-studio-link { padding: 8px 12px; font-size: 10px; }
  .leaderboard-page .leaderboard-pagination { padding: 18px; }
  .leaderboard-page .board-score { font-size: 21px; }
}
@media (prefers-reduced-motion: reduce) {
  .leaderboard-page .leaderboard-table tbody tr { transition: none; }
}
</style>
</head>
<body class="leaderboard-page">
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

<main class="leaderboard-section">
  <div class="board-hero">
    <div>
      <p class="board-eyebrow">SMARTTUNES / THE LEADERBOARD</p>
      <h1>The spotlight <span>is yours.</span></h1>
      <p class="board-description">Every voice has a moment. Explore the rankings and press play to hear the performances behind the scores.</p>
      <div class="board-badges"><span><i class="fa fa-microphone" aria-hidden="true"></i> Voice level scores</span><span><i class="fa fa-headphones" aria-hidden="true"></i> Listen to the recordings</span></div>
    </div>
    <div class="board-trophy" aria-hidden="true"><i class="fa fa-trophy"></i><i class="fa fa-star"></i><i class="fa fa-star board-star-small"></i></div>
  </div>
  <div class="leaderboard-container">
    <div class="leaderboard-header">
      <div><h2>The lineup</h2><p>Ranked performances &middot; 10 entries per page</p></div>
      <a href="karaoke.php" class="board-studio-link"><i class="fa fa-microphone" aria-hidden="true"></i> Take the stage <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
    </div>
    <div class="table-responsive">
      <table class="leaderboard-table" aria-label="Ranked karaoke performances">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Singer</th>
            <th scope="col">Song</th>
            <th scope="col">Voice score</th>
            <th scope="col">Listen to the performance</th>
            <th scope="col">Recorded</th>
          </tr>
        </thead>
        <tbody>
          <?php
          $rank = $offset + 1;
          if ($result && $result->num_rows > 0):
              while ($row = $result->fetch_assoc()):
                  $rankClass = "";
                  $medal = "";
                  if ($rank === 1) { $rankClass = "rank-1"; $medal = "🥇"; }
                  elseif ($rank === 2) { $rankClass = "rank-2"; $medal = "🥈"; }
                  elseif ($rank === 3) { $rankClass = "rank-3"; $medal = "🥉"; }
          ?>
          <tr>
            <td class="rank <?= $rankClass ?>"><span class="rank-number">#<?= $rank ?> <?= $medal ?></span></td>
            <td class="singer-cell"><div class="singer"><span class="singer-icon" aria-hidden="true"><i class="fa fa-user"></i></span><span class="singer-name"><?= htmlspecialchars($row['username']) ?></span></div></td>
            <td class="song-cell"><span class="track-name"><?= htmlspecialchars($row['song_played']) ?></span></td>
            <td class="score-cell"><span class="board-score"><?= isset($row['max_score']) && is_numeric($row['max_score']) 
                ? number_format($row['max_score'], 2) 
                : 'N/A'; ?></span><span class="board-score-max">/ 100</span></td>
            <td class="recording-cell">
              <?php if (!empty($row['user_recording'])): ?>
                        <div class="recording-player"><audio class="leaderboard-audio" controls preload="metadata" aria-label="Listen to this performance">
                            <source src="<?= htmlspecialchars($row['user_recording']); ?>">
                            Your browser does not support the audio element.
                        </audio>
                        <a class="recording-open" href="<?= htmlspecialchars($row['user_recording']); ?>" target="_blank" rel="noopener">Open recording <i class="fa fa-external-link" aria-hidden="true"></i></a></div>
              <?php else: ?>
                <span class="recording-unavailable"><i class="fa fa-microphone-slash" aria-hidden="true"></i> No recording attached</span>
              <?php endif; ?>
            </td>
            <td class="date-cell"><?= htmlspecialchars($row['date']) ?></td>
          </tr>
          <?php $rank++; endwhile; else: ?>
          <tr>
            <td colspan="6" class="no-scores">No scores available yet.</td>
          </tr>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
    <div class="leaderboard-pagination">
      <p>Showing <?= $firstEntry ?>&ndash;<?= $lastEntry ?> of <?= $totalEntries ?> entries</p>
      <?php if ($totalPages > 1): ?>
      <nav aria-label="Leaderboard pages">
        <ul>
          <li>
            <?php if ($page > 1): ?>
              <a href="?page=<?= $page - 1 ?>" rel="prev">Previous</a>
            <?php else: ?>
              <span class="page-disabled" aria-disabled="true">Previous</span>
            <?php endif; ?>
          </li>
          <?php
          // A bounded page window avoids rendering thousands of navigation links.
          $visiblePages = array_unique(array_merge([1], range(max(1, $page - 2), min($totalPages, $page + 2)), [$totalPages]));
          $previousPage = 0;
          foreach ($visiblePages as $pageNumber):
              if ($previousPage > 0 && $pageNumber - $previousPage > 1):
          ?>
            <li><span class="page-gap" aria-hidden="true">&hellip;</span></li>
          <?php endif; ?>
          <li>
            <?php if ($pageNumber === $page): ?>
              <span class="page-current" aria-current="page" aria-label="Page <?= $pageNumber ?>"><?= $pageNumber ?></span>
            <?php else: ?>
              <a href="?page=<?= $pageNumber ?>" aria-label="Page <?= $pageNumber ?>"><?= $pageNumber ?></a>
            <?php endif; ?>
          </li>
          <?php $previousPage = $pageNumber; endforeach; ?>
          <li>
            <?php if ($page < $totalPages): ?>
              <a href="?page=<?= $page + 1 ?>" rel="next">Next</a>
            <?php else: ?>
              <span class="page-disabled" aria-disabled="true">Next</span>
            <?php endif; ?>
          </li>
        </ul>
      </nav>
      <?php endif; ?>
    </div>
  </div>
</main>
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

<?php $stmt->close(); $conn->close(); ?>
