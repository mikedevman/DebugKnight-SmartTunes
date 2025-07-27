<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sort = $_GET['sort'] ?? '';

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
        $order_by = 'ORDER BY song_id DESC'; // fallback
        break;
}

$result = $conn->query("SELECT * FROM song $order_by");

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

echo json_encode($songs);
$conn->close();
