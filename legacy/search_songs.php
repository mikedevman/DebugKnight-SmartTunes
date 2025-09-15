<?php
//done
// Establish a connection to the MySQL database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check if the connection to the database failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if a search query parameter 'q' is provided and is not empty
if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    // If no query provided, return an empty JSON array and stop execution
    echo json_encode([]);
    exit;
}

// Sanitize and prepare the search term for SQL LIKE clause
$searchTerm = '%' . trim($_GET['q']) . '%';

try {
    // Prepare SQL query to search for songs by name using a LIKE match
    $stmt = $conn->prepare("
        SELECT name, content
        FROM song
        WHERE name LIKE ?
        ORDER BY name ASC
    ");
    // Bind the search term to the query
    $stmt->bind_param("s", $searchTerm);
    // Execute the query
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
    // If any error occurs during query execution, return a 500 error with a message
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
