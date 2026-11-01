# Karaoke scoring inspection

Inspection date: 2026-11-02.

**Historical review:** the Python scorer has since been removed at the user's request. The current feature exports mixed audio and scores the dry microphone by its measured level from 0 to 100. See [Recording export and voice-level scores](RECORDING_EXPORT.md).

## Current result

**The deployed scoring flow cannot currently return a score.** Audio conversion works, but the configured scoring executable is missing. Running the available Python source directly also fails because the selected Python environment does not have `librosa` installed.

This inspection did not change the scoring algorithm or handler, install dependencies, submit scores to the live database, or overwrite existing recordings.

## Intended flow

1. `public/assets/js/karaoke-recorder.js` records microphone input with `MediaRecorder` and sends WebM audio plus the song ID to `upload_and_score.php`.
2. The route maps to `app/actions/recordings/upload_and_score.php`.
3. PHP saves `public/uploads/user_recording.webm` and calls `tools/bin/ffmpeg.exe` to produce a mono, 44.1 kHz WAV file.
4. PHP tries to execute `tools/bin/soundalgo.exe`, passing the fixed `resources/reference-audio/Recording.wav` and the converted recording.
5. It looks for `Vocal Score: NUMBER` in standard output. Only if that matches does it insert a play-history row and send a JSON success response.

The browser retains the song ID selected at the start of recording, including on album and playlist studio pages.

## Available Python algorithm

The source is `tools/python/soundalgo.py`. The PHP handler does **not** currently call it.

The algorithm loads both audio files with librosa, estimates spectral pitches using `piptrack`, takes the pitch with the strongest magnitude in each frame, and drops frames without a positive pitch. It then compares the resulting pitch sequences with dynamic time warping (DTW).

The output score is:

```text
score = clamp(100 * exp(-DTW_cost / 5000), 0, 100)
```

Lower pitch-sequence distance produces a higher score. This is a pitch-similarity calculation; it does not assess lyrics or provide a validated overall singing grade.

## Tests and findings

| Check | Result |
| --- | --- |
| Original structured files are present | No missing original files found |
| FFmpeg synthetic WebM creation and WAV conversion | Passed |
| Fixed reference audio | Present: 15.116 seconds, stereo PCM, 44.1 kHz |
| `tools/bin/soundalgo.exe` | Missing |
| Run Python source with generated test audio | Exit 1: `ModuleNotFoundError: No module named 'librosa'` |
| Python modules checked | NumPy and numba present; librosa and soundfile absent |
| Isolated real multipart request through a copy of the PHP handler | Converted WAV produced; scoring process exit 1 |
| Response after the missing scorer fails | HTTP 200 with an empty body, not JSON |
| Production recordings/log | Verified unchanged by the isolated test |
| Live database hostname | Current configured Aiven hostname fails DNS lookup here; unrelated `aiven.io` resolves |

The isolated PHP test used generated one-second sine-wave audio, temporary upload/session/log directories, and a database stub that rejects writes. It did not exercise a live score insertion.

## Additional correctness limitations

- **The selected song does not select the reference audio.** Every song is compared with the same `Recording.wav`; `song_id` is used only when saving the history row.
- **Scoring failures have no JSON failure branch.** The frontend calls `response.json()`, so an empty response becomes the generic upload-failed message.
- **All recordings share the same filenames.** Subsequent uploads overwrite earlier audio, and history rows point to the same recording URL. Concurrent users can also interfere with those shared files.
- **The DTW cost is not normalized by the alignment length.** Recording duration and the number of detected pitch frames can affect the result. The scale factor of 5000 has no calibration demonstrated in this repository.

## Work needed before scoring can be considered functional

Restore/build the expected executable or explicitly wire the Python source into PHP with its dependencies; return JSON for every failure; establish the correct reference for each song; and save recordings under distinct filenames. Then test real vocal samples and database persistence. These are scoring behavior changes and are separate from the completed folder cleanup.
