import styled from 'styled-components';

export const StyledDropdown = styled.select`
  position: fixed;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 10px;
  background-color: yellow;

  &:focus {
    outline: none;
    border-color: #007bff; // or any other color
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .chart-opacity {
    opacity: 1.0; // Adjust the transparency here
  }
`;

export const DifficultyLabel = styled.label`
   position: absolute;
   top: 40%; // Center vertically
   left: 300px;
   transform: translateY(-50%); // Adjust for exact centering

   @media (max-width: 768px) {
     /* Adjust styles for smaller screens */
     top: 20%;
     left: 50%;
     transform: translateX(-50%);
   }
`;

export const TimeLabel = styled.label`
   position: absolute;
   bottom: 30px;
   left: 50%;
   transform: translateX(-50%); // Adjust for exact centering

   @media (max-width: 768px) {
     /* Adjust styles for smaller screens */
     bottom: 10px;
   }
`;

export const CustomTooltip = styled.div`
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black; // Adjust text color as needed
`;