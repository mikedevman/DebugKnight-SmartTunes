<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $playlist_id = $_POST['playlist_id'] ?? '';

    if ($playlist_id === '') {
        echo json_encode(['success' => false, 'error' => 'Missing playlist ID']);
        exit;
    }

    $conn = new mysqli("127.0.0.1", "root", "", "music_db");

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    // Make sure user owns this playlist before deleting
    $stmt = $conn->prepare("DELETE FROM playlist WHERE id = ? AND user_created = ?");
    $stmt->bind_param("ii", $playlist_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Delete failed']);
    }

    $stmt->close();
    $conn->close();
}
