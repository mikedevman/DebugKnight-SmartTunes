<?php
    $input = json_decode(file_get_contents("php://input"), true);
    $song_id = intval($input['song_id'] ?? 0);

    if ($song_id) {
    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbname = "music_db";

    $conn = new mysqli($host, $user, $password, $dbname);
    $conn->query("UPDATE song SET times_played = times_played + 1 WHERE song_id = $song_id");
}
?>
