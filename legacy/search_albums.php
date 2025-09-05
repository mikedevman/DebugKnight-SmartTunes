<?php
session_start();

// Database connection setup
header('Content-Type: application/json');

// Connect to the MySQL database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

// Ensure the request is a GET request
$q = isset($_GET['q']) && trim($_GET['q']) !== '' ? '%' . trim($_GET['q']) . '%' : '%';

// Search all albums, include authors for display
$stmt = $conn->prepare("
    SELECT a.id, a.album_name, GROUP_CONCAT(u.username SEPARATOR ', ') AS authors
    FROM album a
    LEFT JOIN album_author aa ON a.id = aa.album_id
    LEFT JOIN user u ON aa.author_id = u.id
    WHERE a.album_name LIKE ?
    GROUP BY a.id
    ORDER BY a.album_name ASC
");
$stmt->bind_param("s", $q);
$stmt->execute();
$res = $stmt->get_result();

// Fetch all albums and their authors
$albums = [];
while ($row = $res->fetch_assoc()) {
    $albums[] = $row;
}

// If no albums found, return an empty array
echo json_encode($albums);

$stmt->close();
$conn->close();
