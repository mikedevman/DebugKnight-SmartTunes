
<?php
//done
// Database connection settings

// Connect to the database
require_once LEGACY_ROOT . '/app/config/database.php';
$conn = smarttunes_db_connect();

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Album autocomplete requests a small suggestion set; legacy callers keep their shape.
if (isset($_GET['limit'])) {
    $limit = filter_var($_GET['limit'], FILTER_VALIDATE_INT,
        ['options' => ['default' => 20, 'min_range' => 1, 'max_range' => 20]]) ?: 20;
    $query = is_string($_GET['q'] ?? null) ? trim($_GET['q']) : '';
    $search = '%' . str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $query) . '%';
    $stmt = $conn->prepare("SELECT song_id, name FROM song WHERE name LIKE ? ESCAPE '!' ORDER BY name ASC, song_id DESC LIMIT ?");
    $stmt->bind_param('si', $search, $limit);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query('SELECT song_id, name FROM song');
}

// Initialize array to store songs
$songs = [];

// Fetch data if available
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}

// Close the connection
if (isset($stmt)) {
    $stmt->close();
}
$conn->close();

// Return songs as JSON
header("Content-Type: application/json");
header("Cache-Control: no-store");
echo json_encode($songs);
?>
