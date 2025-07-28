<?php
$conn = new mysqli("127.0.0.1", "root", "", "music_db");
$id = intval($_GET['id'] ?? 0);

if ($id > 0) {
    $conn->query("UPDATE playlist SET total_view = total_view + 1 WHERE id = $id");
}
$conn->close();
?>
