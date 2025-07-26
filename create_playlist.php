<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $playlist_name = $_POST['playlist_name'] ?? '';

    if ($playlist_name === '') {
        echo json_encode(['success' => false, 'error' => 'Missing playlist name']);
        exit;
    }

    $conn = new mysqli("127.0.0.1", "root", "", "music_db");

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO playlist (user_created, playlist_name, description) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $playlist_name, $description);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Insert failed']);
    }

    $stmt->close();
    $conn->close();
}
