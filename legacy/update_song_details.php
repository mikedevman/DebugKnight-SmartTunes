<?php
//done
// Set database connection variables
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

// Create a new MySQLi connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the request only if it's a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get song details from POST request
    $id = $_POST["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $tempo = $_POST["tempo"];
    $songkey = $_POST["songkey"];
    $genre = $_POST["genre"];
    $year = $_POST["year"];
    $album = $_POST["album"];

    // Prepare an SQL UPDATE statement to modify the song data
    $stmt = $conn->prepare("UPDATE song SET name = ?, content = ?, tempo = ?, `key` = ?, genre = ?, year_publish = ?, album = ? WHERE song_id = ?");
    
    // Bind the parameters to the SQL statement
    $stmt->bind_param("sssssssi", $title, $content, $tempo, $songkey, $genre, $year, $album, $id);

    // Execute the statement and respond with success or error
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }

    // Close the prepared statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
