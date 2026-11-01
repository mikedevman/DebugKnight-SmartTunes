# Recording export and voice-level scores

## User flow

The shared recording panel appears on karaoke, album and playlist pages. Select and play a track, share this studio tab with audio, allow microphone access, and use headphones. Press **Stop & download** to save the mix and start the WAV download. The result retains the audio preview and Download again control.

The score is now based on the microphone's own volume, from 0 to 100. Stronger voice levels receive a higher score; a comfortable clear microphone level reaches 100. It is a microphone-level score, not pitch or singing-accuracy grading. The former random scoring and Just for fun message have been removed from the interface.

## Audio path

- Requests microphone capture without automatic gain control, speech noise suppression or echo cancellation. These settings preserve singing dynamics; headphones are important to prevent speaker audio being picked up a second time.
- Gently removes microphone rumble below 70 Hz.
- Uses lower mix gains with headroom. Even at maximum slider settings, the nominal voice-plus-backing gain remains below full scale.
- Adds a compressor and output headroom to protect against loud combined peaks. Slider changes use short ramps to avoid clicks.
- Captures the stereo mix at a requested 256 kbps rather than the previous 96 kbps.
- Exports 48 kHz, 16-bit PCM WAV with a final peak limiter instead of recompressing the already encoded browser audio to MP3. The WAV cannot restore detail lost by the microphone or browser capture, but it avoids an additional lossy encoding stage.
- Pauses the backing player on Stop and when the exported take is played, preventing the live backing and recorded backing from playing over each other. YouTube control uses the IFrame API; if controls are unavailable, the embedded player is reloaded without autoplay.
- A live microphone meter warns about input clipping. Lower the device's microphone input if this warning appears; a later mix cannot repair an already clipped microphone signal.

## Score calculation

The browser also records the dry microphone separately at a requested 96 kbps. This private upload is used only to measure voice level, then deleted with the other temporary files. Neither the backing track nor either mix-volume slider affects the score.

PHP decodes the microphone with FFmpeg into mono 16 kHz signed 16-bit PCM. `app/support/voice_level.php` calculates RMS levels in 100 ms windows. Windows below -55 dBFS are ignored, and at least three active windows are required. The 80th percentile of active windows represents the stronger normal voice level, avoiding long pauses dominating the result.

```text
score = clamp(round((voice_dBFS + 55) / 27 * 100), 0, 100)
```

Silence scores zero; -28 dBFS or louder reaches 100. Ambient sound can still contribute to microphone level. This deliberately does not attempt to recognize lyrics or evaluate whether notes are correct.

## Implementation and storage

- `app/views/studio/studio-stage.php`: shared panel, level meter, result and controls.
- `public/assets/js/karaoke-recorder.js`: independent voice/mix capture, level meter, export and retries.
- `public/assets/js/studio-player.js`: shared player and pause controls.
- `app/actions/recordings/upload_and_score.php`: authenticated upload, WAV export, microphone measurement and history persistence.
- `app/support/voice_level.php`: deterministic microphone-level scoring.
- Each WAV download has a unique `voice_<random-token>.wav` filename under `public/uploads/`. With `RECORDING_STORAGE=supabase`, the original browser mix is uploaded to a public Supabase bucket under `<user-id>/voice_<random-token>.webm` (or `.m4a`/`.ogg` according to its detected format). Its permanent HTTPS URL is saved in Aiven `playhistory.user_recording`, so the existing leaderboard/history players work across computers. Tokens make filenames unique; scores themselves are not random.
- Private input/PCM files under `storage/recordings/` are inaccessible over HTTP and cleaned up after processing.
- Existing recordings and historical scores are retained. New history rows contain the measured voice-level score and unique WAV URL.
- No Python scorer or Python dependencies are used.

Recordings remain limited to ten minutes and combined uploads to 32 MB. The current XAMPP PHP upload/post limits are 40 MB. WAV downloads are larger than MP3 downloads.

## Failure handling

Missing tab audio prevents recording. Cancelled permissions, missing microphone uploads and conversion failures return clear errors. A local mixed browser-format download is retained if upload fails, with a retry button and no false Upload completed status. If WAV retrieval fails after a successful upload, the original mixed capture is downloaded with its correct extension.

The browser controls the download location and may ask the user to accept saving. Upload completed means the server saved the take and the download was initiated. Database outages do not discard the take; the UI shows Audio saved; history pending and offers Retry upload when history could not be saved. Links to history/leaderboard appear only after history is saved. Page/catalog loading still needs a reachable database.


## Supabase setup (local development and deployment)

The PHP website can stay on XAMPP/localhost. Only mixed recordings are hosted by Supabase; accounts, songs, scores and history stay in the existing Aiven MySQL database. No Supabase database tables, Supabase Auth integration, JavaScript SDK or new project files are needed.

