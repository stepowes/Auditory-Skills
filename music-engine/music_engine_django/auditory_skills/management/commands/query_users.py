# yourapp/management/commands/query_users.py
from django.core.management.base import BaseCommand
from auditory_skills.models import CustomUser

class Command(BaseCommand):
    help = 'Query users and print their data'

    def handle(self, *args, **options):
        # Get all instances of CustomUser
        all_users = CustomUser.objects.all()

        # Print the data
        for user in all_users:
            self.stdout.write(
                f'Username: {user.username}, Email: {user.email}, First Name: {user.firstname}, Last Name: {user.lastname}'
            )  # Adjust fields as per your model
