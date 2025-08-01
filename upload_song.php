<?php
// Start session to access user authentication info
session_start();

// Create a new MySQLi database connection
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check for connection failure
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    die("You must be logged in to upload songs.");
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Collect POST data with fallback defaults
$title      = $_POST['title'] ?? '';
$content    = $_POST['content'] ?? '';
$view       = $_POST['view'] ?? '';
$genre      = $_POST['genre'] ?? '';
$year       = $_POST['year'] ?? '';
$albumID    = $_POST['album'] ?? '';
$tempo      = $_POST['tempo'] ?? '';
$songkey    = $_POST['songkey'] ?? '';
$timeplayed = $_POST['timeplayed'] ?? '';

// Validate that the content is a proper YouTube link
if (!preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/', $content)) {
    die("Invalid YouTube link.");
}

// Helper function to convert mm:ss to seconds (not used here, but defined)
function convertToSeconds($timeStr) {
    list($min, $sec) = explode(':', $timeStr);
    return ((int)$min * 60) + (int)$sec;
}

// Start a database transaction
$conn->begin_transaction();

try {
    // Insert the new song into the `song` table
    $stmt = $conn->prepare("INSERT INTO song (name, content, view, genre, year_publish, album, tempo, `key`, time_played)
                            VALUES (?, ?, 0, ?, ?, ?, ?, ?, 0)");
    $stmt->bind_param("sssiiis", $title, $content, $genre, $year, $albumID, $tempo, $songkey);
    
    // Execute and check for errors
    if (!$stmt->execute()) {
        throw new Exception("Error inserting song: " . $stmt->error);
    }

    // Get the ID of the newly inserted song
    $song_id = $stmt->insert_id;
    $stmt->close();

    // Link the song to the current user (author) in `song_author` table
    $stmt2 = $conn->prepare("INSERT INTO song_author (song_id, author_id) VALUES (?, ?)");
    $stmt2->bind_param("ii", $song_id, $user_id);
    
    // Execute and check for errors
    if (!$stmt2->execute()) {
        throw new Exception("Error linking song to author: " . $stmt2->error);
    }

    $stmt2->close();

    // Commit transaction if everything was successful
    $conn->commit();

    // Redirect to karaoke page with success message
    header("Location: karaoke.php?upload=success");
    exit();

} catch (Exception $e) {
    // Rollback transaction if any error occurs
    $conn->rollback();
    echo "Upload failed: " . $e->getMessage();
}

// Close the database connection
$conn->close();
?>
