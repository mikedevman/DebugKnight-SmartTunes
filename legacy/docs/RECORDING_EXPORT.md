# Browser-native recording, downloads and random scores

## User flow

The shared recording panel appears on karaoke, album and playlist pages. Select and play a track, share this studio tab with audio, allow microphone access, and use headphones. Press **Stop & download** to save the mixed performance in the browser's original audio format. The result retains the audio preview and **Download again** control.

After the original recording has been uploaded successfully, the application waits three seconds and displays a randomly generated integer score from 60 to 100. This score is for entertainment only. It does not analyse singing, pitch, lyrics, microphone volume or musical accuracy.

## Audio capture and download

- The browser captures the microphone and shared tab audio using the built-in Web Audio API and MediaRecorder APIs.
- Microphone and backing-track gain sliders, the live microphone level meter, high-pass filter, compressor and output headroom remain in place. The meter is only a live input aid; it does not affect the score.
- The browser records one mixed voice-and-backing stream. A separate microphone-only recording is no longer created or uploaded.
- The original MediaRecorder Blob is previewed and downloaded directly by the browser. Its format is selected from the browser's supported MediaRecorder types (normally WebM/Opus in desktop Chrome or Edge, with MP4/M4A or OGG where supported).
- No audio transcoding, WAV creation, PCM conversion or external audio executable is used. The file downloaded by the user is the same original recording that is uploaded.
- The recording remains limited to ten minutes and 32 MB.

## Random score

The PHP upload handler generates the score with PHP's built-in cryptographically secure random integer function:

```php
$score = random_int(60, 100);
```

The score is saved in the existing `playhistory.score` field. The browser waits 3,000 milliseconds after receiving a successful upload response before displaying the score. Existing history and leaderboard pages continue to read the same database field.

## Implementation and storage

- `app/views/studio/studio-stage.php`: existing recording panel and result layout. Only the descriptive copy and score label have changed.
- `public/assets/js/karaoke-recorder.js`: one mixed browser recording, preview, original-format download, upload, three-second score delay and retry behavior.
- `public/assets/js/studio-player.js`: existing shared player and pause controls.
- `app/actions/recordings/upload_and_score.php`: authenticated upload, browser-format detection, direct storage upload, random score generation and history persistence.
- `app/config/.env.example`: Aiven and optional Supabase settings. There is no audio-tool path setting.

With `RECORDING_STORAGE="supabase"`, PHP streams the original MediaRecorder file directly to the existing public Supabase Storage bucket. Its permanent HTTPS URL is saved in Aiven `playhistory.user_recording`, so history and leaderboard playback continue working across computers. With `RECORDING_STORAGE="local"`, the original file is saved under `public/uploads/` and its relative URL is stored in the same database field.

The Supabase secret remains server-side in `app/config/.env`; it is never sent to browser JavaScript. The application uses its existing PHP cURL extension for direct object upload and does not require the Supabase JavaScript SDK or another framework.

Existing database rows and historical scores are retained. New history rows use the random score and a URL to the original browser recording. No database schema migration is required.

## Supabase setup (local development and deployment)

1. Open the Supabase project dashboard and create a Storage bucket named `karaoke-recordings`.
2. Make the bucket Public because the current history and leaderboard playback model uses public audio URLs. Anyone with a recording URL can access that audio.
3. Set the bucket and project upload limits to at least 50 MB. Allow the MIME types `audio/webm`, `audio/mp4` and `audio/ogg`.
4. Copy the project URL and create/copy a backend secret key. A legacy `service_role` JWT also works. Do not use a publishable/anon key for the server-side upload.
5. Copy `app/config/.env.example` to `app/config/.env`, then fill in the actual Aiven database values and the Supabase settings:

   ```ini
   RECORDING_STORAGE="supabase"
   SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
   SUPABASE_SECRET_KEY="sb_secret_YOUR_SERVER_KEY"
   SUPABASE_RECORDINGS_BUCKET="karaoke-recordings"
   ```

   Keep the secret in `.env`; never put it in browser JavaScript or commit it to source control.
6. PHP needs the existing `curl`, `fileinfo`, `mysqli` and `openssl` extensions. Set `upload_max_filesize` and `post_max_size` to 40M or higher. The application enforces its own 32 MB recording limit. If PHP reports TLS verification errors, configure `curl.cainfo` with a trusted CA bundle; keep certificate verification enabled.
7. Run Apache, open the site in desktop Chrome or Edge, log in, select a song and share the studio tab with audio. Record a short performance and press **Stop & download**. The original-format download starts, and after the upload succeeds the score appears after three seconds.
8. Check Supabase Storage for the user's folder and original recording. Open History and the Leaderboard to verify playback and score persistence.

Public read access is required by the current playback approach. The PHP server authenticates uploads with its server secret, so public INSERT/UPDATE policies are not required.

## Failure handling and compatibility

- If tab audio or microphone permission is missing, recording does not begin and the user receives an explanatory message.
- If upload fails, the browser still previews and downloads the original local Blob and offers **Retry upload**. The interface does not claim that cloud upload or history persistence succeeded.
- If history insertion fails after audio storage succeeds, the score and saved audio remain available in the response; the UI shows history pending and offers retry.
- The browser controls the download location and may ask the user to accept saving.
- Existing `uploads/...` recording URLs and historical scores are not migrated or overwritten.
- The browser and server must support the selected MediaRecorder format. Desktop Chrome or Edge is the supported recording target described by the current UI.
