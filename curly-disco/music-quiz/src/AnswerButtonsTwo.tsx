import React from 'react';
import { ButtonGroupsOne, SquaredButton } from './AnswerButtons.styles';


// First of all, the buttons are able to be created 
// using the built-in interface in tsx.

interface ButtonGroupProps {
   answers: string[]
   onAnswerClick: (answer: string) => void
   answerSelected: {
      answer: string,
      isCorrect: boolean,
      correctAnswer: string;
   } | null
   showCorrectAnswer: boolean
}

const AnswerButtonsTwo: React.FC<ButtonGroupProps> = ({answers, onAnswerClick, answerSelected, showCorrectAnswer}) => {
  

   const handleAnswerClick = (answer: string) => {
      console.log("answer clicked");
      onAnswerClick(answer);
   }
   return (
   <> 
      <ButtonGroupsOne>
      {
         answers.map((answerOption) => {
           
            let buttonColor = "#0074d9";

            if (answerSelected && showCorrectAnswer) {
               if (answerSelected.answer === answerOption) {
                 buttonColor = answerSelected.isCorrect ? 'green' : 'red'
               }
               else if (answerOption === answerSelected.correctAnswer) {
                  buttonColor = 'green' 
               }
            }
           
            return (
               <SquaredButton 
                     key={answerOption} 
                     onClick={()=>handleAnswerClick(answerOption)}
                     backgroundColor={buttonColor}
               >
                     {answerOption}
               </SquaredButton>
            );

         
         })
      }
      
      </ButtonGroupsOne>
   </>
   );
};
export default AnswerButtonsTwo;