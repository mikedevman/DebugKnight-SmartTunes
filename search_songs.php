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
        SELECT song_id, name, content
        FROM song
        WHERE name LIKE ? OR artist LIKE ?
        ORDER BY title ASC
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
