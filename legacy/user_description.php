<?php
// Database connection parameters
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

// Create a new MySQLi database connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check for connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// === Fetch user's playlists ===
$user_playlists = [];
if (isset($_SESSION['user_id'])) {
    // Prepare and execute SQL to fetch playlists owned by the user
    $stmt = $conn->prepare("SELECT id, playlist_name FROM playlist WHERE user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch all playlists as associative array
    $user_playlists = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
}

// === Fetch songs uploaded by the user ===
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Prepare and execute SQL to fetch songs where the user is the author
    $stmt = $conn->prepare("
        SELECT COUNT(*) AS name
        FROM song s
        INNER JOIN song_author sa ON s.song_id = sa.song_id
        WHERE sa.author_id = ?
    ");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Store user's songs in an array
    $user_songs = [];
    while ($row = $result->fetch_assoc()) {
        $user_songs[] = $row;
    }
    $stmt->close();
} else {
    // If not logged in, no user songs
    $user_songs = [];
}
?>
