<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Unauthorized");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $album_id = intval($_POST['album_id'] ?? 0);
    $user_id = $_SESSION['user_id'];

    if ($album_id <= 0) {
        die("ID album không hợp lệ.");
    }

    $conn = new mysqli("127.0.0.1", "root", "", "music_db");
    if ($conn->connect_error) {
        die("Kết nối CSDL thất bại: " . $conn->connect_error);
    }

    $check = $conn->prepare("SELECT * FROM album_author WHERE album_id = ? AND author_id = ?");
    $check->bind_param("ii", $album_id, $user_id);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows === 0) {
        http_response_code(403);
        die("Bạn không có quyền xóa album này.");
    }

    $del1 = $conn->prepare("DELETE FROM album_author WHERE album_id = ?");
    $del1->bind_param("i", $album_id);
    $del1->execute();

    $del2 = $conn->prepare("DELETE FROM album WHERE id = ?");
    $del2->bind_param("i", $album_id);
    $del2->execute();

    $conn->close();

    header("Location: albums.php");
    exit;
}
?>