<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("
    SELECT s.song_id, s.name, s.content, s.tempo, s.`key`, s.genre, s.year_publish, s.album, s.time_played
    FROM playlist_song ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ?
    ORDER BY s.song_id DESC
");

$stmt->bind_param("i", $playlist_id);
$stmt->execute();

$result = $stmt->get_result();

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
