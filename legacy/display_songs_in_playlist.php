<?php
header('Content-Type: application/json');

$playlist_id = $_GET['id'] ?? null;
$sort = $_GET['sort'] ?? '';

if (!$playlist_id) {
    echo json_encode(['success' => false, 'message' => 'Missing playlist ID']);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

$orderBy = match($sort) {
    'az' => 's.name ASC',
    'za' => 's.name DESC',
    'views' => 's.view DESC',
    'played' => 's.time_played DESC',
    default => 's.song_id DESC' // newest
};

$stmt = $conn->prepare("
    SELECT s.song_id, s.name, s.content, s.tempo, s.`key`, s.genre, s.year_publish, s.time_played
    FROM playlist_song ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ?
    ORDER BY $orderBy
");
$stmt->bind_param("i", $playlist_id);
$stmt->execute();
$result = $stmt->get_result();

$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = [
        "id" => $row["song_id"],
        "title" => $row["name"],
        "video" => $row["content"],
        "tempo" => $row["tempo"],
        "songkey" => $row["key"],
        "genre" => $row["genre"],
        "year" => $row["year_publish"],
        "timeplayed" => $row["time_played"]
    ];
}

echo json_encode(['success' => true, 'songs' => $songs]);

$stmt->close();
$conn->close();
