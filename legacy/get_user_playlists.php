<?php
// Start session
session_start();

// Connect to the database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Prepare query to get user's playlists
$stmt = $conn->prepare("
    SELECT id, playlist_name AS name
    FROM playlist
    WHERE user_created = ?
");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Store playlists in array
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
