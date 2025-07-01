<?php
header("Content-Type: application/json");

$conn = new mysqli("127.0.0.1", "root", "", "song_dtb");

if ($conn->connect_error) {
    echo json_encode(["error" => "DB connection failed"]);
    exit();
}

$result = $conn->query("SELECT song_id, name, content, album, time_played FROM song ORDER BY song_id DESC");

$songs = [];
while ($row = $result->fetch_assoc()) {
    $base = pathinfo($row["content"], PATHINFO_FILENAME);

    $songs[] = [
        "title" => $row["name"],
        "artist" => "Album #" . $row["album"],
        "video" => "uploads/" . $row["content"]
    ];
}

echo json_encode($songs);
$conn->close();
?>
