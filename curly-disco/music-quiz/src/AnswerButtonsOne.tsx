import React from 'react';
import {ButtonGroupsOne, ButtonGroupsTwo, SquaredButton} from './AnswerButtons.styles'

interface GroupButtonsProp {
    answers1: string[]
    answers2: string[]
    onAnswerClick: (answer: string) => void
}

const AnswerButtonsOne: React.FC<GroupButtonsProp> = ({ answers1, answers2, onAnswerClick }) => {

    return(
        <div>
             <ButtonGroupsOne>
            {
                answers1.map((answer) => (
                        <SquaredButton key={answer} onClick={()=> onAnswerClick(answer)}> 
                            {answer} 
                        </SquaredButton>
                        
                ))
            }
            </ButtonGroupsOne>
            
            <ButtonGroupsTwo>    
            {   
                answers2.map((answer) => (
                    
                        <SquaredButton key={answer} onClick={()=> onAnswerClick(answer)}> 
                            {answer} 
                        </SquaredButton>
                        
                ))
            }
            </ButtonGroupsTwo>
        </div>
    );
}
export default AnswerButtonsOne;