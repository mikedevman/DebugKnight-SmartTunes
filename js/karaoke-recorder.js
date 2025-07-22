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
      const url = URL.createObjectURL(blob);
      playback.src = url;
      playback.style.display = "block";

      status.textContent = "Analyzing pitch... 🎧";

      analyzePitch(blob); // Call vocal scoring
    };

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

// Analyze vocal pitch using Pitchy
const analyzePitch = async (blob) => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);

    const sampleRate = audioContext.sampleRate;
    const frameSize = 2048;
    const hopSize = 512;
    let detected = 0;
    let matches = 0;

    for (let i = 0; i < channelData.length - frameSize; i += hopSize) {
      const frame = channelData.slice(i, i + frameSize);
      const [frequency, clarity] = pitchy.getPitch(frame, sampleRate);

      if (clarity > 0.9 && frequency > 0) {
        detected++;
        // Check if pitch is within typical singing range (100–400 Hz)
        if (frequency >= 100 && frequency <= 400) {
          matches++;
        }
      }
    }

    const score = detected > 0 ? (matches / detected) * 100 : 0;
    status.textContent = `Estimated Vocal Score: ${score.toFixed(2)} / 100 🎵`;
  } catch (err) {
    status.textContent = "Pitch analysis failed ❌";
    console.error(err);
  }
};
