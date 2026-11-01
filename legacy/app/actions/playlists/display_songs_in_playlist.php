<?php
header('Content-Type: application/json');
header('Cache-Control: no-store');
$playlistId = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 1]]);
if (!$playlistId) {
    echo json_encode(['success' => false, 'message' => 'Missing or invalid playlist ID']);
    exit;
}
require_once LEGACY_ROOT . '/app/config/database.php';
require_once LEGACY_ROOT . '/app/support/song_pagination.php';
$conn = smarttunes_db_connect();
echo json_encode(smarttunes_song_page($conn, null, $playlistId), JSON_INVALID_UTF8_SUBSTITUTE);
$conn->close();
