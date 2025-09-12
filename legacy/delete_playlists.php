<?php
//done
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $playlist_id = $_POST['playlist_id'] ?? '';

    // Validate playlist ID
    if ($playlist_id === '') {
        echo json_encode(['success' => false, 'error' => 'Missing playlist ID']);
        exit;
    }

    // Connect to the database
    $conn = new mysqli("127.0.0.1", "root", "", "music_db");

    // Handle connection error
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    // Start transaction
    $conn->begin_transaction();

    try {
        // Delete playlist only if user is the owner
        $stmt = $conn->prepare("DELETE FROM playlist WHERE id = ? AND user_created = ?");
        $stmt->bind_param("ii", $playlist_id, $user_id);

        if ($stmt->execute()) {
            $update = $conn->prepare("UPDATE user 
                                      SET playlists_created = GREATEST(playlists_created - 1, 0) 
                                      WHERE id = ?");
            $update->bind_param("i", $user_id);

            if ($update->execute()) {
                $conn->commit(); // Commit if both queries succeed
                echo json_encode(['success' => true]);
            } else {
                throw new Exception('User update failed: ' . $update->error);
            }
            $update->close();
        } else {
            throw new Exception('Delete failed: ' . $stmt->error);
        }

        $stmt->close();

    } catch (Exception $e) {
        $conn->rollback(); // Rollback if any error occurs
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    // Close connection
    $conn->close();
}
