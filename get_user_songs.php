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

// Prepare query to get songs authored by the user
$stmt = $conn->prepare("
    SELECT s.song_id, s.name
    FROM song s
    INNER JOIN song_author sa ON s.song_id = sa.song_id
    WHERE sa.author_id = ?
");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Store songs in array
$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
}
$stmt->close();

// Return songs as JSON
echo json_encode($songs);

// Close database connection
$conn->close();
?>
