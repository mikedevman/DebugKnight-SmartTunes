<?php
session_start();
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT id, playlist_name
        FROM playlist 
        WHERE user_created = ?
        ORDER BY id DESC
    ");
    $stmt->execute([$_SESSION['user_id']]);
    $playlists = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($playlists);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}