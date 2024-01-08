import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {CenteredContainer, WelcomeMessage, ButtonContainer, SelectedButton} from './Style/Menu.styles';

const Menu: React.FC = () => {
    const [userName, setUserName] = useState<string|null>(null);
    useEffect(() => {
       const storedUsername = localStorage.getItem('username');
       if(storedUsername) {
          setUserName(storedUsername);
       }
    },[]);
    const navigate = useNavigate();
    const GameHistory = () => {
        navigate('/menu/userdata');
    }
    const SkillsProfile = () => {
        navigate('/menu/skillsprofile');
    }
    const MainMenu = () => {
        navigate('/menu');
    }

    return(
        <CenteredContainer>
           <ButtonContainer>
                <SelectedButton onClick={GameHistory}>Game History</SelectedButton>
                <SelectedButton onClick={SkillsProfile}>Skills Profile</SelectedButton>
                <SelectedButton onClick={MainMenu}>Back</SelectedButton>
            </ButtonContainer>
        </CenteredContainer>
        
    );
}
export default Menu;