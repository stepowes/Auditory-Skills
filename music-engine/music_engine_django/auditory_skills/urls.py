from django.urls import path
from . import views 
from .views import CreateUserView, LoginView, StartGameView, SaveGameDataView, LeaderboardView, UserRecord


urlpatterns = [
    path('api/user/login/', LoginView.as_view(), name='login'),
    path('api/user/create/', CreateUserView.as_view(), name='create_user'),
    path('api/start-game/', StartGameView.as_view(), name='start_game'), 
    path('api/save-game-data/', SaveGameDataView.as_view(), name='save_game_data'),
    path('api/leaderboard/', LeaderboardView.as_view(), name='leaderboard-api'),
    path('api/userrecord/', UserRecord.as_view(), name='user_record'),
    #path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]

