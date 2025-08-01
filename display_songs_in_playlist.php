<?php
// Connect to database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL to get songs in the playlist
$stmt = $conn->prepare("
    SELECT s.song_id, s.name, s.content, s.tempo, s.`key`, s.genre, s.year_publish, s.album, s.time_played
    FROM playlist_song ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ?
    ORDER BY s.song_id DESC
");

// Bind playlist ID
$stmt->bind_param("i", $playlist_id);

// Run the query
$stmt->execute();

// Get query result
$result = $stmt->get_result();

// Collect songs into array
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
