let mediaRecorder;
let recordedChunks = [];
let timerInterval;
let elapsedSeconds = 0;

const startBtn = document.getElementById("start-recording");
const stopBtn = document.getElementById("stop-recording");
const playback = document.getElementById("playback");
const status = document.getElementById("recording-status");
const timerDisplay = document.getElementById("record-timer");

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "audio/webm" });

      // Stop timer
      clearInterval(timerInterval);
      timerDisplay.textContent = "";

      // Playback user audio
      const url = URL.createObjectURL(blob);
      playback.src = url;
      playback.style.display = "block";

      status.innerHTML = "Uploading and scoring... ⏳ (estimated 15-20 seconds)";

      const formData = new FormData();
      formData.append("audio", blob, "user_recording.webm");

      fetch("upload_and_score.php", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          status.innerHTML = `✅ Vocal Similarity Score: <strong>${data.score.toFixed(2)} / 100</strong> 🎯`;
        } else {
          // Clean error messages only
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
        status.innerHTML = "❌ Upload failed. Please try again.";
        console.error(err);
      });
    };

    // Start recording
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    status.innerHTML = "Recording... 🔴";

    // Start timer
    elapsedSeconds = 0;
    timerDisplay.textContent = "⏱️ 0:00";
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      const mins = Math.floor(elapsedSeconds / 60);
      const secs = elapsedSeconds % 60;
      timerDisplay.textContent = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);

  } catch (err) {
    status.innerHTML = "❌ Microphone access denied or not supported.";
    console.error(err);
  }
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});
