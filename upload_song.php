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
$authorName  = $_POST['author'] ?? '';

if (!preg_match('/^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.+$/', $content)) {
    die("Link YouTube không hợp lệ.");
}

function convertToSeconds($timeStr) {
    list($min, $sec) = explode(':', $timeStr);
    return ((int)$min * 60) + (int)$sec;
}
$durationSec = convertToSeconds($timeplayed);

// START TRANSACTION
$conn->begin_transaction();

try {
    $stmt = $conn->prepare("INSERT INTO song (name, content, genre, year_publish, album, tempo, `key`, time_played)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssisiis", $title, $content, $genre, $year, $albumID, $tempo, $songkey, $durationSec);
    if (!$stmt->execute()) {
        throw new Exception("Lỗi khi thêm bài hát: " . $stmt->error);
    }
    $song_id = $stmt->insert_id;
    $stmt->close();

    $stmt2 = $conn->prepare("INSERT INTO author (name) VALUES (?)");
    $stmt2->bind_param("s", $authorName);
    if (!$stmt2->execute()) {
        throw new Exception("Lỗi khi thêm tác giả: " . $stmt2->error);
    }
    $author_id = $stmt2->insert_id;
    $stmt2->close();

    $stmt3 = $conn->prepare("INSERT INTO song_author (song_id, author_id) VALUES (?, ?)");
    $stmt3->bind_param("ii", $song_id, $author_id);
    if (!$stmt3->execute()) {
        throw new Exception("Lỗi khi gán tác giả cho bài hát: " . $stmt3->error);
    }
    $stmt3->close();
    
    $conn->commit();
    header("Location: karaoke.html?upload=success");
    exit();
} catch (Exception $e) {
    $conn->rollback();
    echo $e->getMessage();
}

$conn->close();
?>
