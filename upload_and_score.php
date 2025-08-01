<?php
// Start session to access user data
session_start();

// Database connection parameters
$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

// Create database connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check for connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// === CONFIG ===
// Define upload paths
$uploadDir = __DIR__ . "/uploads/";
$rawUploadPath = $uploadDir . "user_recording.webm";
$convertedWavPath = $uploadDir . "user_recording.wav";
$referenceAudioPath = __DIR__ . "/reference-audio/Recording.wav";

// === Ensure upload directory exists ===
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// === Handle audio upload ===
// Check if audio file was sent via POST
if (!isset($_FILES["audio"])) {
    echo json_encode(["success" => false, "error" => "No audio file received"]);
    exit;
}

// Save uploaded audio file to server
if (!move_uploaded_file($_FILES["audio"]["tmp_name"], $rawUploadPath)) {
    echo json_encode(["success" => false, "error" => "Failed to save uploaded file"]);
    exit;
}

// === Convert to WAV ===
// Use FFmpeg to convert WebM to WAV format
$ffmpegPath = __DIR__ . "/bin/ffmpeg.exe";
$ffmpegCommand = "\"$ffmpegPath\" -y -i \"$rawUploadPath\" -ar 44100 -ac 1 \"$convertedWavPath\" 2>&1";
$ffmpegOutput = shell_exec($ffmpegCommand);

// Check if conversion was successful
if (!file_exists($convertedWavPath)) {
    echo json_encode([
        "success" => false,
        "error" => "FFmpeg conversion failed",
        "debug" => $ffmpegOutput
    ]);
    exit;
}

// === Run Python scoring script ===
// Define path to the scoring executable and run it
$exePath = __DIR__ . "/bin/soundalgo.exe";
$command = "\"$exePath\" \"$referenceAudioPath\" \"$convertedWavPath\"";

// Execute the command and capture output
exec($command, $outputLines, $exitCode);
$output = implode("\n", $outputLines);

// Optional: Save output and command for debugging
file_put_contents("log.txt", "CMD: $command\n\nOUTPUT:\n$output\n\nEXIT CODE: $exitCode\n");

// === Parse result ===
// Check if score is present in output and extract it
if (preg_match("/Vocal Score:\s*([\d\.]+)/", $output, $matches)) {
    $score = floatval($matches[1]);
    $user_id = $_SESSION['user_id'] ?? 0; 

    // Assume song ID is sent via AJAX or session
    $song_id = $_POST['song_id'] ?? 0;  

    // Path to user's recording (to store in database)
    $user_recording_url = "uploads/user_recording.wav";

    // Insert result into playhistory table
    $stmt = $conn->prepare("INSERT INTO playhistory (user_id, song_played, date, score, user_recording) VALUES (?, ?, NOW(), ?, ?)");
    $stmt->bind_param("iids", $user_id, $song_id, $score, $user_recording_url);
    $stmt->execute();
    $stmt->close();

    // Return success response with score
    echo json_encode(["success" => true, "score" => $score]);
    exit;
}
?>
