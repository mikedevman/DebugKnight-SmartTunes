<?php
// SỬA ĐỔI: Không cần session_start() hay kiểm tra đăng nhập nữa
header('Content-Type: application/json');

// Lấy album_id từ query string của URL (phương thức GET)
$albumId = $_GET['id'] ?? null; 
if (!$albumId) {
    echo json_encode(['success' => false, 'message' => 'Thiếu ID của album.']);
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "music_db");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Kết nối CSDL thất bại.']);
    exit;
}

// SỬA ĐỔI: Xóa bỏ hoàn toàn đoạn kiểm tra quyền sở hữu album
// Bây giờ bất kỳ ai cũng có thể truy vấn danh sách bài hát.

// Lấy danh sách bài hát trong album
$stmt = $conn->prepare("
    SELECT song_id, name, content, tempo, `key`, genre, year_publish, time_played 
    FROM song 
    WHERE album = ?
    ORDER BY name ASC
");
$stmt->bind_param("i", $albumId);
$stmt->execute();
$result = $stmt->get_result();

$songs = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = [
            "id"         => $row["song_id"],
            "title"      => htmlspecialchars($row["name"]),
            "video"      => $row["content"],
            "tempo"      => $row["tempo"],
            "songkey"    => $row["key"],
            "genre"      => $row["genre"],
            "year"       => $row["year_publish"],
            "timeplayed" => $row["time_played"]
        ];
    }
}

echo json_encode(['success' => true, 'songs' => $songs]);

$stmt->close();
$conn->close();
?>