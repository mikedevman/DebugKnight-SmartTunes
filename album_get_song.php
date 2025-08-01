<?php
// Set response format to JSON
header('Content-Type: application/json');

// Get album ID from the request
$albumId = $_GET['id'] ?? null; 
if (!$albumId) {
    echo json_encode(['success' => false, 'message' => 'Missing album ID.']);
    exit;
}

// Connect to the database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Failed to connect to database.']);
    exit;
}

// Query songs from the album
$stmt = $conn->prepare("
    SELECT song_id, name, content, tempo, `key`, genre, year_publish, time_played 
    FROM song 
    WHERE album = ?
    ORDER BY name ASC
");
$stmt->bind_param("i", $albumId);
$stmt->execute();
$result = $stmt->get_result();

// Build song list
$songs = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = [
            "id"         => $row["song_id"],
            "title"      => htmlspecialchars($row["name"]),
            "video"      => $row["content"],
            "tempo"      => $row["tempo"],
            "songkey"    => $row["key"],
            "genre"      => $row["genre"],
            "year"       => $row["year_publish"],
            "timeplayed" => $row["time_played"]
        ];
    }
}

// Return JSON response
echo json_encode(['success' => true, 'songs' => $songs]);

// Close connections
$stmt->close();
$conn->close();
?>
