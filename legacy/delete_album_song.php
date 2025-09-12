<?php
//done 
// Start session to access user data
session_start();

// Return response as JSON
header('Content-Type: application/json');

// Get user ID from session or set to null if not logged in
$userId = $_SESSION['user_id'] ?? null;

// If user is not logged in, return error and stop
if (!$userId) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
    exit;
}

// Connect to the MySQL database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// If connection fails, return error
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

// Get JSON input data
$data = json_decode(file_get_contents("php://input"), true);

// Get album ID and song ID from the input data
$albumId = $data["album_id"] ?? null;
$songId  = $data["song_id"] ?? null;

// Check if either album ID or song ID is missing
if ($albumId === null || $songId === null) {
    echo json_encode(["status" => "error", "message" => "Missing album_id or song_id."]);
    exit;
}

// Check if user is the author of the album
$check = $conn->prepare("SELECT album_id FROM album_author WHERE album_id = ? AND author_id = ?");
$check->bind_param("ii", $albumId, $userId);
$check->execute();
$result_check = $check->get_result();

// If the user is not authorized to edit the album, return error
if ($result_check->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'You do not have permission to perform this action.']);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Prepare SQL to remove the song from the album
$stmt = $conn->prepare("UPDATE song SET album = NULL WHERE song_id = ? AND album = ?");
$stmt->bind_param("ii", $songId, $albumId);

// Execute the update query
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Song removed from album successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Song not found in this album."]);
    }
} else {
    // Return error if SQL execution fails
    echo json_encode(["status" => "error", "message" => "Execution error: " . $stmt->error]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
