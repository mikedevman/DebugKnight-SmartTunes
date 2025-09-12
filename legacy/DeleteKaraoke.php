<?php
//done
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Check if database connection is successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the song ID from the POST request
$songId = $_POST["id"] ?? null;

if ($songId !== null) {
    // Start transaction to ensure atomic operation
    $conn->begin_transaction();

    try {
        // Delete related play history records
        $stmt = $conn->prepare("DELETE FROM playhistory WHERE song_played = ?");
        $stmt->bind_param("i", $songId);
        $stmt->execute();
        $stmt->close();

        // Delete the song from the song table
        $stmt2 = $conn->prepare("DELETE FROM song WHERE song_id = ?");
        $stmt2->bind_param("i", $songId);
        $stmt2->execute();
        $stmt2->close();

        // Commit transaction if all went well
        $conn->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        // Roll back all changes on error
        $conn->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    // No valid ID was provided
    echo json_encode(["status" => "error", "message" => "Invalid ID"]);
}

// Close the database connection
$conn->close();
