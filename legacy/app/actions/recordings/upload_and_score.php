<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function recording_reply($code, $data)
{
    http_response_code($code);
    echo json_encode($data, JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

/** Keep Supabase credentials on the PHP server; existing Aiven data stays in MySQL. */
function recording_storage_config()
{
    $mode = strtolower(trim(smarttunes_env('RECORDING_STORAGE', 'local')));
    if ($mode === 'local') {
        return ['mode' => 'local'];
    }
    if ($mode !== 'supabase') {
        throw new RuntimeException('Set RECORDING_STORAGE to supabase or local in app/config/.env.');
    }
    $url = rtrim(trim(smarttunes_env('SUPABASE_URL', '')), '/');
    $key = trim(smarttunes_env('SUPABASE_SECRET_KEY', ''));
    $bucket = trim(smarttunes_env('SUPABASE_RECORDINGS_BUCKET', 'karaoke-recordings'));
    if (!preg_match('~^https://[a-z0-9-]+\.supabase\.co$~iD', $url) || $key === '') {
        throw new RuntimeException('Set SUPABASE_URL and SUPABASE_SECRET_KEY in app/config/.env before recording.');
    }
    if (!preg_match('/^[a-z0-9][a-z0-9_-]{0,62}$/D', $bucket)) {
        throw new RuntimeException('Use a Supabase bucket name containing lowercase letters, numbers, underscores or hyphens.');
    }
    // New secret keys are not JWTs; only legacy service_role keys use Bearer auth.
    if (str_starts_with($key, 'eyJ')) {
        if (!preg_match('/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/D', $key)) {
            throw new RuntimeException('Invalid server-side Supabase key format.');
        }
        $parts = explode('.', $key);
        $payload = isset($parts[1]) ? json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true) : null;
        if (($payload['role'] ?? '') !== 'service_role') {
            throw new RuntimeException('Use a server-side Supabase secret key, not a publishable or anon key.');
        }
    } elseif (!preg_match('/^sb_secret_[A-Za-z0-9_-]+$/D', $key)) {
        throw new RuntimeException('Use a server-side Supabase secret key, not a publishable or anon key.');
    }
    if (!is_callable('curl_init')) {
        throw new RuntimeException('Enable the PHP cURL extension to upload recordings to Supabase.');
    }
    $headers = ['apikey: ' . $key];
    if (str_starts_with($key, 'eyJ')) {
        $headers[] = 'Authorization: Bearer ' . $key;
    }
    return ['mode' => 'supabase', 'url' => $url, 'bucket' => $bucket, 'headers' => $headers];
}

function recording_storage_request($method, $url, $headers, $file = null)
{
    $handle = null;
    $request = curl_init($url);
    try {
        curl_setopt_array($request, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 15,
            CURLOPT_TIMEOUT => 180,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_HTTPHEADER => $headers,
        ]);
        $caBundle = trim((string) ini_get('curl.cainfo'));
        if ($caBundle !== '') {
            curl_setopt($request, CURLOPT_CAINFO, $caBundle);
        }
        if ($file !== null) {
            $handle = fopen($file, 'rb');
            if (!$handle) {
                throw new RuntimeException('Unable to read the mixed recording for upload.');
            }
            curl_setopt_array($request, [
                CURLOPT_UPLOAD => true,
                CURLOPT_INFILE => $handle,
                CURLOPT_INFILESIZE => filesize($file),
            ]);
        }
        curl_setopt($request, CURLOPT_CUSTOMREQUEST, $method);
        $body = curl_exec($request);
        if ($body === false) {
            if (in_array(curl_errno($request), [CURLE_SSL_CACERT, CURLE_SSL_CACERT_BADFILE], true)) {
                throw new RuntimeException('Supabase TLS verification failed. Configure a trusted curl.cainfo CA bundle in PHP.');
            }
            throw new RuntimeException('Unable to reach Supabase Storage. Check your connection and retry.');
        }
        $status = (int) curl_getinfo($request, CURLINFO_HTTP_CODE);
        if ($status < 200 || $status >= 300) {
            if ($status === 401 || $status === 403) {
                throw new RuntimeException('Supabase rejected the server key. Check SUPABASE_SECRET_KEY and the project URL.');
            }
            if ($status === 413) {
                throw new RuntimeException('Supabase rejected the file size. Set the recording bucket limit to 50 MB.');
            }
            throw new RuntimeException('Supabase Storage returned HTTP ' . $status . '. Check the bucket name, MIME types and file size limit, then retry.');
        }
        return $body;
    } finally {
        if (is_resource($handle)) fclose($handle);
        curl_close($request);
    }
}

