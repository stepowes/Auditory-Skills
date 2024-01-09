from django.core.management.base import BaseCommand
from auditory_skills.interval_quiz import IntervalQuiz
import os

class Command(BaseCommand):
    help = 'Generate a dataset using the IntervalQuiz class'

    def add_arguments(self, parser):
       parser.add_argument('dataset_name', type=str, help='Name of the dataset')
       parser.add_argument('num_of_files', type=int, help='Number of files in the dataset')
       parser.add_argument('difficulty', type=str, help='Difficulty level of the dataset')

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating dataset...'))
        dataset_name = options['dataset_name']
        num_of_files = options['num_of_files']
        difficulty = options['difficulty']


        base_dir = "ml_engine/data/datasets/"
        dir_from_root = "music-engine/music_engine_django/" + base_dir + dataset_name
        dataset_dir = self.create_dataset_dir(base_dir, dataset_name)
        quiz = IntervalQuiz(difficulty, num_of_files, dir_from_root)

        self.stdout.write(self.style.SUCCESS('Dataset generation completed.'))

    def create_dataset_dir(self, base_dir, dataset_name):
        dataset_dir = os.path.join(base_dir, dataset_name)
        os.makedirs(dataset_dir, exist_ok=True)
        return dataset_dir
