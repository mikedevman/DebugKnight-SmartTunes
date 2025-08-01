let mediaRecorder;
let recordedChunks = [];
let timerInterval;
let elapsedSeconds = 0;

// Get UI elements
const startBtn = document.getElementById("start-recording");
const stopBtn = document.getElementById("stop-recording");
const playback = document.getElementById("playback");
const status = document.getElementById("recording-status");
const timerDisplay = document.getElementById("record-timer");

// Handle start recording button click
startBtn.addEventListener("click", async () => {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Reset recorded data
    recordedChunks = [];

    // Create MediaRecorder instance
    mediaRecorder = new MediaRecorder(stream);

    // Handle audio data available
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    // Handle recording stop
    mediaRecorder.onstop = () => {
      // Convert chunks into a single blob
      const blob = new Blob(recordedChunks, { type: "audio/webm" });

      // Stop the recording timer
      clearInterval(timerInterval);
      timerDisplay.textContent = "";

      // Set playback source and show it
      const url = URL.createObjectURL(blob);
      playback.src = url;
      playback.style.display = "block";

      // Show upload status
      status.innerHTML = "Uploading and scoring... ⏳ (estimated 15-20 seconds)";

      // Prepare form data to send to server
      const formData = new FormData();
      formData.append("audio", blob, "user_recording.webm");
      formData.append("song_id", CURRENT_SONG_ID);

      // Send recording to server for scoring
      fetch("upload_and_score.php", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        // If score was returned successfully
        if (data.success) {
          status.innerHTML = `✅ Vocal Similarity Score: <strong>${data.score.toFixed(2)} / 100</strong> 🎯`;
        } else {
          // Show clean and user-friendly error message
          let reason = "❌ An error occurred.";
          const debug = (data.debug || "").toLowerCase();

          if (debug.includes("ffmpeg")) {
            reason = "❌ Audio conversion failed.";
          } else if (debug.includes("no detectable pitch")) {
            reason = "❌ No pitch detected. Try singing louder or clearer.";
          } else if (debug.includes("duration mismatch")) {
            reason = "❌ Your vocal duration doesn't match the reference.";
          } else if (debug.includes("librosa") || debug.includes("traceback")) {
            reason = "❌ Audio processing error.";
          } else if (data.error) {
            reason = `❌ ${data.error}`;
          }

          status.innerHTML = reason;
        }
      })
      .catch(err => {
        // Upload failed
        status.innerHTML = "❌ Upload failed. Please try again.";
        console.error(err);
      });
    };

    // Start recording
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    status.innerHTML = "Recording... 🔴";

    // Start recording timer
    elapsedSeconds = 0;
    timerDisplay.textContent = "⏱️ 0:00";
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      const mins = Math.floor(elapsedSeconds / 60);
      const secs = elapsedSeconds % 60;
      timerDisplay.textContent = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);

  } catch (err) {
    // Microphone not accessible or blocked
    status.innerHTML = "❌ Microphone access denied or not supported.";
    console.error(err);
  }
});

// Handle stop recording button click
stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});
