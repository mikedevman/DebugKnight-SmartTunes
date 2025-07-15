<?php
$uploadDir = "uploads/";

$filename = basename($_FILES["songfile"]["name"]);
$targetPath = $uploadDir . $filename;

$title = $_POST['title'];
$genre = $_POST['genre'];
$year = $_POST['year'];
$albumID = $_POST['album'];

$fileType = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
if ($fileType !== "mp4") {
    die("Only MP4 files are allowed.");
}

if (move_uploaded_file($_FILES["songfile"]["tmp_name"], $targetPath)) {

    $conn = new mysqli("127.0.0.1", "root", "", "music_db");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("
        INSERT INTO song (
            name, content, genre, year_publish, album
        ) VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("sssis", $title, $filename, $genre, $year, $albumID);

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
