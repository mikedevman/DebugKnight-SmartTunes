<?php
//done
// Connect to database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get sort option from URL
$sort = $_GET['sort'] ?? '';

// Set sort order based on option
switch ($sort) {
    case 'az':
        $order_by = 'ORDER BY name ASC';
        break;
    case 'za':
        $order_by = 'ORDER BY name DESC';
        break;
    case 'views':
        $order_by = 'ORDER BY view DESC';
        break;
    case 'played':
        $order_by = 'ORDER BY time_played DESC';
        break;
    default:
        $order_by = 'ORDER BY song_id DESC';
        break;
}

// Run the query with sorting
$result = $conn->query("SELECT * FROM song $order_by");

// Build songs array
$songs = array();
while ($row = $result->fetch_assoc()) {
    $songs[] = array(
        "id" => $row["song_id"],
        "title" => $row["name"],
        "video" => !empty($row["content"]) ? $row["content"] : null,
        "tempo" => $row["tempo"],
        "songkey" => $row["key"],
        "genre" => $row["genre"],
        "year" => $row["year_publish"],
        "album" => $row["album"],
        "timeplayed" => $row["time_played"]
    );
}

// Return as JSON
echo json_encode($songs);

// Close connection
$conn->close();
