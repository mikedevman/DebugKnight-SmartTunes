<?php
header('Content-Type: application/json');
header('Cache-Control: no-store');
require_once LEGACY_ROOT . '/app/config/database.php';
require_once LEGACY_ROOT . '/app/support/song_pagination.php';
$conn = smarttunes_db_connect();
echo json_encode(smarttunes_song_page($conn), JSON_INVALID_UTF8_SUBSTITUTE);
$conn->close();
