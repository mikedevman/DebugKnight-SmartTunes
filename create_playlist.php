<?php
header('Content-Type: application/json');

$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  echo json_encode(["success" => false, "error" => "Database connection failed"]);
  exit;
}

// Get POST values safely
$playlistName = isset($_POST['playlist_name']) ? trim($_POST['playlist_name']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';

if ($playlistName === '') {
  echo json_encode(["success" => false, "error" => "Playlist name is required"]);
  exit;
}

// Prepare & insert into `playlist` table
$stmt = $conn->prepare("INSERT INTO playlist (user_created, playlist_name, description, total_view, total_time_played) VALUES (?, ?, ?, 0, 0)");
if (!$stmt) {
  echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
  exit;
}
$stmt->bind_param("iss", $userId, $playlistName, $description);
if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => "Execute failed: " . $stmt->error]);
}
$stmt->close();
$conn->close();
?>
