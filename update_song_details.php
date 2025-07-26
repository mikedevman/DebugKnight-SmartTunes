<?php
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $tempo = $_POST["tempo"];
    $songkey = $_POST["songkey"];
    $genre = $_POST["genre"];
    $year = $_POST["year"];
    $album = $_POST["album"];

    $stmt = $conn->prepare("UPDATE song SET name = ?, content = ?, tempo = ?, `key` = ?, genre = ?, year_publish = ?, album = ? WHERE song_id = ?");
    $stmt->bind_param("sssssssi", $title, $content, $tempo, $songkey, $genre, $year, $album, $id);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
