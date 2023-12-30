from pydub import AudioSegment
from pydub.playback import play
#from fluidsynth import fluidsynth
import numpy as np
import os

# Specify the path to ffmpeg executable 

currentDirectory = os.path.dirname(os.path.abspath(__file__))
ffmpeg_path = os.path.join(currentDirectory, 'pydub dependencies', 'ffmpeg-6.1-essentials_build', 'bin', 'ffmpeg.exe')
AudioSegment.converter = ffmpeg_path

# Load Synth to use sound fonts for different sound timbres

# fs = fluidsynth.Synth()
# fs.start(driver = 'dsound')
# soundfont_path = os.path.join(currentDirectory, 'pydub dependencies', 'FluidR3_GM', 'FluidR3_GM.sf2')
# sfid = fs.sfload(soundfont_path)



def createQuestion(freq1, freq2, duration, timbre, filename):
    # tones = []
    # if not togetherOnly:
    #     tones.append(generate_tone(freq1, duration))
    #     tones.append(generate_tone(freq2, duration))
    # Ensure both tones have the same duration
    tone1 = generate_tone(freq1, duration)
    tone2 = generate_tone(freq2, duration)
    
    # Use overlay to play them simultaneously
    # tones.append(tone1.overlay(tone2))
    # combined = tone2.overlay(tone1) 
    
    # Concatenate tones if needed
    output_tone = tone1 + tone2  # Add all tones together
    output_directory = currentDirectory
    for i in range(3):
        output_directory = os.path.dirname(output_directory)
    output_directory = os.path.join(output_directory, 'curly-disco','music-quiz','src', 'mp3 files')
    # Export to an audio file (e.g., mp3)
    output_tone.export(os.path.join(output_directory, filename + '.mp3'), format="mp3")


def generate_tone(frequency, duration, volume=0.5):
    sample_rate = 44100  # Standard audio CD quality

    # Generate time array
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)

    # Generate audio samples
    audio_data = (volume * np.sin(2 * np.pi * frequency * t)).astype(np.float32)

    # Convert to 16-bit format for pydub
    audio_data = (audio_data * 32767).astype(np.int16)

    # Create AudioSegment
    audio = AudioSegment(
        audio_data.tobytes(),
        frame_rate=sample_rate,
        sample_width=audio_data.dtype.itemsize,
        channels=1
    )

    return audio

def test():
    # Example frequencies and durations
    frequencies = [440, 880]  # Hz
    durations = [2, 3]  # Seconds

    tones = [generate_tone(freq, dur) for freq, dur in zip(frequencies, durations)]

    # Concatenate tones if needed
    output_tone = sum(tones)  # Add all tones together

    # Export to an audio file (e.g., mp3)
    output_tone.export("output.mp3", format="mp3")

