import librosa
import numpy as np

# Extract pitch sequence
def extract_pitch(file):
    y, sr = librosa.load(file)
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_track = []

    for i in range(pitches.shape[1]):
        index = magnitudes[:, i].argmax()
        pitch = pitches[index, i]
        if pitch > 0:
            pitch_track.append(pitch)

    return np.array(pitch_track)

# Compare using DTW
def compare(reference_file, user_file):
    ref_pitch = extract_pitch(reference_file)
    user_pitch = extract_pitch(user_file)

    if len(ref_pitch) == 0 or len(user_pitch) == 0:
        print("Error: One of the files has no detectable pitch.")
        return

    # Reshape to match DTW expected input: (1, N)
    ref_pitch = ref_pitch.reshape(1, -1)
    user_pitch = user_pitch.reshape(1, -1)

    # DTW comparison
    dist, _ = librosa.sequence.dtw(ref_pitch, user_pitch)
    cost = dist[-1, -1]
  
    # Try a much higher scaling_factor for better score range
    scaling_factor = 10000  # You can tune this value
    score = 100 * np.exp(-cost / scaling_factor)
    score = max(0, min(100, score))  # Clamp between 0–100
    print(f"Vocal Score: {score:.2f}/100")

# Console input
if __name__ == "__main__":
    ref = input("Enter path to reference file: ").strip('"')
    usr = input("Enter path to user file: ").strip('"')
    compare(ref, usr)
