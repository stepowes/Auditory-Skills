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

def create_dataset_dir(self, base_dir, dataset_name):
    dataset_dir = os.path.join(base_dir, dataset_name)
    os.makedirs(dataset_dir, exist_ok=True)
    return dataset_dir


generateDataset("test", 20, "easy")