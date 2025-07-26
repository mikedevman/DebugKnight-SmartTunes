<?php
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

$result = $conn->query("SELECT * FROM playlist ORDER BY id DESC");
$playlists = [];

while ($row = $result->fetch_assoc()) {
    $playlists[] = $row;
}

echo json_encode($playlists);
?>
