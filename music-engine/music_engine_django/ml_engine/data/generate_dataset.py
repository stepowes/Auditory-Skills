import sys
import os
# Navigate to root directory

currentDirectory = os.path.dirname(os.path.abspath(__file__))
for i in range(3):
    currentDirectory = os.path.dirname(currentDirectory)
rootDirectory = os.path.abspath(currentDirectory)
sys.path.append(rootDirectory)

from auditory_skills.interval_quiz import *



currentDirectory = os.path.dirname(os.path.abspath(__file__))


base_dir = "datasets"


def generateDataset(datasetName, numOfFiles, difficulty):
    dataset_dir = createDatasetDir(datasetName)
    quiz = IntervalQuiz(difficulty, numOfFiles, pathFromRoot)

def createDatasetDir(datasetName):
    dataset_dir = os.path.join(base_dir, datasetName)
    os.makedirs(dataset_dir, exist_ok=True)
    return dataset_dir

generateDataset("test", 20, "easy")