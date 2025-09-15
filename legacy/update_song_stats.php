<?php
//done
// Start the session
session_start();

// Set response type to JSON
header("Content-Type: application/json");

// Connect to the MySQL database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check for database connection error
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

// Get and decode JSON data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Extract song_id and increment type from the input data
$songId = $data['song_id'] ?? null;
$increment = $data['increment'] ?? null;

// Check if both required fields are present
if (!$songId || !$increment) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

// --- Update song stats based on increment type ---
if ($increment === "view_and_played") {
    // Increase both view and time_played
    $stmt = $conn->prepare("UPDATE song SET view = view + 1, time_played = time_played + 1 WHERE song_id = ?");
} elseif ($increment === "played_only") {
    // Increase only time_played
    $stmt = $conn->prepare("UPDATE song SET time_played = time_played + 1 WHERE song_id = ?");
} else {
    // Handle invalid increment type
    echo json_encode(["success" => false, "message" => "Invalid increment type"]);
    exit;
}

// Bind song_id to the prepared SQL statement
$stmt->bind_param("i", $songId);

// Execute the SQL update and return the result
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Song stats updated"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

// Close the statement and database connection
$stmt->close();
$conn->close();
?>
