# Create a new Python file in your app's management/commands/ directory, e.g., erase_game_history.py

from django.core.management.base import BaseCommand
from auditory_skills.models import IntervalQuizData

class Command(BaseCommand):
    help = 'Erase game history for a specific user'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username of the user whose game history should be erased')

    def handle(self, *args, **options):
        username = options['username']

        try:
            user_data = IntervalQuizData.objects.filter(user__username=username)
            user_data.delete()
            self.stdout.write(self.style.SUCCESS(f'Successfully erased game history for user {username}'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error: {e}'))