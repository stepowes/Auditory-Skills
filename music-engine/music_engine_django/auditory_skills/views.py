from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.views import LoginView as AuthLoginView
from django.views import View
from .interval_quiz import IntervalQuiz
import json
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.middleware.csrf import get_token
from .models import CustomUser, IntervalQuizData
from django.db.models import Avg, F, ExpressionWrapper, fields, FloatField
from datetime import datetime

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class CreateUserView(APIView):
    def post(self, request, *args, **kwargs):
        #print("Request Data: " + str(request.data))
        serializer = CustomUserSerializer(data=request.data)
        #print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
   
    def post(self, request, *args, **kwargs):
        try:
            # print(request.COOKIES)
            csrf_token_from_request = request.headers.get('X-CSRFToken')
            # print('CSRF Token from Request:', csrf_token_from_request)
            data = json.loads(request.body)
            username = data['username']
            password = data['password']

            # Authenticate user
            user = authenticate(request, username=username, password=password)
         

            if user is not None:
                # Log the user in
                login(request, user)
                # print(f"Session key: {request.session.session_key}")
                # print(f"Session data: {request.session.items()}")
                # print(f"Authenticated user: {request.user}")
                return JsonResponse({'message': 'Login successful', 'username': username}, status=200)
            else:
                return JsonResponse({'message': 'Invalid username or password'}, status=401)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

#@method_decorator(csrf_exempt, name='dispatch')
class StartGameView(APIView):
    #@method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        #Handle game logic
        try:
            # print(request.COOKIES)
            # print(f"Session key: {request.session.session_key}")
            # print(f"Session data: {request.session.items()}")
            # print(f"Authenticated user: {request.user}")
            difficulty = request.data['difficulty']
            print(difficulty)
            currentUser = request.data['currentUser']
            print("current user: " + str(currentUser))
            quiz = IntervalQuiz(difficulty)
            if not quiz.questionsGenerated:
                return JsonResponse({'error': 'Failed to generate questions'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            response_data = {
                'message': f'Game started with difficulty: {difficulty}',
                'questionsData': quiz.questionsData,
            }
            return JsonResponse(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            print("An exception occured in StartGameView " + str(e))
            return JsonResponse({'error': str(e)}, status=500)
    

class SaveGameDataView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract data from the request
            data = request.data
            username = data.get('username')  # Assuming you send the username with the request
            score = data.get('score')
            totalTime = data.get('totalTime')
            userAnswers = data.get('userAnswers')
            questionsData = data.get('questionsData')
            difficulty = data.get('difficulty')

            # Get or create the user
            try:
                # Get or create the user
                user = CustomUser.objects.get(username=username)
                 # Save IntervalQuizData instance
                interval_quiz_data = IntervalQuizData.objects.create(
                    gameName="Interval Quiz",  # Replace with your game name
                    user=user,
                    score=score,
                    totalTime=totalTime,
                    gameDifficulty=difficulty,
                    questionsData=questionsData,
                    userAnswers=userAnswers,
                    numOfQuestions = 10,
                )
                # You may want to return some response if needed
                return JsonResponse({'message': 'Game data saved successfully'}, status=200)
            except CustomUser.DoesNotExist:
                # Handle the case where the user doesn't exist
                return JsonResponse({'error': 'User not found'}, status=404)
            except CustomUser.MultipleObjectsReturned:
                # Handle the case where there are multiple users with the same username
                return JsonResponse({'error': 'Multiple users with the same username'}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class LeaderboardView(View):
    def get(self, request, *args, **kwargs):
        try:
            difficulty_levels = ['easy', 'medium', 'hard', 'insane']
            leaderboard_by_difficulty = {}

            for difficulty in difficulty_levels:
                # Calculate performanceScore, average it, and order by it for each difficulty
                leaderboard_data = (
                    IntervalQuizData.objects
                    .filter(gameDifficulty=difficulty)
                    .annotate(
                        performanceScore=ExpressionWrapper(
                            100.0 * F('score') / F('numOfQuestions') / F('totalTime'),
                            output_field=FloatField()
                        )
                    )
                    .values('user__username')
                    .annotate(avgPerformance=Avg('performanceScore', output_field=FloatField()))
                    .order_by('-avgPerformance')[:10]
                )

                # Convert QuerySet to a list of dictionaries
                leaderboard_list = list(leaderboard_data)
                print(leaderboard_list)
                # Store the leaderboard list for each difficulty
                leaderboard_by_difficulty[difficulty] = leaderboard_list
            #print("Leaderboard data by difficulty: " + str(leaderboard_by_difficulty))
            return JsonResponse({'leaderboard': leaderboard_by_difficulty}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class UserRecord(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            currentUser = data['currentUser']
            timeFrame = data['relevantTimeFrame']
            difficulty = data['difficulty']
            print("Current User: " + str(currentUser))
            print("Time Frame: " + str(timeFrame))
            print("Difficulty: " + str(difficulty))

            userData = IntervalQuizData.objects.filter(user__username=currentUser)

             # Convert date strings to datetime objects
            try:
                start_date = datetime.strptime(timeFrame['startDate'], "%Y-%m-%dT%H:%M:%S.%fZ") if timeFrame['startDate'] else None
                end_date = datetime.strptime(timeFrame['endDate'], "%Y-%m-%dT%H:%M:%S.%fZ") if timeFrame['endDate'] else None
            except Exception as date_conversion_error:
                return JsonResponse({'error': f'Date conversion error: {str(date_conversion_error)}'}, status=500)

            # Filter based on time frame
            if start_date and end_date:
                try:
                    userData = userData.filter(datePlayed__range=[start_date, end_date])
                except Exception as time_frame_filter_error:
                    return JsonResponse({'error': f'Time frame filter error: {str(time_frame_filter_error)}'}, status=500)

            # Filter based on difficulty
            if difficulty != 'All':
                userData = userData.filter(gameDifficulty=difficulty.lower())
            serialized_data = [
                {
                    'datePlayed': item.datePlayed,
                    'score': item.score,
                    'totalTime': item.totalTime,
                    'numOfQuestions': item.numOfQuestions,
                    'gameDifficulty': item.gameDifficulty
                    # Add other fields as needed
                }
                for item in userData
            ]
            print(serialized_data)
            return JsonResponse({'message': 'User record retrieved', 'data': serialized_data}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
