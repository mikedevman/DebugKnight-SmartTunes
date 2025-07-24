<?php
header("Content-Type: application/json");

// === CONFIG ===
$uploadDir = __DIR__ . "/uploads/";
$rawUploadPath = $uploadDir . "user_recording.webm";
$convertedWavPath = $uploadDir . "user_recording.wav";
$referenceAudioPath = __DIR__ . "/Recording.mp3"; 
$pythonScript = __DIR__ . "/soundalgo.py";

// === SETUP ===
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// === HANDLE UPLOAD ===
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["audio"])) {
    if (!move_uploaded_file($_FILES["audio"]["tmp_name"], $rawUploadPath)) {
        echo json_encode(["success" => false, "error" => "Failed to save uploaded audio"]);
        exit;
    }

    // === CONVERT TO WAV ===
    $ffmpegCmd = "ffmpeg -y -i " . escapeshellarg($rawUploadPath) . " -ar 22050 -ac 1 " . escapeshellarg($convertedWavPath);
    shell_exec($ffmpegCmd);

    if (!file_exists($convertedWavPath)) {
        echo json_encode(["success" => false, "error" => "FFmpeg conversion failed"]);
        exit;
    }

    // === RUN PYTHON SCORING ===
    $command = "python3 " . escapeshellarg($pythonScript) . " " . escapeshellarg($referenceAudioPath) . " " . escapeshellarg($convertedWavPath);
    $output = shell_exec($command);

    // === PARSE SCORE FROM PYTHON OUTPUT ===
    if (preg_match('/Vocal Score:\s*([\d.]+)/', $output, $matches)) {
        echo json_encode([
            "success" => true,
            "score" => floatval($matches[1])
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "Score not found in output",
            "debug" => $output
        ]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
}
