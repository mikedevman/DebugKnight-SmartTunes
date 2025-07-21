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
<<<<<<< HEAD
        "video" => (!empty($row["content"]) ? "uploads/" . $row["content"] : null)
=======
        "video" => !empty($row["content"]) ? $row["content"] : null
>>>>>>> e6b527800edbc214783ce1dedd7863d11126a88c
    );
}

echo json_encode($songs);
$conn->close();
