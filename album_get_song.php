<?php
header('Content-Type: application/json');

$albumId = $_GET['id'] ?? null; 
$sort = $_GET['sort'] ?? '';

if (!$albumId) {
    echo json_encode(['success' => false, 'message' => 'Missing album ID']);
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
    SELECT song_id, name, content, tempo, `key`, genre, year_publish, time_played
    FROM song s
    WHERE album = ?
    ORDER BY $orderBy
");
$stmt->bind_param("i", $albumId);
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
