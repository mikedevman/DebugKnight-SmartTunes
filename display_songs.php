<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM song ORDER BY song_id DESC");

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
