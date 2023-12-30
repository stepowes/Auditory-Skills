# Create a new Python file in your app's management/commands/ directory, e.g., erase_user.py

from django.core.management.base import BaseCommand
from auditory_skills.models import CustomUser, IntervalQuizData

class Command(BaseCommand):
    help = 'Erase a user and their related data'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username of the user to be deleted')

    def handle(self, *args, **options):
        username = options['username']

        try:
            # Fetch the user
            user_to_delete = CustomUser.objects.get(username=username)

            # Delete related game history
            IntervalQuizData.objects.filter(user=user_to_delete).delete()

            # Delete the user
            user_to_delete.delete()

            self.stdout.write(self.style.SUCCESS(f'Successfully erased user {username} and their related data'))
        except CustomUser.DoesNotExist:
            self.stderr.write(self.style.ERROR(f'Error: User {username} does not exist'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error: {e}'))