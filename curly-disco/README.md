# curly-disco
This repository basically focus on the project to process various kinds of musical intervals using front-end, back-end, AI, machine learning, and neuroevolution.

# step 1
Download all dependency files required to implement the project:
## (1) the sample of react app: 
    npx-create-react-app music-quiz --template typescript
    cd ./music-quiz
## (2) delete every file except App.tsx and index.tsx
## (3) the stylistic formats to visualize the project
    npm i styled-components @types/styled-components
    npm start ----> localhost:4006
## (4) the background image for the game
    images/music-bg.jpg
## (5) Catamaran
    https://fonts.google.com/specimen/Catamaran
## (6) Trivia API
    https://opentdb.com/api_config.php




# step 2
Start the logic of our implementation so that our code is able to function properly.
## (1) 1. create a file QuestionCard.tsx so that each functionality
##        associated with the question card is able to operate efficiently.
            QuestionCard.tsx ------> the tool used for recording questions

            Code sample:
            import react from 'React';
            const QuestionCard = () => {
                return <div>Quiz Card</div>
            }
            export default QuestionCard;


## (2) 1. create two typescript files Questiom.ts and utils.ts, where 
##        Question.ts is mainly for the logic by fetching data from API
##        and utils.ts for questions that are kept randomized.
            API.ts  utils.ts  

## (3) 1. think of the implementation of the main function 
##        so that the user is able to complete the quiz fluently. 
            App.tsx
            // the framework we want to focus on
            import react from 'React';
            const APP = () => {
                return <div class='APP'>Quiz Game</div>;
            }
            export default APP;

##      2. consider how the const program APP is functioned
##         
##         const startTrivial = async() => {

##         } 
##         The reason why asyc() is added to the function startTrivial()
##         is going to make the API call.

##         const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

##         }

##         const NextQuestion = () => {

##         }

##         ** The return function must encompass a pair of parenthesis because 
##            the const function APP() above is the one with an array.**
                import react from 'React'; 
                const APP = () => {
                    // The first action the user taks depicts the 
                    // scenario at which the user starts the game. 
                    const startTrivial = async() => {

                    }

                    // The second action mainly focus on the user 
                    // clicking the answer he/she selects
                    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

                    }
                    
                    // The third and last action the user needs to concentrate on
                    // is the next question that should be completed. 
                    const nextQuestion = () => {

                    }
                    return (<div class='APP'>
                             Quiz Game
                             </div>);
                }
                export default APP; 
##      3. modify and edit the html portion of the main class APP
##         to format the structure of the website properly for visualization
                import react from 'React';
                import QuestionCard from './components/QuestionCard.tsx';
                const APP = () => {
                    // The first action the user taks depicts the 
                    // scenario at which the user starts the game. 
                    const startTrivial = async() => {

                    }

                    // The second action mainly focus on the user 
                    // clicking the answer he/she selects
                    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

                    }
                    
                    // The third and last action the user needs to concentrate on
                    // is the next question that should be completed. 
                    const nextQuestion = () => {

                    }
                    return (<div class='APP'>
                                <h1> Music Quiz</h1>
                                <button className='start' onClick={startTrivial}>
                                   Start
                                </button>
                                <p className='score'>Score:</p>
                                <p>Loading Questions...</p>
                                <QuestionCard />
                                <button className='next' onClick={nextQuestion}>
                                   Next
                                </button>
                             </div>);
                }
                export default APP;    

##     4. navigate through QuestionCard.jsx and and figure out any specific components
##        associated with the questions
          import React from 'react';

          type Props = {
            question: string; // the content of the question
            answer: string[]; // the standard answer of each question
            callback: any; // the specific operation while viewing each question
            userAnswer: string; // the answer the use types
            questionNr: number; // the number associated with each question
            totalQuestions: number; // How many questions in total
          }


##     5. apply the following properties above into the const function so that we are able to
##        finalize QuestionCard.jsx carefully.
          import React from 'react';

          type Props = {
            question: string; // the content of the question
            answers: string[]; // the choices of each question
            callback: any; // the specific operation while viewing each question
            userAnswer: any; // the answer the use types
            questionNr: number; // the number associated with each question
            totalQuestions: number; // How many questions in total
          }

          const QuestionCard: React.FC<Props> = ({question, answer, callback, userAnswer, questionNr, totalQuestions}) => (
              <div>
                <p className="number">
                   Question: {questionNr}/{totalQuestions} 
                </p>

                <p dangerouslySetInnerHTML={{__html: question }} /> // Question Itself

                <div>
                   {answers.map(answer => (
                      <div>
                         <button disabled={userAnswer} onClick={callback}>
                              <span dangerouslySetInnterHTML={{__html: answer}}>
                         </button> 
                      </div>
                    ))}    
                </div>
              </div>
          );
          export default QuestionCard;

    
