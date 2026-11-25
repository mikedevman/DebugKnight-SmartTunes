# Legacy folder architecture

## Structure

```text
legacy/
|-- .htaccess                       # Existing URL compatibility and routing
|-- .gitignore                      # Project ignore rules
|-- app/
|   |-- bootstrap.php               # Stable LEGACY_ROOT filesystem anchor
|   |-- config/
|   |   |-- .env                    # Local database settings; ignored by Git
|   |   |-- .env.example
|   |   |-- database.php
|   |   `-- routes.php              # Existing URLs -> structured implementations
|   |-- pages/                      # Page implementations, including auth/
|   |-- actions/                    # albums/, auth/, library/, playlists/,
|   |                               # recordings/, and songs/
|   |-- support/                    # Shared song pagination queries
|   `-- views/studio/               # Shared stage, collection view and song forms
|-- public/
|   |-- index.php                   # Single public PHP entry point
|   |-- assets/                     # css/, js/, img/, icon-fonts/
|   `-- uploads/                    # Existing uploaded recording files
|-- resources/
|   |-- reference-audio/
|   `-- vendor-archives/            # Original dependency archives
|-- storage/
|   `-- recordings/                 # Temporary upload staging; cleaned after processing
`-- docs/
```

## Request flow

Apache internally routes the original root page/API URLs to `public/index.php`. The entry point loads `app/bootstrap.php`, looks up the requested filename in `app/config/routes.php`, and requires the existing implementation under `app/`. The default project URL routes to the home page. Query strings, POST bodies, form actions and redirects retain their existing format.

The former 46 root PHP forwarding files and the root Python forwarding script were removed after verifying that their implementations exist in the structure. No unique implementation files were discarded. The root README and environment files were moved into `docs/` and `app/config/` respectively.

Pages retain their existing SQL and HTML rather than being rewritten into a framework. This is a separation by responsibility and feature. `app/.htaccess` prevents direct browser access to implementation and configuration files; PHP filesystem includes still work.

## Paths and compatibility

- `LEGACY_ROOT` points to this `legacy` directory. Use it for filesystem includes and file access.
- Database settings load from `app/config/.env`. Relative CA certificate paths remain relative to `LEGACY_ROOT`, preserving existing settings.
- Page links, form actions, redirects and JavaScript endpoint URLs retain their original root filenames and parameters, through the route map.
- Page assets live in `public/assets/`. Asset contents and CSS-relative image/font paths are unchanged.
- Apache maps former `css/`, `js/`, `img/`, `icon-fonts/`, `uploads/`, `reference-audio/`, `Source/`, `bin/` and `artifacts/` URLs to their structured locations.
- Existing recording URLs stored in the database retain their `uploads/...` format. No database migration or data update is part of this cleanup.
- The recording handler stores and uploads the original browser MediaRecorder file without transcoding. The PHP handler generates a random score from 60 to 100 and persists it to the existing history table. See `docs/RECORDING_EXPORT.md`.

Apache `mod_rewrite` and `.htaccess` overrides must remain enabled, as they already are in XAMPP. Keep the existing project URL/document root; no virtual-host change is required.
