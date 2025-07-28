<?php
session_start();

$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// === CONFIG ===
$uploadDir = __DIR__ . "/uploads/";
$rawUploadPath = $uploadDir . "user_recording.webm";
$convertedWavPath = $uploadDir . "user_recording.wav";
$referenceAudioPath = __DIR__ . "/Recording.wav";

// === Ensure upload directory exists ===
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// === Handle audio upload ===
if (!isset($_FILES["audio"])) {
    echo json_encode(["success" => false, "error" => "No audio file received"]);
    exit;
}

if (!move_uploaded_file($_FILES["audio"]["tmp_name"], $rawUploadPath)) {
    echo json_encode(["success" => false, "error" => "Failed to save uploaded file"]);
    exit;
}

// === Convert to WAV ===
$ffmpegPath = __DIR__ . "/bin/ffmpeg.exe";
$ffmpegCommand = "\"$ffmpegPath\" -y -i \"$rawUploadPath\" -ar 44100 -ac 1 \"$convertedWavPath\" 2>&1";
$ffmpegOutput = shell_exec($ffmpegCommand);

// Check if wav file was created
if (!file_exists($convertedWavPath)) {
    echo json_encode([
        "success" => false,
        "error" => "FFmpeg conversion failed",
        "debug" => $ffmpegOutput
    ]);
    exit;
}

// === Run Python scoring script ===
// Use full path to Python if needed
$exePath = __DIR__ . "/bin/soundalgo.exe";
$command = "\"$exePath\" \"$referenceAudioPath\" \"$convertedWavPath\"";

exec($command, $outputLines, $exitCode);
$output = implode("\n", $outputLines);

// Optional: save debug log
file_put_contents("log.txt", "CMD: $command\n\nOUTPUT:\n$output\n\nEXIT CODE: $exitCode\n");

// === Parse result ===
if (preg_match("/Vocal Score:\s*([\d\.]+)/", $output, $matches)) {
    $score = floatval($matches[1]);
    $user_id = $_SESSION['user_id'] ?? 0; 

    // Giả sử bạn gửi id bài hát qua AJAX hoặc session
    $song_id = $_POST['song_id'] ?? 0;  

    // Đường dẫn file user recording (để lưu)
    $user_recording_url = "uploads/user_recording.wav";

    // Insert vào playhistory
    $stmt = $conn->prepare("INSERT INTO playhistory (user_id, song_played, date, score, user_recording) VALUES (?, ?, NOW(), ?, ?)");
    $stmt->bind_param("iids", $user_id, $song_id, $score, $user_recording_url);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true, "score" => $score]);
    exit;
}
?>
