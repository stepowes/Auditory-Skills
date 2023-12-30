#This module contains all the relevant definitions and operations for musical data including frequencies and intervals.  

INTERVALS = {
    'P1': {'name': 'Perfect Unison', 'ratio': 1/1},
    'm2': {'name': 'Minor Second', 'ratio': 16/15},
    'M2': {'name': 'Major Second', 'ratio': 9/8},
    'm3': {'name': 'Minor Third', 'ratio': 6/5},
    'M3': {'name': 'Major Third', 'ratio': 5/4},
    'P4': {'name': 'Perfect Fourth', 'ratio': 4/3},
    'A4': {'name': 'Tritone', 'ratio': 45/32},
    'P5': {'name': 'Perfect Fifth', 'ratio': 3/2},
    'm6': {'name': 'Minor Sixth', 'ratio': 8/5},
    'M6': {'name': 'Major Sixth', 'ratio': 5/3},
    'm7': {'name': 'Minor Seventh', 'ratio': 9/5},
    'M7': {'name': 'Major Seventh', 'ratio': 15/8},
    'P8': {'name': 'Perfect Octave', 'ratio': 2/1},
}

NOTES = {
    'C': {'name': 'C0', 'frequency': 16.35},
    'C#/Db': {'name': 'C#/Db0', 'frequency': 17.32},
    'D': {'name': 'D0', 'frequency': 18.35},
    'D#/Eb': {'name': 'D#/Eb0', 'frequency': 19.45},
    'E': {'name': 'E0', 'frequency': 20.60},
    'F': {'name': 'F0', 'frequency': 21.83},
    'F#/Gb': {'name': 'F#/Gb0', 'frequency': 23.12},
    'G': {'name': 'G0', 'frequency': 24.50},
    'G#/Ab': {'name': 'G#/Ab0', 'frequency': 25.96},
    'A': {'name': 'A0', 'frequency': 27.50},
    'A#/Bb': {'name': 'A#/Bb0', 'frequency': 29.14},
    'B': {'name': 'B0', 'frequency': 30.87}
}

OCTAVES = [1,2,3,4,5,6,7,8]

#If interval is a decreasing interval, decreasing should be set to -1
def getNoteFrequency(noteName: str, octave: int = 0, interval: str = 'P1', decreasing: int = 1)-> float:
    """
        This function provides the frequency of a note based on the note name provided.
        You can optionally include an octave or/and an interval and it will return the frequency of the note.
    """
    if noteName not in NOTES.keys():
        print("Invalid note given.")
        return None
    else:
        return (NOTES[noteName]['frequency']*(2**octave)) * (INTERVALS[interval]['ratio'])**decreasing

