<?php
$uploadDir = "uploads/";
$lyricsDir = "lyrics/";

$filename = basename($_FILES["songfile"]["name"]);
$targetPath = $uploadDir . $filename;

$name = $_POST['title'];
$tempo = $_POST['tempo'];
$key = $_POST['songkey'];
$genre = $_POST['genre'];
$year = $_POST['year'];
$timePlayed = $_POST['timeplayed'];
$albumID = $_POST['album'];


$fileType = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
if ($fileType !== "mp3") {
    die("Only MP3 files are allowed.");
}

if (move_uploaded_file($_FILES["songfile"]["tmp_name"], $targetPath)) {

    $conn = new mysqli("127.0.0.1", "root", "", "song_dtb");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("
        INSERT INTO song (
            name, content, view, time_played, `key`, tempo, genre, year_publish, album
        ) VALUES (?, ?, 0, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("sssssssi", $name, $filename, $timePlayed, $key, $tempo, $genre, $year, $albumID);

    if ($stmt->execute()) {
        header("Location: karaoke.html?upload=success");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Upload failed.";
}
?>
