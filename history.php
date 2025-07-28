<?php
session_start();
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$user_id = $_SESSION['user_id'];

$sql = "SELECT p.id, s.name, p.date, p.score, p.user_recording 
        FROM playhistory p 
        JOIN song s ON p.song_played = s.song_id 
        WHERE p.user_id = ? 
        ORDER BY p.date DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html>
<head>
  <title>Play History</title>
</head>
<body>
  <h1>Your Singing History</h1>
  <table border="1">
    <tr>
      <th>Song</th>
      <th>Date</th>
      <th>Score</th>
      <th>Recording</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()): ?>
      <tr>
        <td><?php echo htmlspecialchars($row['name']); ?></td>
        <td><?php echo $row['date']; ?></td>
        <td><?php echo $row['score']; ?></td>
        <td><audio controls src="<?php echo $row['user_recording']; ?>"></audio></td>
      </tr>
    <?php endwhile; ?>
  </table>
</body>
</html>
