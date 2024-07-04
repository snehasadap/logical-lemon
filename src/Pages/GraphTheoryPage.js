import React from 'react';
import GraphTheory from '../Topics/GraphTheory';
import styled from 'styled-components';

const Header = styled.h2`
  color: rgb(222, 156, 13);
  font-family: 'DM Mono', monospace;
`;

const GraphTheoryPage = () => {
  const handleSimplify = (simplifiedExpression) => {
    // Handle any additional logic here if needed
    console.log('Simplified Expression:', simplifiedExpression);
  };

  return (
    <div>
      <Header>Graph Analysis</Header>
      <GraphTheory onSimplify={handleSimplify} />
    </div>
  );
};

export default GraphTheoryPage;
