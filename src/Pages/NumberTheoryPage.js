// NumberTheoryPage.js

import React from 'react';
import NumberTheory from '../Topics/NumberTheory';
import styled from 'styled-components';

const Header = styled.h2`
  color: rgb(59, 165, 84);
  font-family: 'DM Mono', monospace; /* Example font */
`;

const NumberTheoryPage = () => {
  const handleCalculateGCD = (gcdResult) => {
    // Handle any additional logic here if needed
    console.log('GCD:', gcdResult);
  };

  return (
    <div>
      <Header>Euclid's Algorithm</Header>
      <NumberTheory onCalculateGCD={handleCalculateGCD} />
    </div>
  );
};

export default NumberTheoryPage;
