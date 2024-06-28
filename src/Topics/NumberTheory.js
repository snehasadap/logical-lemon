import React, { useState } from 'react';
/*import '../sections/NumberTheory.css'; // Import your CSS file */

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Silkscreen&display=swap");
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  /*border: 1px solid #ccc; 
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-family: 'DM Mono', monospace;
  font-size: 30px;
  font-weight: bold;
  color: rgb(59, 165, 84);
  margin: 0 5px;
`;

const Input = styled.input`
  border-radius: 20px;
  border: 3px solid rgb(59, 165, 84);
  padding: 8px;
  background: none;
  margin: 0 5px;
  padding: 8px;
  font-size: 1rem;
  width: 60px;
  font-family: 'DM Mono', monospace;
  outline: none;
  font-weight: 600;
  color: rgb(59, 165, 84);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: rgb(233, 247, 236);
  border: 2px solid rgb(59, 165, 84);
  border-radius: 30px;
  box-shadow: rgb(59, 165, 84) 4px 4px 0 0;
  color: rgb(59, 165, 84);
  cursor: pointer;
  display: inline-block;
  font-family: 'DM Mono', monospace;
  font-weight: 600;
  font-size: 16px;
  padding: 0 8px;
  line-height: 35px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 10px;
  margin-top: 0px;

  &:hover {
    background-color: #fff;
  }

  &:active {
    box-shadow: rgb(59, 165, 84) 2px 2px 0 0;
    transform: translate(2px, 2px);
  }

  @media (min-width: 768px) {
    min-width: 120px;
    padding: 0 25px;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  color: rgb(59, 165, 84);
  font-family: 'DM Mono', monospace;
  font-size: 20px;

`;

const StepsContainer = styled.div`
  margin-top: 20px;
  font-family: 'DM Mono', monospace;
  color: rgb(59, 165, 84);

`;

const ExtendedStepsContainer = styled.div`
  margin-top: 20px;
  font-family: 'DM Mono', monospace;
  color: rgb(194, 131, 199);
`;

const ExtendedStepsSolution = styled.label`
  font-family: 'DM Mono', monospace;
  font-size: 25px;
  font-weight: bold;
  color: rgb(194, 131, 199);
  margin: 0 5px;
  padding: 120px;

`;

const StepsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Step = styled.li`
  margin: 5px 0;
`;


const NumberTheory = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [gcdResult, setGcdResult] = useState('');
  const [steps, setSteps] = useState([]);
  const [extendedSteps, setExtendedSteps] = useState([]);
  const [coefficients, setCoefficients] = useState({ x: 0, y: 0 });

  const calculateGcd = () => {
    const steps = [];
    const extendedSteps = [];
    const gcd = (a, b) => {
      a = Math.abs(a); // Ensure a is non-negative
      b = Math.abs(b);

      while (b !== 0) {
        const remainder = a % b;
        steps.push(`${a} = ${b} * ${Math.floor(a / b)} + ${remainder}`);
        a = b;
        b = remainder;
      }
      return a;
    };

    const extendedGcd = (a, b) => {
      if (b === 0) {
        return [a, 1, 0];
      }
      const [gcdValue, x1, y1] = extendedGcd(b, a % b); 
      const x = y1;
      const y = x1 - Math.floor(a / b) * y1;
      extendedSteps.push(`${gcdValue} = ${a} * ${x} + ${b} * ${y}`);
      return [gcdValue, x, y];
    };

    const num1 = parseInt(number1);
    const num2 = parseInt(number2);

    const resultGcd = gcd(num1, num2); 
    const [gcdValue, x, y] = extendedGcd(num1, num2); 

    setGcdResult(resultGcd.toString()); 
    setSteps(steps); 
    setExtendedSteps(extendedSteps); 
    setCoefficients({ x, y }); 
  };

  return (
    <Container>
    <GlobalStyle />
    <InputContainer>
      <Label>GCD(</Label>
      <Input
        type="number"
        value={number1}
        onChange={(e) => setNumber1(e.target.value)}
      />
      <Label>,</Label>
      <Input
        type="number"
        value={number2}
        onChange={(e) => setNumber2(e.target.value)}
      />
      <Label>)</Label>
      <Button onClick={calculateGcd}>Calculate GCD</Button>
    </InputContainer>

    {gcdResult && (
      <ResultContainer>
        <Label>GCD: {gcdResult}</Label>
        <StepsContainer>
          <h3>Steps:</h3>
          <StepsList>
            {steps.map((step, index) => (
              <Step key={index}>{step}</Step>
            ))}
          </StepsList>
        </StepsContainer>
        <ExtendedStepsContainer>
          <h3>ax + by = GCD(a, b):</h3>
          <StepsList>
            {extendedSteps.map((step, index) => (
              <Step key={index}>{step}</Step>
            ))}
          </StepsList>
        </ExtendedStepsContainer>
        <ExtendedStepsSolution>
          Solution: {number1} * ({coefficients.x}) + {number2} * ({coefficients.y}) = {gcdResult}
        </ExtendedStepsSolution>
      </ResultContainer>
    )}
  </Container>
);
};
export default NumberTheory;


