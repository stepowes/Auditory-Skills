import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import RegisterSuccess from './Authentication/RegisterSuccess';
import Menu from './User Experience/Menu';
import GameMode from './User Experience/GameMode';
import Game from './User Experience/Level/IntervalQuiz';
import UserDataMenu from './User Experience/UserDataMenu';
import UserRecord from './User Experience/UserRecord';
import Leaderboard from './User Experience/Leaderboard';
import {GlobalStyle, Wrapper} from './GameContent.styles';
import SkillsProfile from './User Experience/SkillsProfile';

const App = () => {
  
    return (
    <>
      <GlobalStyle />
      <Wrapper />
      <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<RegisterSuccess />} />

            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/userdatamenu" element={<UserDataMenu />} />
            <Route path="/menu/userdata" element={<UserRecord />} />
            <Route path="/menu/skillsprofile" element={<SkillsProfile />} />
            <Route path="/menu/gamestart" element={<GameMode />} />
            <Route path="/menu/leaderboard" element={<Leaderboard/>} />
            
            <Route path="/menu/gamestart/play" element={<Game />}/>
            
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}
export default App;