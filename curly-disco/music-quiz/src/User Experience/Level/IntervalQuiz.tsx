import React, { useState, useEffect, useRef } from 'react';

//Styles
import { GlobalStyle, Wrapper, NextButton, RecordButton, AgainButton, GameStartButton} from '../../GameContent.styles';
import AnswerButtonsTwo from '../../AnswerButtonsTwo';
import {useNavigate, useLocation} from 'react-router-dom';
import { AiFillSound } from 'react-icons/ai';
import axios from 'axios';
//Audio 
// TODO LATER: Make audio imports dynamic based on question amount
let Audio1: string | undefined;
let Audio2: string | undefined;
let Audio3: string | undefined;
let Audio4: string | undefined;
let Audio5: string | undefined;
let Audio6: string | undefined;
let Audio7: string | undefined;
let Audio8: string | undefined;
let Audio9: string | undefined;
let Audio10: string | undefined;
try {
  Audio1 = require('../../mp3 files/problem1.mp3');
  Audio2 = require('../../mp3 files/problem2.mp3');
  Audio3 = require('../../mp3 files/problem3.mp3');
  Audio4 = require('../../mp3 files/problem4.mp3');
  Audio5 = require('../../mp3 files/problem5.mp3');
  Audio6 = require('../../mp3 files/problem6.mp3');
  Audio7 = require('../../mp3 files/problem7.mp3');
  Audio8 = require('../../mp3 files/problem8.mp3');
  Audio9 = require('../../mp3 files/problem9.mp3');
  Audio10 = require('../../mp3 files/problem10.mp3');
} catch (error) {
  console.error('Error importing audio files:', error);
  // Handle the error as needed
}

