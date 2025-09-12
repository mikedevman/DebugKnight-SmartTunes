<?php
//done
// Start the session
session_start();

// Connect to the database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Update playlist stats (views and time played)
$update = $conn->prepare("
    UPDATE playlist p
    LEFT JOIN (
        SELECT ps.playlist_id,
               IFNULL(SUM(s.view), 0) AS total_view,
               IFNULL(SUM(s.time_played), 0) AS total_time_played
        FROM playlist_song ps
        JOIN song s ON s.song_id = ps.song_id
        GROUP BY ps.playlist_id
    ) stats ON p.id = stats.playlist_id
    SET p.total_view = IFNULL(stats.total_view, 0),
        p.total_time_played = IFNULL(stats.total_time_played, 0)
    WHERE p.user_created = ?
");
$update->bind_param("i", $user_id);
$update->execute();
$update->close();

// Get user's playlists
$stmt = $conn->prepare("
    SELECT id, user_created, playlist_name, description, total_time_played, total_view
    FROM playlist
    WHERE user_created = ?
");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Collect playlists into array
$playlists = [];
while ($row = $result->fetch_assoc()) {
    $playlists[] = $row;
}
$stmt->close();

// Return playlists as JSON
echo json_encode($playlists);

// Close database connection
$conn->close();
?>
