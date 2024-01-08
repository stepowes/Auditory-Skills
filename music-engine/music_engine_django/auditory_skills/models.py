from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import JSONField
from django.utils import timezone
import uuid
# Create your models here.
#This model encompasses all of the data that defines our users
class CustomUser(AbstractUser):
    age = models.PositiveIntegerField()
    dateCreated = models.DateField(default=timezone.now)
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    email = models.EmailField(unique=True)  # Assuming email should be unique
    musicalYear = models.PositiveIntegerField()
    # Add related_name to avoid clashes
    groups = models.ManyToManyField(Group, related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name='customuser_set', blank=True
    )
    def __str__(self):
        return self.username  # Customize as needed

class GameData(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gameName = models.CharField(max_length = 255)
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE) 
    datePlayed = models.DateTimeField(default=timezone.now)
    score = models.IntegerField()
    numOfQuestions = models.IntegerField()
    totalTime = models.IntegerField(default=0)
class IntervalQuizData(GameData):
    # Fields specific to game
    gameDifficulty = models.CharField(max_length=50)
    questionsData = models.JSONField()  
    userAnswers = models.JSONField()
    questionTimes = models.JSONField(default=list)
