<?php
session_start();
$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $album_name = $_POST['album_name'];
    $user_id = $_SESSION['user_id'];

    // Tạo album
    $stmt = $conn->prepare("INSERT INTO album (album_name) VALUES (?)");
    $stmt->bind_param("s", $album_name);
    $stmt->execute();
    $album_id = $conn->insert_id;

    // Gán user là thành viên chỉnh sửa album
    $stmt2 = $conn->prepare("INSERT INTO album_author (album_id, author_id) VALUES (?, ?)");
    $stmt2->bind_param("ii", $album_id, $user_id);
    $stmt2->execute();

    header("Location: albums.php");
}
