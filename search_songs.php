<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
    echo json_encode([]);
    exit;
}

$searchTerm = '%' . trim($_GET['q']) . '%';

try {
    $stmt = $conn->prepare("
        SELECT s.song_id, s.name, s.content
        FROM song s
        LEFT JOIN song_author sa ON s.song_id = sa.song_id
        LEFT JOIN author a ON sa.author_id = a.author_id
        WHERE s.name LIKE ? OR a.name LIKE ?
        ORDER BY s.name ASC
    ");
    $stmt->bind_param("ss", $searchTerm, $searchTerm);
    $stmt->execute();

    $result = $stmt->get_result();
    $songs = [];

    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }

    echo json_encode($songs);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
