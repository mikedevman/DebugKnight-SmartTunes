<?php
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
    echo json_encode(["success" => true, "score" => $score]);
    exit;
} else {
    echo json_encode([
        "success" => false,
        "error" => "Score not found in output",
        "debug" => $output
    ]);
    exit;
}
?>
