<?php
/** Score the microphone alone, before any playback/mix gain is applied. */
function smarttunes_voice_level_score($pcmPath)
{
    $handle = fopen($pcmPath, 'rb');
    if (!$handle) {
        throw new RuntimeException('Unable to measure microphone level.');
    }
    $levels = [];
    try {
        // FFmpeg supplies mono 16 kHz signed 16-bit PCM: 3,200 bytes = 100 ms.
        while (!feof($handle)) {
            $bytes = fread($handle, 3200);
            if ($bytes === false) {
                throw new RuntimeException('Unable to read microphone samples.');
            }
            $length = strlen($bytes);
            if ($length < 1600) {
                continue;
            }
            $samples = unpack('v*', substr($bytes, 0, $length - $length % 2));
            $energy = 0.0;
            foreach ($samples as $sample) {
                $sample = ($sample >= 32768 ? $sample - 65536 : $sample) / 32768;
                $energy += $sample * $sample;
            }
            $rms = sqrt($energy / count($samples));
            $db = $rms > 0 ? 20 * log10($rms) : -120;
            if ($db > -55) {
                $levels[] = $db;
            }
        }
    } finally {
        fclose($handle);
    }
    if (count($levels) < 3) {
        return ['score' => 0, 'dbfs' => null];
    }
    sort($levels, SORT_NUMERIC);
    // Typical stronger singing frames, rather than one loud click or long pauses.
    $db = $levels[(int) floor((count($levels) - 1) * 0.8)];
    // A comfortable, clear microphone level of -28 dBFS already earns 100.
    return ['score' => (int) round(max(0, min(100, ($db + 55) / 27 * 100))), 'dbfs' => round($db, 1)];
}
