import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './Style/Leaderboard.styles';
import { Link } from 'react-router-dom'; 

type User = {
    user__username: string;
    avgPerformance: number;
}

type LeaderboardData = {
  leaderboard: Record<string, User[]>;
};
const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy'); // Default difficulty

  const fetchLeaderboardData = async () => {
    try {
      console.log("REQUESTI MADE")
      const response = await axios.get<LeaderboardData>(`http://127.0.0.1:8000/api/leaderboard/`);
      console.log(response.data.leaderboard)
      return response.data.leaderboard;
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      return {};
    }
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(event.target.value);
  };

  useEffect(() => {
    // Fetch leaderboard data when the component mounts and when the difficulty changes
    fetchLeaderboardData().then((data) => {
      const selectedDifficultyData = data[selectedDifficulty] || [];
      setLeaderboardData(selectedDifficultyData);
    });
  }, [selectedDifficulty]);

  return (
    <S.LeaderboardContainer>
      <h1>Leaderboard Page</h1>
      <S.DifficultyDropdown>
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select id="difficulty" value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="insane">Insane</option>
        </select>
      </S.DifficultyDropdown>
      <S.LeaderboardList>
        {leaderboardData.map((user, index) => (
          <div key={index} className="leaderboard-item">
            <S.Rank>{index + 1}</S.Rank>
            <S.Username>{user.user__username}</S.Username>
            <S.Score>{user.avgPerformance}</S.Score>
          </div>
        ))}
      </S.LeaderboardList>
      {/* Back button */}
      <Link to="/menu">
        <button>Back to Menu</button>
      </Link>
    </S.LeaderboardContainer>
  );
}
export default Leaderboard;
