<?php
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

    // Prepare SQL to insert new playlist (NOTE: $description is undefined here)
    $stmt = $conn->prepare("INSERT INTO playlist (user_created, playlist_name, description) VALUES (?, ?, ?)");
    
    // Bind the parameters (user ID, playlist name, and description)
    $stmt->bind_param("iss", $user_id, $playlist_name, $description); // $description is not defined yet!

    // Try to run the query and return success or error
    if ($stmt->execute()) {
        $update = $conn->prepare("UPDATE user SET playlists_created = playlists_created + 1 WHERE id = ?");
        $update->bind_param("i", $user_id);
        $update->execute();
        $update->close();
        
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Insert failed']);
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();
}