function recording_store_mix($config, $input, $userId, $token)
{
    $bucketPath = rawurlencode($config['bucket']);
    $bucket = json_decode(recording_storage_request('GET', $config['url'] . '/storage/v1/bucket/' . $bucketPath, $config['headers']), true);
    if (!is_array($bucket) || ($bucket['public'] ?? false) !== true) {
        throw new RuntimeException('Make the Supabase recordings bucket Public so leaderboard and history can play its audio.');
    }
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($input);
    $formats = [
        'audio/webm' => ['webm', 'audio/webm'], 'video/webm' => ['webm', 'audio/webm'],
        'audio/mp4' => ['m4a', 'audio/mp4'], 'video/mp4' => ['m4a', 'audio/mp4'],
        'audio/x-m4a' => ['m4a', 'audio/mp4'],
        'audio/ogg' => ['ogg', 'audio/ogg'], 'application/ogg' => ['ogg', 'audio/ogg'],
    ];
    if (!isset($formats[$mime])) {
        throw new RuntimeException('Unsupported mixed recording format. Record again using desktop Chrome or Edge.');
    }
    [$extension, $contentType] = $formats[$mime];
    $objectPath = $userId . '/voice_' . $token . '.' . $extension;
    $encodedPath = implode('/', array_map('rawurlencode', explode('/', $objectPath)));
    $headers = array_merge($config['headers'], [
        'Content-Type: ' . $contentType, 'Cache-Control: max-age=31536000', 'x-upsert: false',
    ]);
    // Stream the original high-bitrate mix, avoiding another lossy encoding and oversized WAV objects.
    recording_storage_request('POST', $config['url'] . '/storage/v1/object/' . $bucketPath . '/' . $encodedPath, $headers, $input);
    return $config['url'] . '/storage/v1/object/public/' . $bucketPath . '/' . $encodedPath;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    recording_reply(405, ['success' => false, 'error' => 'Use POST to upload a recording.']);
}
$userId = filter_var($_SESSION['user_id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
if (!$userId) {
    recording_reply(401, ['success' => false, 'error' => 'Please log in before uploading a recording.']);
}
$songId = filter_var($_POST['song_id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
$audio = $_FILES['audio'] ?? null;
$voice = $_FILES['voice_audio'] ?? null;
if (!$audio || ($audio['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    $tooLarge = $audio && in_array($audio['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true);
    recording_reply($tooLarge ? 413 : 400, ['success' => false, 'error' => $tooLarge ? 'Recording is too large. Keep it under 32 MB.' : 'No complete audio recording was received.']);
}
if (!$songId || ($_POST['audio_mix'] ?? '') !== 'voice_and_backing') {
    recording_reply(400, ['success' => false, 'error' => 'Select a song and record both your microphone and the backing track.']);
}
if (!$voice || ($voice['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || $voice['size'] <= 0) {
    recording_reply(400, ['success' => false, 'error' => 'Microphone audio is required for a voice-level score. Reload the studio and record again.']);
}
if ($audio['size'] <= 0 || $audio['size'] + $voice['size'] > 32 * 1024 * 1024) {
    recording_reply(413, ['success' => false, 'error' => 'Combined recording uploads must be under 32 MB.']);
}

$input = null;
$voiceInput = null;
$voicePcm = null;
$measurement = null;
$output = null;
$conversionError = null;
$audioUrl = null;
try {
    require_once LEGACY_ROOT . '/app/config/database.php';
    $storage = recording_storage_config();
    set_time_limit(300);
    $ffmpeg = trim(smarttunes_env('FFMPEG_PATH', '')) ?: LEGACY_ROOT . '/tools/bin/ffmpeg.exe';
    if (!is_file($ffmpeg) || !is_callable('exec')) {
        throw new RuntimeException('Audio export is unavailable. Set FFMPEG_PATH in app/config/.env to your installed ffmpeg executable.');
    }
    $uploadDir = LEGACY_ROOT . '/public/uploads/';
    $tempDir = LEGACY_ROOT . '/storage/recordings/';
    foreach ([$uploadDir, $tempDir] as $directory) {
        if (!is_dir($directory) && !mkdir($directory, 0755, true) && !is_dir($directory)) {
            throw new RuntimeException('Unable to prepare recording storage.');
        }
    }
    $token = bin2hex(random_bytes(16));
    $input = $tempDir . $token . '.input';
    $voiceInput = $tempDir . $token . '.voice.input';
    $voicePcm = $tempDir . $token . '.voice.pcm';
    $filename = 'voice_' . $token . '.wav';
    $output = $uploadDir . $filename;
    if (!move_uploaded_file($audio['tmp_name'], $input)) {
        throw new RuntimeException('Unable to save the uploaded recording.');
    }
    if (!move_uploaded_file($voice['tmp_name'], $voiceInput)) {
        throw new RuntimeException('Unable to save the microphone recording.');
    }
    // Preserve the high-bitrate browser capture without another lossy encoding stage.
    $command = escapeshellarg($ffmpeg) . ' -nostdin -hide_banner -loglevel error -y -i ' . escapeshellarg($input)
        . ' -t 600 -vn -af alimiter=limit=0.94:level=false -ar 48000 -c:a pcm_s16le ' . escapeshellarg($output) . ' 2>&1';
    exec($command, $conversionOutput, $exitCode);
    if ($exitCode !== 0 || !is_file($output) || filesize($output) === 0) {
        error_log('Recording conversion failed: ' . implode("\n", $conversionOutput));
        throw new RuntimeException('Unable to convert this audio recording. Please try again.');
    }
    $voiceCommand = escapeshellarg($ffmpeg) . ' -nostdin -hide_banner -loglevel error -y -i ' . escapeshellarg($voiceInput)
        . ' -t 600 -vn -af highpass=f=70 -ac 1 -ar 16000 -f s16le ' . escapeshellarg($voicePcm) . ' 2>&1';
    exec($voiceCommand, $voiceOutput, $voiceExit);
    if ($voiceExit !== 0 || !is_file($voicePcm)) {
        throw new RuntimeException('Unable to measure microphone audio. Please record again.');
    }
    require_once LEGACY_ROOT . '/app/support/voice_level.php';
    $measurement = smarttunes_voice_level_score($voicePcm);
    $audioUrl = $storage['mode'] === 'supabase'
        ? recording_store_mix($storage, $input, $userId, $token)
        : 'uploads/' . $filename;

} catch (Throwable $error) {
    if ($output && is_file($output)) {
        unlink($output);
    }
    $conversionError = $error->getMessage();
} finally {
    foreach ([$input, $voiceInput, $voicePcm] as $temporary) {
        if ($temporary && is_file($temporary)) {
            unlink($temporary);
        }
    }
}

if ($conversionError !== null) {
    recording_reply(422, ['success' => false, 'error' => $conversionError]);
}

// Measured from the dry microphone recording, never from the backing mix or sliders.
$score = $measurement['score'];
$downloadUrl = 'uploads/' . $filename;
$historySaved = false;
$conn = null;
try {
    require_once LEGACY_ROOT . '/app/config/database.php';
    $conn = @smarttunes_db_connect();
    $stmt = $conn->prepare('INSERT INTO playhistory (user_id, song_played, date, score, user_recording) VALUES (?, ?, NOW(), ?, ?)');
    $stmt->bind_param('iiis', $userId, $songId, $score, $audioUrl);
    $historySaved = $stmt->execute();
    if (!$historySaved) {
        throw new RuntimeException('Recording history insert failed.');
    }
    $stmt->close();
} catch (Throwable $error) {
    // A database outage must not lose the already saved performance or prevent export.
    error_log('Recording history unavailable: ' . $error->getMessage());
} finally {
    if ($conn instanceof mysqli) {
        $conn->close();
    }
}

recording_reply(200, [
    'success' => true,
    'score' => $score,
    'score_type' => 'voice_level',
    'voice_level_dbfs' => $measurement['dbfs'],
    'audio_mix' => 'voice_and_backing',
    'audio_url' => $audioUrl,
    'download_url' => $downloadUrl,
    'storage' => $storage['mode'],
    'format' => 'wav',
    'history_saved' => (bool) $historySaved,
    'message' => $historySaved ? 'Upload completed' : 'Audio saved; history pending',
    'notice' => $historySaved ? '' : 'Audio saved, but it is not listed in leaderboard or history yet. Retry to save your history.',
]);