##      6. Once the setting of QuestionCard is done, we return back to App.jsx to  
##         introduce the user state at the web. At the same time, any changes to 
##         QuestionCard can be utilized in the main application too.
           import react, {useState} from 'React';
                import QuestionCard from './components/QuestionCard.tsx';
                const TOTAL_QUESTIONS = 10;

                const APP = () => {

                    const[loading, setLoading] = useState(true);
                    const[questions, SetQuestions] = useState([]);
                    const[number, setNumber] = useState(0);
                    const[userAnswers, setUserAnswers] = useState([]);
                    const[score, setScore] = useState(0);
                    const[gameOver, setGameOver] = useState([]); 

                    

                    // The first action the user taks depicts the 
                    // scenario at which the user starts the game. 
                    const startTrivial = async() => {

                    }

                    // The second action mainly focus on the user 
                    // clicking the answer he/she selects
                    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

                    }
                    
                    // The third and last action the user needs to concentrate on
                    // is the next question that should be completed. 
                    const nextQuestion = () => {

                    }
                    return (<div class='APP'>
                                <h1> Music Quiz</h1>
                                <button className='start' onClick={startTrivial}>
                                   Start
                                </button>
                                <p className='score'>Score:</p>
                                <p>Loading Questions...</p>
                                <QuestionCard 
                                    question: questions[number].question
                                    answers: questions[number].answers
                                    callback: {checkAnswer} 
                                    userAnswer: {userAnswers ? userAnswers[number]: undefined}
                                    questionNr: {number + 1}
                                    totalQuestions: {TOTAL_QUESTIONS}
                                />
                                <button className='next' onClick={nextQuestion}>
                                   Next
                                </button>
                             </div>);
                }
                export default APP; 


##      7. We need to fetch questions from different kinds of API, where this is our main 
##         resource to upload our audio files at the website. At the same time, we go back
##         to App.tsx file, comment out QuestionCard HTML tag for any unexpected bugs, and 
##         import the fetch class.
##
##         Once the fetch class is imported, we need to take advantage of the function 
##         console.log() to obtain the total number of questions presented on the monitor.

           - API.stx
           
                export enum Difficulty {
                   EASY = "easy",
                   MEDIUM = "medium",
                   HARD = "hard",
                }

                export const fetchQuestions = async(amount: number, difficulty: Difficulty) => {
                   const endpoint = ``; // This is the website to fetch questions from API
                   const data = await(await fetch(endpoint)).json(); 
                   // First of all, we await for the fetch itself, then await while converting 
                   // into the json file
                   console.log(data);

                }
            
            - APP.tsx
           
                import react, {useState} from 'React';
                import {fetchQuizQuestions} from './API.ts'

                import QuestionCard from './components/QuestionCard.tsx';
                import {Difficulty} from './API'

                const TOTAL_QUESTIONS = 10;

                const APP = () => {

                    const[loading, setLoading] = useState(true);
                    const[questions, SetQuestions] = useState([]);
                    const[number, setNumber] = useState(0);
                    const[userAnswers, setUserAnswers] = useState([]);
                    const[score, setScore] = useState(0);
                    const[gameOver, setGameOver] = useState([]); 

                    console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

                    // The first action the user taks depicts the 
                    // scenario at which the user starts the game. 
                    const startTrivial = async() => {

                    }

                    // The second action mainly focus on the user 
                    // clicking the answer he/she selects
                    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

                    }
                    
                    // The third and last action the user needs to concentrate on
                    // is the next question that should be completed. 
                    const nextQuestion = () => {

                    }
                    return (<div class='APP'>
                                <h1> Music Quiz</h1>
                                <button className='start' onClick={startTrivial}>
                                   Start
                                </button>
                                <p className='score'>Score:</p>
                                <p>Loading Questions...</p>
                                {/*<QuestionCard 
                                    question: questions[number].question
                                    answers: questions[number].answers
                                    callback: {checkAnswer} 
                                    userAnswer: {userAnswers ? userAnswers[number]: undefined}
                                    questionNr: {number + 1}
                                    totalQuestions: {TOTAL_QUESTIONS}
                                />*/}
                                <button className='next' onClick={nextQuestion}>
                                   Next
                                </button>
                             </div>);
                }
                export default APP;  


