import styled, { createGlobalStyle } from 'styled-components';
//@ts-ignore
import BGImage from './images/musical.avif';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    paddle: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
  }
`;


export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

// tag
> p {
  color: #fff;
}

// the score table
.score {
  color: #fff;
  font-size: 2rem;
  margin: 0;
}

// h1 header
.h1 {
  font-family: Fascinate Inline, Haettenscheweiler, 'Arial Narrow Bold', san-serif;
  background-image: linear-gradient(180deg, #fff, #87f1ff);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  filter: drop-shadow(2px 2px #0085a3);
  font-size: 70px;
  font-weight: 400;
  text-align: center;
  margin: 20px;
}

.next {
  cursor: pointer;
  background: linear-gradient(180deg, #fff, #ffcc91);
  border: 2px solid #d38558;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;
}

.start{
  max-width: 200px;
}
`;

export const NextButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  top: 25px; 
  left: 190px;
`;

export const RecordButton = styled.button `
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    top: 450px; 
    right: 0px;
`;

export const AgainButton = styled.button `
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    top: 450px; 
    left: 60px;
`;

export const GameStartButton = styled.button `
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const ReturnButton = styled.button `
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



     
    
