
import { CenteredContainer, SelectDifficulty, ButtonContainer, SelectedButton } from './Style/Menu.styles';
import { useNavigate } from 'react-router-dom';

const GameMode = () => {
  const navigate = useNavigate();

  const start = (difficulty: string) => navigate(`/menu/gamestart/play?difficulty=${difficulty}`);

  return (
    <CenteredContainer>
      <SelectDifficulty> Please choose the desired difficulty!</SelectDifficulty>
      <ButtonContainer>
        <SelectedButton onClick={() => start('easy')}> Easy </SelectedButton>
        <SelectedButton onClick={() => start('medium')}> Medium </SelectedButton>
        <SelectedButton onClick={() => start('hard')}> Hard </SelectedButton>
        <SelectedButton onClick={() => start('insane')}> Insane </SelectedButton>
      </ButtonContainer>
    </CenteredContainer>
  );
}

export default GameMode;
