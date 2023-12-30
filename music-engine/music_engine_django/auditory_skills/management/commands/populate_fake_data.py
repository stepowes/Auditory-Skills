# myapp/management/commands/populate_fake_data.py
from django.core.management.base import BaseCommand
from faker import Faker
from auditory_skills.models import CustomUser, IntervalQuizData
import random
from datetime import datetime, timedelta
from django.contrib.auth.hashers import make_password
from django.utils import timezone
fake = Faker()

class Command(BaseCommand):
    help = 'Populate fake data for testing'

    def handle(self, *args, **options):
        self.sims = options['sims']
        self.populate_data()

    def add_arguments(self, parser):
        parser.add_argument('sims', type=int, help = 'Amount of games to generate for test user.')

    def populate_data(self):
        # Create a user
        user = CustomUser.objects.create(
            username='testuser',
            email='testuser@example.com',
            age=random.randint(18, 99),
            dateCreated=fake.date_of_birth(minimum_age=18, maximum_age=99).strftime('%Y-%m-%d'),
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            musicalYear=random.randint(1, 10),
            # other fields...
        )
        # Set the password using set_password
        user.set_password('testpassword')
        user.save()
        # Populate fake games played data
        for _ in range(self.sims):  # adjust the number of games as needed
            date_played = timezone.now() - timedelta(days=random.randint(0, 365))
            score = random.randint(0, 10)
            total_time = random.randint(10, 300)
            difficulty = random.choice(['easy', 'medium', 'hard', 'insane'])
            game_name = fake.word()

            game_data = IntervalQuizData.objects.create(
                user=user,
                datePlayed=date_played,
                score=score,
                numOfQuestions=10,
                totalTime=total_time,
                gameName="Interval Quiz",
                gameDifficulty=difficulty,
                questionsData={},  # Add appropriate data for your JSONField
                userAnswers={},    # Add appropriate data for your JSONField
                # other fields...
            )

            self.stdout.write(self.style.SUCCESS(f'Created game: {game_data}'))
