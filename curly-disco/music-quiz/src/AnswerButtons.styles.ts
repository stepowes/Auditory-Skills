import styled from 'styled-components';

interface SquaredButtonProps {
    backgroundColor?: string;
 }

export const ButtonGroupsOne = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
`;

export const ButtonGroupsTwo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repear(3, 1fr);
    gap: 5px;
`;

export const SquaredButton = styled.button<SquaredButtonProps>`
width: 50px;
height: 50px;
border: none;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
background-color: ${(props) => props.backgroundColor || '#0074d9'};
`;