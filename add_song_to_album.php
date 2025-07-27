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
    $album_id = $_POST['album_id'];
    $song_id = $_POST['song_id'];
    $user_id = $_SESSION['user_id'];

    // Kiểm tra xem user có quyền sửa album không
    $stmt = $conn->prepare("SELECT * FROM album_author WHERE album_id = ? AND author_id = ?");
    $stmt->bind_param("ii", $album_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Update bài hát để gán vào album
        $stmt2 = $conn->prepare("UPDATE song SET album = ? WHERE id = ?");
        $stmt2->bind_param("ii", $album_id, $song_id);
        $stmt2->execute();
    }

    header("Location: albums.php");
}
