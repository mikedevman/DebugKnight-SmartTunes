# SmartTunes legacy application

This PHP application uses a layered folder structure while retaining its existing public page and API URLs.

- **Application code:** `app/`
- **Browser assets and uploaded media:** `public/`
- **Reference audio and original dependency archives:** `resources/`
- **Audio processing executables:** `tools/`
- **Logs and local previews:** `storage/`
- **Architecture and review notes:** `docs/`

The project root contains only `.htaccess` and `.gitignore`. Application requests run through `public/index.php`, with the existing URL-to-implementation mapping in `app/config/routes.php`. Edit the implementations under `app/`.

Continue opening the same URLs, such as `karaoke.php`, `album.php?id=1`, and `playlist.php?id=1`. Local database settings now live in `app/config/.env`, beside `.env.example`. Apache's existing rewrite module maps the original page, action, asset and media URLs to the structured implementation, so stored `uploads/...` links remain valid.

See [the architecture guide](ARCHITECTURE.md) for the folder layout and path conventions. Recording, mixed-audio export and microphone-level scores are described in [the recording guide](RECORDING_EXPORT.md). The [legacy review](LEGACY_REVIEW.md) and [previous scoring inspection](SCORING_REVIEW.md) are historical reviews.