##      8.The properties associated with one question can be launched, containing 
##        six more properties that are required to take into account: category, 
##        correct_answer, difficulty, incorrect_answers, question, type, but it is 
##        important to combine both the correct answer and incorrect answers in one array
##        instead to do mapping.

          - API.ts
              import {shuffleArray} from './utils.ts' 
              export type Question = {
                  category: string
                  correct_answer: string
                  difficulty: string
                  incorrect_answers: string[]
                  question: string[]
                  type: string[]
               }

                export enum Difficulty {
                   EASY = "easy",
                   MEDIUM = "medium",
                   HARD = "hard",
                }

                export type QuestionState = Question & {answers: string[]}

                export const fetchQuestions = async(amount: number, difficulty: Difficulty) => {
                   const endpoint = ``; // This is the website to fetch questions from API
                   const data = await(await fetch(endpoint)).json(); 
                   // First of all, we await for the fetch itself, then await while converting 
                   // into the json file
                   return data.results.map((question: Question) => (
                       ...question
                       answers: shffuleArray([
                         ...question.incorrect_answers,
                         question.correct_answer
                       ])
                   )

                   );
                }

            - utils.ts
                export const shuffleArray= (array: any[]) =>
                [...array].sort(()=> Math.random() - 0.5);  // This function resolved the questions that
                                                            // need to be randomized.


##      9.After all questions are processed, the main file App.tsx can basically deal with the operation
##        that is relevant to the user response.
##              - All array objects must be switched into a type that is more specific 
##              - create a new prop type to indicate the user's potential situation
##              - implement methods based on the property so-called hook


              import react, {useState} from 'React';
              import {fetchQuizQuestions} from './API.ts'

              import QuestionCard from './components/QuestionCard.tsx';
              import {QuestionState, Difficulty} from './API'

              type AnswerObject = {
                   question: string;
                   answer: string;
                   correct: boolean;
                   correctAnswer: string;
              }

              const TOTAL_QUESTIONS = 10;

             
              const APP = () => {

                  const[loading, setLoading] = useState(true);
                  const[questions, setQuestions] = useState<QuestionState[]>([]);
                  const[number, setNumber] = useState(0);
                  const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
                  const[score, setScore] = useState(0);
                  const[gameOver, setGameOver] = useState([]); 

                  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

                  // The first action the user taks depicts the 
                  // scenario at which the user starts the game. 
                  const startTrivial = async() => {
                     setLoading(true);
                     setGameOver(false);

                     const questions_loaded = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
                     setQuestions(questions_loaded);
                     setNumber(1);
                     setUserAnswers([]);
                     setScore(0); 
                     setLoading(false); 
                  }

                  // The second action mainly focus on the user 
                  // clicking the answer he/she selects
                  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
                     const answer_selected = e.target.value;
                     const check_correctness = questions[number].correct_answer === answer_selected;
                     if (check_correctness) {
                        setScore(prev => prev + 1);
                     }
                     const answerObject = {
                        question: questions[number].question;
                        answer: answer_selected;
                        correct: check_correctness;
                        correctAnswer: questions[number].correct_answer;
                     }
                     setUserAnswers((prev) => [...prev, answerObject]);
                     
                  }
                  
                  // The third and last action the user needs to concentrate on
                  // is the next question that should be completed. 
                  const nextQuestion = () => {
                     const next_number = number + 1;
                     if (next_number === TOTAL_QUESTIONS) {
                        setGameOver(true);
                     }
                     else{
                        setNumber(next_number);
                     }
                      
                  }

                  return (<div class='APP'>
                              <h1> Music Quiz</h1>

                              {loading || userAnswers.length() === TOTAL_QUESTIONS ? (
                                 <button className='start' onClick={startTrivial}>
                                    Start
                                 </button>
                              ): null} 
                                 
                              {!gameOver ? <p className='score'>Score:</p>: null}
                              {loading ? <p>Loading Questions...</p>: null}
                              {!loading && !gameOver && (<QuestionCard 
                                  question: questions[number].question
                                  answers: questions[number].answers
                                  callback: {checkAnswer} 
                                  userAnswer: {userAnswers ? userAnswers[number]: undefined}
                                  questionNr: {number + 1}
                                  totalQuestions: {TOTAL_QUESTIONS}
                              />)}
                              {!loading && !gameOver && answers.length === number + 1 &&
                               number === TOTAL_QUESTIONS - 1 ? 
                                 (<button className='next' onClick={nextQuestion}>
                                    Next
                                  </button>): null}
                           </div>);
              }
              export default APP;  
              
              
              import React from 'react';

              type Props = {
                question: string; // the content of the question
                answers: string[]; // the choices of each question
                callback: any; // the specific operation while viewing each question
                userAnswer: any; // the answer the use types
                questionNr: number; // the number associated with each question
                totalQuestions: number; // How many questions in total
              }

              const QuestionCard: React.FC<Props> = ({question, answer, callback, userAnswer, questionNr, totalQuestions}) => (
                  <div>
                    <p className="number">
                       Question: {questionNr}/{totalQuestions} 
                    </p>

                    <p dangerouslySetInnerHTML={{__html: question }} /> // Question Itself

                    <div>
                       {answers.map(answer => (
                          <div key = "answer">
                             <button disabled={userAnswer} value={answer} onClick={callback}>
                                  <span dangerouslySetInnterHTML={{__html: answer}}>
                             </button> 
                          </div>
                        ))}    
                    </div>
                  </div>
              );
              export default QuestionCard;




