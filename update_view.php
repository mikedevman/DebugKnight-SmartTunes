<?php
// Set database connection parameters
$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';

// Create a new MySQLi connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check for connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Decode JSON input from request body
$data = json_decode(file_get_contents("php://input"), true);

// Check if song_id is provided
if (isset($data['song_id'])) {
    // Cast song_id to integer for safety
    $song_id = (int)$data['song_id'];

    // Prepare SQL query to increment view count
    $sql = "UPDATE songs SET view = view + 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);

    // Bind the song_id parameter
    $stmt->bind_param("i", $song_id);

    // Execute the query
    $stmt->execute();

    // Close the statement
    $stmt->close();

    // Send success response
    echo json_encode(["status" => "success"]);
} else {
    // Send error response if song_id is missing
    echo json_encode(["status" => "error", "message" => "song_id missing"]);
}

// Close the database connection
$conn->close();
?>
