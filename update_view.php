<?php
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

if (isset($_GET["id"])) {
    $id = (int)$_GET["id"];
    $conn->query("UPDATE playlists SET total_view = total_view + 1 WHERE id = $id");
    echo json_encode(["success" => true]);
}
?>
