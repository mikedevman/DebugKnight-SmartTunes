<?php
session_start();

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_SESSION['user_id'])) {
    die("You must be logged in to upload songs.");
}
$user_id = $_SESSION['user_id'];

$title      = $_POST['title'] ?? '';
$content    = $_POST['content'] ?? '';
$view       = $_POST['view'] ?? '';
$genre      = $_POST['genre'] ?? '';
$year       = $_POST['year'] ?? '';
$albumID    = $_POST['album'] ?? '';
$tempo      = $_POST['tempo'] ?? '';
$songkey    = $_POST['songkey'] ?? '';
$timeplayed = $_POST['timeplayed'] ?? '';

if (!preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/', $content)) {
    die("Invalid YouTube link.");
}

function convertToSeconds($timeStr) {
    list($min, $sec) = explode(':', $timeStr);
    return ((int)$min * 60) + (int)$sec;
}


$conn->begin_transaction();

try {
    $stmt = $conn->prepare("INSERT INTO song (name, content, view, genre, year_publish, album, tempo, `key`, time_played)
                            VALUES (?, ?, 0, ?, ?, ?, ?, ?, 0)");
    $stmt->bind_param("sssiiis", $title, $content, $genre, $year, $albumID, $tempo, $songkey);
    if (!$stmt->execute()) {
        throw new Exception("Error inserting song: " . $stmt->error);
    }
    $song_id = $stmt->insert_id;
    $stmt->close();

    $stmt2 = $conn->prepare("INSERT INTO song_author (song_id, author_id) VALUES (?, ?)");
    $stmt2->bind_param("ii", $song_id, $user_id);
    if (!$stmt2->execute()) {
        throw new Exception("Error linking song to author: " . $stmt2->error);
    }
    $stmt2->close();

    $conn->commit();
    header("Location: karaoke.php?upload=success");
    exit();
} catch (Exception $e) {
    $conn->rollback();
    echo "Upload failed: " . $e->getMessage();
}

$conn->close();
?>
