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
        SELECT s.name, s.genre, s.year_publish, a.album_name
        FROM song s
        JOIN album a ON s.album = a.id
        WHERE s.name LIKE ?
        GROUP BY s.song_id, a.id
        ORDER BY s.name ASC
    ");
    $stmt->bind_param("s", $searchTerm);
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
