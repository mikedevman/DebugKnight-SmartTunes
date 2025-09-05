<?php
session_start();

// Database connection setup
$conn = new mysqli("127.0.0.1", "root", "", "music_db");
header('Content-Type: application/json');

// Check for database connection error
if ($conn->connect_error) {
    die(json_encode([]));
}

// Ensure the request is a GET request
if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

// Get user ID from session
$userId = $_SESSION['user_id'];
$q = isset($_GET['q']) ? '%' . trim($_GET['q']) . '%' : '%';

// Prepare SQL to search playlists by name for the current user
$stmt = $conn->prepare("
    SELECT p.id, p.playlist_name, p.description, p.total_view, p.total_time_played
    FROM playlist p
    WHERE p.user_created = ? 
      AND p.playlist_name LIKE ?
    ORDER BY p.playlist_name ASC
");
$stmt->bind_param("is", $userId, $q);
$stmt->execute();
$res = $stmt->get_result();

// Fetch all playlists matching the search criteria
$playlists = [];
while ($row = $res->fetch_assoc()) {
    $playlists[] = $row;
}

// If no playlists found, return an empty array
echo json_encode($playlists);

$stmt->close();
$conn->close();
