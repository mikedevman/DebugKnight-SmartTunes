
<?php
//done
// Database connection settings
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

// Connect to the database
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get song ID and name
$sql = "SELECT song_id, name FROM song";
$result = $conn->query($sql);

// Initialize array to store songs
$songs = [];

// Fetch data if available
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}

// Close the connection
$conn->close();

// Return songs as JSON
header("Content-Type: application/json");
echo json_encode($songs);
?>
