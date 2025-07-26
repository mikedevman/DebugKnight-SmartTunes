<?php
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

if (isset($_GET["id"])) {
    $id = (int)$_GET["id"];
    $conn->query("DELETE FROM playlists WHERE id = $id");
    echo json_encode(["success" => true]);
}
?>
