# Recording score implementation

The current recording flow does not perform audio analysis. After a successful upload, `app/actions/recordings/upload_and_score.php` generates an integer score from 60 through 100 using PHP `random_int(60, 100)`. The score is stored in the existing `playhistory.score` field.

The browser waits three seconds after the successful upload response before displaying the score. The score is an entertainment value only; it does not represent pitch accuracy, lyric accuracy, voice quality or singing ability.

The previous microphone-level and reference-audio scoring implementations are no longer part of the active application.
