// SetOperationsPage.js

import React from 'react';
import SetOperations from '../Topics/SetOperations';
import styled from 'styled-components';
/*import '../sections/SetOperations.css'; */

const Header = styled.h2`
  color: rgb(62, 53, 141);
  font-family: 'DM Mono', monospace;
`;

const SetOperationsPage = () => {
  const handleCalculateUnion = (unionResult) => {
    // Handle any additional logic here if needed
  };

  
  return (
    <div>
      <Header>Set Operations</Header>
      <SetOperations onCalculateUnion={handleCalculateUnion} />
    </div>
  );
};

export default SetOperationsPage;
