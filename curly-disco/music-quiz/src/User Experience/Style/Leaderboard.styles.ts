// Leaderboard.styles.ts
import styled from 'styled-components';

export const LeaderboardContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

export const DifficultyDropdown = styled.div`
  margin-bottom: 10px;
  label {
    margin-right: 10px;
  }
  select {
    padding: 5px;
  }
`;

export const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .leaderboard-item {
    margin: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
`;

export const Rank = styled.span`
  font-weight: bold;
`;

export const Username = styled.span`
  flex: 2;
`;

export const Score = styled.span`
  flex: 1;
`;