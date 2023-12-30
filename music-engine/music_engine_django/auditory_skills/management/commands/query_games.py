# yourapp/management/commands/query_games_for_user.py
import sys
from django.core.management.base import BaseCommand
from auditory_skills.models import CustomUser, IntervalQuizData

class Command(BaseCommand):
    help = 'Query games for a specific user'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username of the user to query games for')

    def handle(self, *args, **options):
        # Get the username from command-line arguments
        username = options['username']

        try:
            # Get the user
            user = CustomUser.objects.get(username=username)

            # Get all games played by the user
            user_games = IntervalQuizData.objects.filter(user=user)

            # Print the data
            self.stdout.write(f"Games played by {username}:")
            for game in user_games:
                self.stdout.write(f"Game Name: {game.gameName}, Score: {game.score}, Difficulty: {game.difficulty}, Total Time: {game.totalTime}, Date Played: {game.datePlayed}")

        except CustomUser.DoesNotExist:
            self.stderr.write(f"User with username {username} not found.")
