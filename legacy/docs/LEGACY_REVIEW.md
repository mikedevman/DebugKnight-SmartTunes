# Legacy studio review

## Coverage

Inventoried the PHP, JavaScript, CSS and Python source files in `legacy`, checked local page/script references, and traced the song, album, playlist, upload and recording flows. Third-party libraries and binary/media archives were left intact. The shared site header remains unchanged.

## Repairs

- Versioned studio CSS and JavaScript URLs so cached clients receive scripts matching the paginated API response. Song requests bypass the browser cache.
- Added visible loading, empty and failure states with a Retry control.
- Removed studio references to the missing `js/jplayerInit.js` and the WaveSurfer initializer whose `#audiowave` target does not exist on these pages. No files were deleted.
- Consolidated the stage and recorder into `studio-stage.php`. Album and playlist pages use `collection-studio.php`, `collection-studio.js` and the same karaoke stylesheet.
- Kept song queries bounded to 20 results, including playlist contents and add-song suggestions. Album and playlist filters follow their existing database relationships.
- Preserved selected-song deep links. Shared playback supports YouTube watch, short, embed and Shorts links, and local video URLs.
- Connected collection playback to the recorder's current song ID. Each recording captures that ID at the start, preventing later song selection from reassigning the recording.
- Replaced duplicated upload/edit markup with `song-forms.php`. Existing POST field names and endpoints remain in place. The dialogs provide labels, focus management, keyboard dismissal, inline save feedback, and matching navy/pink styles.
- Repaired footer links to the nonexistent `artists.html` page and the incomplete Google Fonts URL on the playlist listing page.
- Corrected the album listing's optional song-search query to use the real `song_id` and `name` columns, preserving its previous result aliases.

## Validation

- PHP syntax checks across the legacy PHP files; JavaScript syntax checks across application scripts.
- Actual PHP pages rendered with an isolated test session and live read-only database queries.
- DOM checks and Chrome browser checks against the rendered pages: visible song lists, bounded requests, player dimensions, selected recording target, dialogs, focus, mobile layouts and cache-versioned assets.
- Browser verification intercepts mutation requests. Tests do not upload songs, edit production rows, delete collection contents, or submit recordings to the live database.
- Desktop and mobile screenshots are available locally in `artifacts/`, which is ignored by Git.

## Existing scoring limitation

`upload_and_score.php` calls `bin/soundalgo.exe`, but that executable is absent. `soundalgo.py` is present. Full recording-to-score processing therefore remains unverified; these changes do not build or replace the scoring executable.
