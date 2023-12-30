import styled from 'styled-components';

export const CenteredContainer = styled.div`
   position: absolute;
   top: 80%;
   left: 50%;
   transform: translate(-50%, -50%);
   display: inline-block;
   align-items: center;
   justify-content: center;
   min-height: 100vh;
`;

export const WelcomeMessage = styled.p`
   font-size: 20px;
   margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

export const SelectDifficulty = styled.p`
   font-size: 20px;
   margin-bottom: 20px;
`;

export const SelectedButton = styled.button`
   background-color: #007bff;
   color: #fff;
   padding: 10px 20px;
   border: none;
   border-radius: 5px;
   margin-bottom: 20px;
   
   &:hover{
     background-color: #0056b3;
   }
`;