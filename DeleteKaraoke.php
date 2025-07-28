<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$songId = $_POST["id"] ?? null;

if ($songId !== null) {
    // Begin transaction
    $conn->begin_transaction();

    try {
        
        $stmt = $conn->prepare("DELETE FROM playhistory WHERE song_played = ?");
        $stmt->bind_param("i", $songId);
        $stmt->execute();
        $stmt->close();

        $stmt2 = $conn->prepare("DELETE FROM song WHERE song_id = ?");
        $stmt2->bind_param("i", $songId);
        $stmt2->execute();
        $stmt2->close();

        $conn->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid ID"]);
}

$conn->close();
