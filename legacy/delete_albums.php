<?php
//done
// Start session to access user data
session_start();

// If user is not logged in, stop the script
if (!isset($_SESSION['user_id'])) {
    die("Unauthorized");
}

// Only proceed if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get album ID from POST, convert to integer
    $album_id = intval($_POST['album_id'] ?? 0);

    // Get current user ID from session
    $user_id = $_SESSION['user_id'];

    // Check if album ID is valid
    if ($album_id <= 0) {
        die("Invalid album ID.");
    }

    // Connect to the database
    $conn = new mysqli("127.0.0.1", "root", "", "music_db");

    // Stop if connection fails
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }

    // Check if the user is the author of the album
    $check = $conn->prepare("SELECT * FROM album_author WHERE album_id = ? AND author_id = ?");
    $check->bind_param("ii", $album_id, $user_id);
    $check->execute();
    $result = $check->get_result();

    // If user is not allowed to delete, send 403 response
    if ($result->num_rows === 0) {
        http_response_code(403);
        die("You do not have permission to delete this album.");
    }

    // Delete the album's author link first (to avoid foreign key constraints)
    $del1 = $conn->prepare("DELETE FROM album_author WHERE album_id = ?");
    $del1->bind_param("i", $album_id);
    $del1->execute();

    // Then delete the album itself
    $del2 = $conn->prepare("DELETE FROM album WHERE id = ?");
    $del2->bind_param("i", $album_id);
    $del2->execute();

    // Close database connection
    $conn->close();

    // Redirect back to album list
    header("Location: albums.php");
    exit;
}
?>
