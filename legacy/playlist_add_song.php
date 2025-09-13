<?php
//done
// Start the session to access session variables (if needed later)
session_start();

// Set the response type to JSON
header('Content-Type: application/json');

// Ensure the request is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

// Read and decode JSON input from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Extract playlist_id and song_id from the decoded data
$playlistId = $data['playlist_id'] ?? null;
$songId = $data['song_id'] ?? null;

// Validate that both IDs are present
if (!$playlistId || !$songId) {
    echo json_encode(['success' => false, 'message' => 'Missing data']);
    exit;
}

// Connect to the MySQL database
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

// Handle connection error
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

// Start transaction
$conn->begin_transaction();

try {
    // Check if the song is already in the playlist
    $check = $conn->prepare("SELECT 1 FROM playlist_song WHERE playlist_id = ? AND song_id = ?");
    $check->bind_param("ii", $playlistId, $songId);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Song already in playlist']);
        $check->close();
        $conn->rollback();
        $conn->close();
        exit;
    }
    $check->close();

    // Insert the song into the playlist_song linking table
    $stmt = $conn->prepare("INSERT INTO playlist_song (playlist_id, song_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $playlistId, $songId);

    if ($stmt->execute()) {
        $stmt->close();

        // Update playlist totals
        $stmt = $conn->prepare("
            UPDATE playlist p
            JOIN song s ON s.song_id = ?
            SET p.total_view = p.total_view + s.view,
                p.total_time_played = p.total_time_played + s.time_played
            WHERE p.id = ?
        ");
        $stmt->bind_param("ii", $songId, $playlistId);

        if ($stmt->execute()) {
            $conn->commit(); // Commit if everything succeeds
            echo json_encode(['success' => true, 'message' => 'Song added and totals updated']);
        } else {
            throw new Exception('Failed to update totals: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        throw new Exception('Insert failed: ' . $stmt->error);
    }

} catch (Exception $e) {
    $conn->rollback(); // Rollback if any query fails
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
