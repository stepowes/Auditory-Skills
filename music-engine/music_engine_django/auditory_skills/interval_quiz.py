from .musical_data import getNoteFrequency, NOTES, INTERVALS
from .audio import createQuestion
import os
import random

currentDirectory = os.path.dirname(os.path.abspath(__file__))

for i in range(3):
    currentDirectory = os.path.dirname(currentDirectory)
mp3Directory = os.path.join(currentDirectory, 'curly-disco','music-quiz','src', 'mp3 files')

#This class defines our interval quiz game
class IntervalQuiz():   
    
    def __init__(self, difficulty):
        self.difficulty = difficulty
        self.score = 0
        self.questionsData = {}
        self.numberOfQuestions = 10
        self.questionsGenerated = False
        clearDirectory(mp3Directory)
        if self.difficulty == 'easy':
            self.octaveRange = [4,5]
            self.octaveDiffMax = 1
            self.minFreq = getNoteFrequency('C', 4)
            self.maxFreq = getNoteFrequency('B', 5)
        elif self.difficulty == 'medium':
            self.octaveRange = [3,6]
            self.octaveDiffMax = 1
            self.minFreq = getNoteFrequency('C', 3)
            self.maxFreq = getNoteFrequency('B', 6)
        elif self.difficulty == 'hard':
            self.octaveRange = [3,6]
            self.octaveDiffMax = 2
            self.minFreq = getNoteFrequency('C', 3)
            self.maxFreq = getNoteFrequency('B', 6)
        elif self.difficulty == 'insane':
            self.octaveRange = [1,7]
            self.octaveDiffMax = 6
            self.minFreq = getNoteFrequency('C', 1)
            self.maxFreq = getNoteFrequency('B', 7)
        else:
            print("Error: Invalid gamemode")

        for num in range(self.numberOfQuestions):
            self.generateQuestion(num+1)
        self.questionsGenerated = True

    '''
    This function generates a question based off of the difficulty. The difficulty of the game should
    alter things such as the range for which the intervals are selected and perhaps the range of timbres
    the intervals are played in, as well as whether or not they are played successively or simultaenously
    Easy:
        Within octaves 4 and 5
        Initial and 2nd note is chosen between C4 and B5, and the maximum interval is a single octave.
        In other words, the minFreq = C4 and the maxFreq = B5, maxOctDiff = 1
        The timbre is consistent and the notes are played successively and concurrently.
    Medium:
        Within octaves 3 and 6, with max interval 1 octave
        Initial and 2nd note chosen between C3 and B6
    Hard:
        Initial note and 2nd note is chosen between C3 and B6, and the interval can now be stacked on top of a 
        single octave. i.e. C4 and D5 chosen, interval = P8 + M2 therefore answer is just M2
        minFreq = C3, maxFreq = B6 maxOctdiff = 2
        The timbre is consistent and the notes are played successively
    Insane:
        2 notes are randomly chosen between C1 and B7.
        minFreq = C1, maxFreq = B7, octaveDiffMax = 6
        Timbre is randomized, *maybe sometimes noise is introduced in the sample*
        The notes are always played successively

    function should return the frequencies of the notes comprising the interval and the correct answer.
    '''
    def generateQuestion(self, problemNumber):
        # Randomize
        secondFrequency = float("inf")
        while secondFrequency < self.minFreq or secondFrequency > self.maxFreq:
            firstOctave = random.choice(self.octaveRange)
            firstNote = random.choice(list(NOTES.keys()))
            interval = random.choice(list(INTERVALS.keys()))
            secondOctaveAscendingRange = [firstOctave]
            secondOctaveDescendingRange = [firstOctave]

            for i in range(self.octaveDiffMax - 1):
                secondOctaveAscendingRange.append(firstOctave + i+1)
                secondOctaveDescendingRange.append(firstOctave - i-1)

            firstFrequency = getNoteFrequency(firstNote, firstOctave)
            #This decides if the interval is ascending or descending
            directionRange = [1, -1]
            direction = random.choice(directionRange)

            if direction == 1:
                secondOctave = random.choice(secondOctaveAscendingRange)
                secondFrequency = getNoteFrequency(firstNote, secondOctave, interval, 1)
                secondOctave = random.choice(secondOctaveAscendingRange)
                secondFrequency = getNoteFrequency(firstNote, secondOctave, interval, 1)   
            else:
                secondOctave = random.choice(secondOctaveDescendingRange)
                secondFrequency = getNoteFrequency(firstNote, secondOctave, interval, -1)
                secondOctave = random.choice(secondOctaveDescendingRange)
                secondFrequency = getNoteFrequency(firstNote, secondOctave, interval, -1)
        self.questionsData[str(problemNumber)] = {'freq1': firstFrequency, 'freq2': secondFrequency,'interval': interval}
        createQuestion(firstFrequency, secondFrequency, 1, 0, "problem" + str(problemNumber))    


#This helper function simply deletes the contents of the provided path.abs
#Please be very careful using this function as it will delete the entirity of the path you provide.
def clearDirectory(directory_path):
    # Check if the directory exists
    if os.path.exists(directory_path):
        # Iterate over all files and subdirectories in the directory
        for item in os.listdir(directory_path):
            item_path = os.path.join(directory_path, item)

            # Check if it's a file or directory
            if os.path.isfile(item_path):
                os.remove(item_path)  # Remove file
            elif os.path.isdir(item_path):
                shutil.rmtree(item_path)  # Remove directory and its contents

        print(f"Contents of '{directory_path}' cleared.")
    else:
        print(f"Directory '{directory_path}' does not exist.")
        

def testCode():
    game = IntervalQuiz("insane")
    print(game.questionsData)
        

