<?php
session_start();
    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbname = "music_db";

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

function createPlaylistWithSongs($userId, $playlistName, $description, $songIds) {
    global $pdo;

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO playlist (user_created, playlist_name, description) VALUES (:userId, :name, :desc)");
        $stmt->execute([
            ':userId' => $userId,
            ':name' => $playlistName,
            ':desc' => $description
        ]);
        $playlistId = $pdo->lastInsertId();

        $linkStmt = $pdo->prepare("INSERT INTO playlist_song (playlist_id, song_id) VALUES (:playlistId, :songId)");
        foreach ($songIds as $songId) {
            $linkStmt->execute([
                ':playlistId' => $playlistId,
                ':songId' => trim($songId)
            ]);
        }

        $pdo->commit();
        return $playlistId;
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    $playlistName = $_POST['playlist_name'];
    $description = $_POST['description'] ?? '';
    $songIds = explode(',', $_POST['song_ids']);

    try {
        $playlistId = createPlaylistWithSongs($userId, $playlistName, $description, $songIds);
        echo "Playlist '$playlistName' created successfully!";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>

<form method="post" action="create_playlist.php">
    <input type="text" name="playlist_name" placeholder="Playlist Name" required>
    <textarea name="description" placeholder="Description (optional)"></textarea>
    <input type="text" name="song_ids" placeholder="Comma-separated Song IDs (e.g., 1,2,3)" required>
    <button type="submit">Create Playlist</button>
</form>

?>
