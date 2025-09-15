<?php
//done
// Database connection setup
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Set the content type to JSON
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request is a GET request and has a search query
if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode([]);
    exit;
}

// Sanitize and prepare the search term for SQL LIKE clause
$searchTerm = '%' . trim($_GET['q']) . '%';

// Prepare SQL query to search for songs in playlists by name using a LIKE match
try {
    $stmt = $conn->prepare("
        SELECT s.name, s.genre, s.year_publish, p.playlist_name
        FROM song s
        JOIN playlist_song ps ON s.song_id = ps.song_id
        JOIN playlist p ON ps.playlist_id = p.id
        WHERE s.name LIKE ?
        GROUP BY s.song_id, p.id
        ORDER BY s.name ASC
    ");
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();

    // Get the result set from the executed query
    $result = $stmt->get_result();
    $songs = [];

    // Loop through the result rows and store them in an array
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }

    // Output the songs as a JSON array
    echo json_encode($songs);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
