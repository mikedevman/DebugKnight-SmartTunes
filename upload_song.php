<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$title       = $_POST['title'] ?? '';
$content     = $_POST['content'] ?? '';
$genre       = $_POST['genre'] ?? '';
$year        = $_POST['year'] ?? '';
$albumID     = $_POST['album'] ?? '';
$tempo       = $_POST['tempo'] ?? '';
$songkey     = $_POST['songkey'] ?? '';
$timeplayed  = $_POST['timeplayed'] ?? '';

if (!preg_match('/^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.+$/', $content)) {
    die("Link YouTube không hợp lệ.");
}

function convertToSeconds($timeStr) {
    list($min, $sec) = explode(':', $timeStr);
    return ((int)$min * 60) + (int)$sec;
}
$durationSec = convertToSeconds($timeplayed);

$stmt = $conn->prepare("INSERT INTO song (name, content, genre, year_publish, album, tempo, `key`, time_played)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssisiis", $title, $content, $genre, $year, $albumID, $tempo, $songkey, $durationSec);

if ($stmt->execute()) {
    header("Location: karaoke.html?upload=success");
    exit();
} else {
    echo "Lỗi khi thêm bài hát: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
