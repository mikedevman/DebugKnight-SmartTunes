import librosa
import numpy as np
import sys

# Extract pitch sequence
def extract_pitch(file):
    try:
        y, sr = librosa.load(file)
    except Exception as e:
        print(f"Error loading file {file}: {e}")
        return np.array([])

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

    if len(ref_pitch) == 0:
        print("Error: Reference file has no detectable pitch.")
        return

    if len(user_pitch) == 0:
        print("Error: User recording has no detectable pitch.")
        return

    # Reshape to match DTW expected input: (1, N)
    ref_pitch = ref_pitch.reshape(1, -1)
    user_pitch = user_pitch.reshape(1, -1)

    # DTW comparison
    try:
        dist, _ = librosa.sequence.dtw(ref_pitch, user_pitch)
        cost = dist[-1, -1]

        scaling_factor = 5000  # Tunable
        score = 100 * np.exp(-cost / scaling_factor)
        score = max(0, min(100, score))
        print(f"Vocal Score: {score:.2f}/100")
    except Exception as e:
        print(f"Error during DTW comparison: {e}")

# CLI support
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python soundalgo.py reference_file user_file")
        sys.exit(1)

    ref = sys.argv[1]
    usr = sys.argv[2]
    compare(ref, usr)
