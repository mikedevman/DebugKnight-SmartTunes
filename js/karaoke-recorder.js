let mediaRecorder;
let recordedChunks = [];

const startBtn = document.getElementById("start-recording");
const stopBtn = document.getElementById("stop-recording");
const playback = document.getElementById("playback");
const status = document.getElementById("recording-status");

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

      // Playback
      const url = URL.createObjectURL(blob);
      playback.src = url;
      playback.style.display = "block";

      // Display upload status
      status.textContent = "Uploading and scoring... ⏳";

      // Upload to PHP
      const formData = new FormData();
      formData.append("audio", blob, "user_recording.webm");

      fetch("upload_and_score.php", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          status.textContent = `Vocal Similarity Score: ${data.score.toFixed(2)} / 100 🎯`;
        } else {
          status.textContent = "Scoring failed ❌";
          console.error(data.error);
        }
      })
      .catch(err => {
        status.textContent = "Upload error ❌";
        console.error(err);
      });
    };

    // Start recording
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    status.textContent = "Recording... 🔴";

  } catch (err) {
    alert("Microphone access denied or not supported.");
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
