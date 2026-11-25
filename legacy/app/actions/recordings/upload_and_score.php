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
                throw new RuntimeException('Unable to read the recording for upload.');
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
        if (is_resource($handle)) {
            fclose($handle);
        }
        curl_close($request);
    }
}

/** Identify the browser-native recording format; no transcoding or conversion is performed. */
function recording_audio_format($input)
{
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($input);
    $formats = [
        'audio/webm' => ['webm', 'audio/webm'],
        'video/webm' => ['webm', 'audio/webm'],
        'audio/mp4' => ['m4a', 'audio/mp4'],
        'video/mp4' => ['m4a', 'audio/mp4'],
        'audio/x-m4a' => ['m4a', 'audio/mp4'],
        'audio/ogg' => ['ogg', 'audio/ogg'],
        'application/ogg' => ['ogg', 'audio/ogg'],
    ];
    if (!isset($formats[$mime])) {
        throw new RuntimeException('Unsupported recording format. Please record again using desktop Chrome or Edge.');
    }
    return $formats[$mime];
}

function recording_store_mix($config, $input, $userId, $token, $extension, $contentType)
{
    $bucketPath = rawurlencode($config['bucket']);
    $bucket = json_decode(recording_storage_request('GET', $config['url'] . '/storage/v1/bucket/' . $bucketPath, $config['headers']), true);
    if (!is_array($bucket) || ($bucket['public'] ?? false) !== true) {
        throw new RuntimeException('Make the Supabase recordings bucket Public so leaderboard and history can play its audio.');
    }

    $objectPath = $userId . '/voice_' . $token . '.' . $extension;
    $encodedPath = implode('/', array_map('rawurlencode', explode('/', $objectPath)));
    $headers = array_merge($config['headers'], [
        'Content-Type: ' . $contentType,
        'Cache-Control: max-age=31536000',
        'x-upsert: false',
    ]);

    // Upload the original MediaRecorder file directly. No WAV conversion or external audio tool.
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
if (!$audio || ($audio['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    $tooLarge = $audio && in_array($audio['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true);
    recording_reply($tooLarge ? 413 : 400, ['success' => false, 'error' => $tooLarge ? 'Recording is too large. Keep it under 32 MB.' : 'No complete audio recording was received.']);
}
if (!$songId || ($_POST['audio_mix'] ?? '') !== 'voice_and_backing') {
    recording_reply(400, ['success' => false, 'error' => 'Select a song and record both your microphone and the backing track.']);
}
if (($audio['size'] ?? 0) <= 0 || $audio['size'] > 32 * 1024 * 1024) {
    recording_reply(413, ['success' => false, 'error' => 'Recording must be under 32 MB.']);
}

$input = null;
$audioUrl = null;
$extension = null;
$historySaved = false;
$conversionError = null;

try {
    require_once LEGACY_ROOT . '/app/config/database.php';
    $storage = recording_storage_config();
    set_time_limit(300);

    $tempDir = LEGACY_ROOT . '/storage/recordings/';
    $uploadDir = LEGACY_ROOT . '/public/uploads/';
    foreach ([$tempDir, $uploadDir] as $directory) {
        if (!is_dir($directory) && !mkdir($directory, 0755, true) && !is_dir($directory)) {
            throw new RuntimeException('Unable to prepare recording storage.');
        }
    }

    $token = bin2hex(random_bytes(16));
    [$extension, $contentType] = recording_audio_format($audio['tmp_name']);
    $filename = 'voice_' . $token . '.' . $extension;
    $input = $tempDir . $filename;

    if (!move_uploaded_file($audio['tmp_name'], $input)) {
        throw new RuntimeException('Unable to save the uploaded recording.');
    }

    if ($storage['mode'] === 'supabase') {
        $audioUrl = recording_store_mix($storage, $input, $userId, $token, $extension, $contentType);
    } else {
        $localPath = $uploadDir . $filename;
        if (!rename($input, $localPath)) {
            throw new RuntimeException('Unable to save the recording for playback.');
        }
        $input = null;
        $audioUrl = 'uploads/' . $filename;
    }

    // This project now uses a simple random entertainment score, not audio analysis.
    $score = random_int(60, 100);
} catch (Throwable $error) {
    $conversionError = $error->getMessage();
} finally {
    if ($input && is_file($input)) {
        unlink($input);
    }
}

if ($conversionError !== null) {
    recording_reply(422, ['success' => false, 'error' => $conversionError]);
}

$conn = null;
try {
    $conn = @smarttunes_db_connect();
    $stmt = $conn->prepare('INSERT INTO playhistory (user_id, song_played, date, score, user_recording) VALUES (?, ?, NOW(), ?, ?)');
    $stmt->bind_param('iiis', $userId, $songId, $score, $audioUrl);
    $historySaved = $stmt->execute();
    if (!$historySaved) {
        throw new RuntimeException('Recording history insert failed.');
    }
    $stmt->close();
} catch (Throwable $error) {
    error_log('Recording history unavailable: ' . $error->getMessage());
} finally {
    if ($conn instanceof mysqli) {
        $conn->close();
    }
}

recording_reply(200, [
    'success' => true,
    'score' => $score,
    'score_type' => 'random',
    'audio_mix' => 'voice_and_backing',
    'audio_url' => $audioUrl,
    'storage' => $storage['mode'],
    'format' => $extension,
    'history_saved' => (bool) $historySaved,
    'message' => $historySaved ? 'Upload completed' : 'Audio saved; history pending',
    'notice' => $historySaved ? '' : 'Audio saved, but it is not listed in leaderboard or history yet. Retry to save its history.',
]);
