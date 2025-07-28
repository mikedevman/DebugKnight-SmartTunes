<?php
$host = '127.0.0.1';
$user = 'root';
$password = '';
$dbname = 'music_db';
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['song_id'])) {
    $song_id = (int)$data['song_id'];

    $sql = "UPDATE songs SET view = view + 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $song_id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "song_id missing"]);
}

$conn->close();
?>
