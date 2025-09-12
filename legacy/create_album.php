<?php
//done
// Start the session to access user data
session_start();

// Database connection credentials
$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';

// Create a connection to the MySQL database
$conn = new mysqli($host, $user, $password, $dbname);

// Stop the script and show error if the connection fails
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST (form was submitted)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the album name from the form input
    $album_name = $_POST['album_name'];

    // Get the currently logged-in user's ID
    $user_id = $_SESSION['user_id'];

    // Insert the new album into the 'album' table
    $stmt = $conn->prepare("INSERT INTO album (album_name) VALUES (?)");
    $stmt->bind_param("s", $album_name);
    $stmt->execute();

    // Get the ID of the newly created album
    $album_id = $conn->insert_id;

    // Assign the current user as an author of the album
    $stmt2 = $conn->prepare("INSERT INTO album_author (album_id, author_id) VALUES (?, ?)");
    $stmt2->bind_param("ii", $album_id, $user_id);
    $stmt2->execute();

    // Redirect to the albums page after creation
    header("Location: albums.php");
}