1. Sign in at https://supabase.com/dashboard and create a project. Wait until it is ready.
2. Open **Storage**, create a bucket named **karaoke-recordings**, and enable **Public bucket**. Public audio is accessible to anyone who has its URL, which is required for the current leaderboard playback model.
3. In that bucket's settings, set its upload size limit to **50 MB**, and make sure the project's global limit allows 50 MB. Allow these MIME types: `audio/webm`, `audio/mp4`, `audio/ogg`. The server detects the actual file format rather than trusting a filename. It streams the original mixed capture to Supabase, avoiding an extra lossy encode and large WAV objects. The local download remains a 48 kHz WAV.
4. Copy the project URL (`https://<project-ref>.supabase.co`) from the **Connect** dialog or project API settings. Under **Project Settings > API Keys**, create/copy a backend **secret key** beginning with `sb_secret_`. A legacy `service_role` JWT also works, but a publishable/anon key cannot authorize these server uploads.
5. Edit the existing `legacy/app/config/.env` and fill the following settings, preserving all `DB_*` values:

   ```ini
   RECORDING_STORAGE="supabase"
   SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
   SUPABASE_SECRET_KEY="sb_secret_YOUR_SERVER_KEY"
   SUPABASE_RECORDINGS_BUCKET="karaoke-recordings"
   FFMPEG_PATH="C:/ffmpeg/bin/ffmpeg.exe"
   ```

   Put the secret directly in your local `.env`; never put it in browser JavaScript or send it through chat. This file is ignored by Git and denied by Apache. Hosting environment variables override its values.
6. Install FFmpeg if needed, using a Windows build linked from https://ffmpeg.org/download.html. You can extract it outside the project (for example under `C:/ffmpeg`); point `FFMPEG_PATH` at the actual `ffmpeg.exe`. The previous `legacy/tools/bin/ffmpeg.exe` path is still a fallback if no path is configured. On Linux, set an absolute path such as `/usr/bin/ffmpeg` instead.
7. Use Apache's PHP configuration (XAMPP: `C:/xampp/php/php.ini`). It needs `curl`, `fileinfo`, `mysqli` and `openssl`, an executable FFmpeg, and writable recording directories. Combined input uploads are capped at 32 MiB, so leave `upload_max_filesize` and `post_max_size` at **40M** or higher. If PHP reports TLS verification errors, configure `curl.cainfo` to a trusted CA bundle; keep certificate verification enabled. Restart Apache after changes to `php.ini` or system environment variables. Editing this project's `.env` does not normally need a restart.
8. Run XAMPP Apache, open the local website in desktop Chrome/Edge, log in, select a song on karaoke/album/playlist, and record a short performance with tab audio and microphone. Stop recording and wait for **Upload completed**. The browser starts the WAV download and shows **Your recordings** and **Leaderboard** links.
9. Open Supabase **Storage > karaoke-recordings**. A folder named after the user's numeric ID should contain the saved mix. Copy its public URL and test it in a private browser window. Open **History** to hear the new take; find the same entry in the paginated **Leaderboard** by its score/rank. Check that the new Aiven `playhistory.user_recording` value starts with your Supabase project URL, rather than `uploads/`.

Public read access is enough: the PHP server authenticates with a server secret, so you do not need public INSERT/UPDATE policies. Existing PHP sessions still control who can upload. New secret keys are sent only in the `apikey` header; legacy service_role JWTs additionally use Bearer auth. Browser download fetches stay on the PHP server, so no browser secret or special CORS setup is required.

## Storage errors and old recordings

- Missing settings, invalid server keys, private/missing buckets, rejected MIME types and size limits produce actionable recording errors. The browser preserves its original mixed local download and offers Retry upload. Failed cloud uploads do not insert broken recording URLs into history.
- A history insert failure leaves the already uploaded audio available but shows history pending. Check Aiven connectivity and retry before leaving the studio. Retrying reprocesses the retained take and may leave an unused cloud object if the prior history save failed.
- `RECORDING_STORAGE="local"` retains local-only behavior for development; it saves `uploads/...wav` to the database. This does not share audio across separate computers/servers.
- Existing `uploads/...` entries are not automatically migrated. Upload their original audio files to Supabase and update only the corresponding recording URLs if you need to migrate them. Missing audio cannot be recovered from a database URL alone.
- WAV copies currently remain on the PHP server for downloading; cloud storage contains the original high-bitrate browser-format mix. Deployment must retain writable recording directories and FFmpeg, plus the same server-side settings.

Official references: [bucket creation](https://supabase.com/docs/guides/storage/buckets/creating-buckets), [public buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [API keys](https://supabase.com/docs/guides/getting-started/api-keys), [storage access control](https://supabase.com/docs/guides/storage/security/access-control), [upload limits](https://supabase.com/docs/guides/storage/uploads/file-limits).