export type AnswerObject = {
  question: string; // This is the audio file I am willing to consider
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

const Game = () => {
  // useEffect(() => {
  //   console.log('Game component mounted');
  //   return () => {
  //     console.log('Game component unmounted');
  //   };
  // }, []);

   const location = useLocation();
   const difficultyFromUrl = new URLSearchParams(location.search).get('difficulty');
   
   const[loading, setLoading] = useState(false); // My game is loaded
   /* change the type of questions into the audio files created */
   
   const[number, setNumber] = useState(0); // the question number
  
   const questions = [Audio1, Audio2, Audio3, Audio4, Audio5, Audio6, Audio7, Audio8, Audio9, Audio10];
   const audioRef = useRef(new Audio());
   const [startTime, setStartTime] = useState<number | null>(null);
   const [questionTimes, setQuestionTimes] = useState<number[]>([])


   const playSound = () => {
       const currentMp3File = questions[number];
       console.log("The current mp3 file is: ", currentMp3File);
       if (audioRef.current && currentMp3File) {
           audioRef.current.src = currentMp3File;
           audioRef.current.play().catch(e => console.error('Error playing sound: ', e));
       }
   }
   const[currentAnswer, setCurrentAnswer] = useState<{
        answer: string;
        isCorrect: boolean;
        correctAnswer: string
   } | null>(null);
   const[userAnswers, setUserAnswers] = useState<string[]>([]); // the answers from the users
   const[score, setScore] = useState(0); // the score each user receives
   const[gameOver, setGameOver] = useState(true); // the game is Over
   const[timer, setTimer] = useState({
      seconds: 0,
      minutes: 0,
      hours: 0
   });
   type QuestionsData = {
    [questionId: number]: {
      [key: string]: string | number;
    };
   };
   const[showCorrectAnswer, setShowCorrectAnswer] = useState(false);
   const[questionsData, setQuestionsData] = useState<QuestionsData>({});
   //let correctAnswers: string[] = [];
   const[correctAnswers, setCorrectAnswers] = useState<string[]>([]);
   //console.log("currentAnswer:", currentAnswer, "showCorrectAnswer:", showCorrectAnswer);
   const [totalTime, setTotalTime] = useState(0);
   const [timerRunning, setTimerRunning] = useState(false);
   useEffect(()=>{
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
         setTimer(prevTimer => {
            let { hours, minutes, seconds } = prevTimer;
            seconds++;
            if (seconds === 60) {
               minutes++;
               seconds = 0;
            }
            if (minutes === 60) {
               hours++;
               minutes = 60;
            }
             // Calculate total time in seconds
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            setTotalTime(totalSeconds);
            return { hours, minutes, seconds };
         });        
      }, 1000);
    } 
    return () => clearInterval(interval);
   }, [timerRunning]);
   const navigate = useNavigate();
   //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)); 
   const dataToSend = {
    difficulty: difficultyFromUrl,
    currentUser: localStorage.getItem('username')
   };
   const startTrivial = async (e: React.MouseEvent<HTMLElement>) => {
        //console.log("Click event:", e);
        
        if(!gameOver) {
          console.log("GAME ALREADY IN SESSIon")
          return;
        }
        // We want to make the API call(start the game) 
        // with the function called async().
        setStartTime(Date.now());
        setLoading(true);
        
        
        console.log("Beginning of startTrivial");
        // Make a POST request to send the difficulty to the backend
        e.preventDefault();
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/start-game/', dataToSend, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: false,
              responseType: 'json',
          });
          const questionsData = response.data.questionsData;
          console.log(questionsData);
          setQuestionsData(questionsData)
        //   let correctAnswersVerified: string[] = [];
        //  for(let i = 0; i < Object.keys(questionsData).length; i++){
        //     correctAnswersVerified[i] = questionsData[(i+1).toString()]['interval'];
        //    }
        // console.log("Correct Answers Verified: ", correctAnswersVerified)
          setCorrectAnswers(Object.keys(questionsData).map(key => questionsData[key]['interval']));
      }catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Question loading failed:', error.response ? error.response.data : error.message); //failing here
          } else {
              console.error('Question loading failed:', error);
          }
          //alert('Invalid username or password');
        }
        
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setTimer({seconds: 0, minutes: 0, hours: 0});
        setTimerRunning(true);
        setGameOver(false);
        setLoading(false);
        //playSound();
    };
    useEffect(() => {
      if (!gameOver && !loading) {
        playSound();
      }
    }, [number]);
    const saveGameData = async () => {
      const totalQuestionTime = questionTimes.reduce((acc, time) => acc + time, 0);
      // Construct the data to be sent to the backend
      const gameData = {
          username: localStorage.getItem('username'), // Assuming you have stored the username in localStorage
          score: score,
          totalTime: totalQuestionTime,
          questionTimes: questionTimes,
          userAnswers: userAnswers,
          questionsData: questionsData,
          difficulty: dataToSend['difficulty'],
          // ... (other relevant data)
        };
        console.log(gameData)
      try {
        // Make a POST request to your backend API endpoint to store the game data
        const response = await axios.post('http://127.0.0.1:8000/api/save-game-data/', gameData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false, // Depending on your backend configuration
          responseType: 'json',
        });
      
        console.log('Game data saved successfully:', response.data);
      } catch (error) {
        if (axios.isAxiosError(error)){
          console.error('Error saving game data:', error.response ? error.response.data : error.message);
        }else{
          console.error('Error saving game data:', error)
        }
        
      }
    };
    useEffect(() => {
      if (~gameOver && userAnswers.length === TOTAL_QUESTIONS && number === TOTAL_QUESTIONS - 1) {
        // Call the function to send game data to the backend when the game is over
        saveGameData();
      }
    }, [gameOver, userAnswers]);
   
    const calculateTimeTaken = () => {
      if (startTime) {
          const endTime = Date.now();
          const timeTakenInSeconds = (endTime - startTime) / 1000; // convert to seconds
          return parseFloat(timeTakenInSeconds.toFixed(3)); // round to thousandths
      }
      return 0;
    };
    
   const CheckAnswer = (answer_selected: string) => {
      //console.log("The current answer is: ", answer_selected);
      //console.log("Answer selected:", answer_selected, "Correct answer:", correctAnswers[number]);
      // if (userAnswers.length === 0 || questions.length === 0) {
      //      return;
      // }
      const timeTaken = calculateTimeTaken();
      setQuestionTimes((prevTimes) => [...prevTimes, timeTaken]);
      setStartTime(Date.now())
      const correct_answer = correctAnswers[number];
      
      const isCorrect = correct_answer === answer_selected;
      
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer_selected]);
      setCurrentAnswer({
        answer: answer_selected, 
        isCorrect,
        correctAnswer: correct_answer
      });
      console.log("current Answer:", currentAnswer);

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setShowCorrectAnswer(true);
      if (number === TOTAL_QUESTIONS - 1) {
        // the timer is stopped
        setTimerRunning(false);
      }
    }
 
   const BackMenu = () => {
       
       navigate('/menu/gamestart');
   }
   const UserRecord = () => {
       navigate('/menu/userdata');
   }
   const UserMenu = () => {
        navigate('/menu');
   }
   const nextQuestion = () => {
        // concentrate on the specific instance at which the user
        // selects the next question..
        const next = number + 1;
        if (next === TOTAL_QUESTIONS){
            setTimerRunning(false);
            setGameOver(true);
        }
        else{
            setNumber(next);
            setShowCorrectAnswer(false);
        }
  };
      
    return (
     <>
      <GlobalStyle />
      <Wrapper />
          
        {gameOver && number === 0 &&
           <div style={{display: 'flex',
                        flexDirection: 'column', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'}}>
              <div style={{ marginBottom: '20px' }}>
                        <h1>Music Quiz</h1>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <GameStartButton type = "button" className="start" onClick={startTrivial} data-csrf="{% csrf_token %}">
                      Start
                  </GameStartButton>
                  <GameStartButton type = "button" className="back" onClick={UserMenu}>
                      Back
                  </GameStartButton>
              </div>
           </div>
          }

          {!gameOver && number === TOTAL_QUESTIONS - 1 && userAnswers.length === TOTAL_QUESTIONS &&
            <div>
              
              <RecordButton className="statistics" onClick={UserRecord}>
                         User Record
              </RecordButton>
              
              <AgainButton className="finish" onClick={BackMenu}>
                         Play Again
              </AgainButton>
            </div>  
            
          }
          {!gameOver ? (
            <div className="setting">
              <p className="score">
                Score:{score}
              </p>
              <p className="time">
                Time: {timer.hours}h {timer.minutes}m {timer.seconds}s
              </p>
            </div>): null
          }
          {loading && (
              <p>
                Loading Questions: ...
              </p>)
            }
 
            {/* This part can be deleted based on the video */}
            {/*  */}
            {/* {!loading && !gameOver && (
               
            } */}
            {!loading && !gameOver && (
                
              <div>
                  <p> 
                     Question: {number + 1} / {TOTAL_QUESTIONS}
                  </p>
                  {/* TODO: include the audio */}
                  <AiFillSound style={{height:50, width:50}} onClick={playSound}/>
                  <AnswerButtonsTwo answers={['P1', 'm2', 'M2', 'm3', 
                                              'M3', 'P4', 'A4', 'P5', 
                                              'm6', 'M6', 'm7', 'M7',
                                              'P8']} 
                                    onAnswerClick={CheckAnswer}
                                    answerSelected={currentAnswer}
                                    showCorrectAnswer={showCorrectAnswer}
                  />
              </div>
            )}
            
            {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <NextButton className="next" onClick={nextQuestion}>
                  Next
                </NextButton>): null
            }
        
      </>
  );
}
export default Game;
