<?php
//done
// Start the session to access user data
session_start();

// Set response type to JSON so the frontend can understand it as a JSON object
header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
    exit;
}

// Get the logged-in user's ID from the session
$user_id = $_SESSION['user_id'];

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the playlist name from the request, or set to empty if not provided
    $playlist_name = $_POST['playlist_name'] ?? '';
    $description = $_POST['description'] ?? ''; // make sure description is defined

    // If the playlist name is empty, return error
    if ($playlist_name === '') {
        echo json_encode(['success' => false, 'error' => 'Missing playlist name']);
        exit;
    }

    // Connect to the database
    $conn = new mysqli("127.0.0.1", "root", "", "music_db");

    // If connection fails, return error
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    // Start transaction
    $conn->begin_transaction();

    try {
        // Prepare SQL to insert new playlist
        $stmt = $conn->prepare("INSERT INTO playlist (user_created, playlist_name, description) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $user_id, $playlist_name, $description);

        if ($stmt->execute()) {
            // Update user playlists_created count
            $update = $conn->prepare("UPDATE user SET playlists_created = playlists_created + 1 WHERE id = ?");
            $update->bind_param("i", $user_id);
            $update->execute();
            $update->close();

            // Commit transaction
            $conn->commit();

            echo json_encode(['success' => true]);
        } else {
            throw new Exception('Insert failed');
        }

        $stmt->close();
    } catch (Exception $e) {
        // Rollback transaction if something fails
        $conn->rollback();
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    // Close connection
    $conn->close();
}
