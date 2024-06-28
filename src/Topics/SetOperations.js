import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';



const Container = styled.div`
  margin: 20px;
  padding: 20px;
  padding-bottom: 100px;
  /*border: 1px solid #ddd; */
  border-radius: 8px;
  max-width: 600px;
  align-items: center;
  margin-bottom: 100px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-family: 'DM Mono', monospace;
  color: rgb(62, 53, 141)
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 50px;
  border: 3px solid rgb(62, 53, 141);
  border-radius: 4px;
  font-family: 'DM Mono', monospace;
  background: none;
  font-weight: 600;
  color: rgb(62, 53, 141);
  outline: none;
  ::placeholder {
    color: #999; 
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

const OperationButton = styled.button`
  font-family: 'DM Mono', monospace;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  background-color: rgb(213, 211, 238);
  color: rgb(62, 53, 141);
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
  }
  &:hover {
    background-color: rgb(233, 233, 240);
  }

  @media (min-width: 768px) {
    padding: 0.25em 0.75em;
  }

  

`;

const Result = styled.p`
  margin-top: 50px;
  font-weight: bold;
  font-family: 'DM Mono', monospace;
  color: rgb(62, 53, 141);
  margin-bottom: 10px;
  font-size: 20px;

`;

const ResultContainer = styled.div`
  margin-bottom: 10px; 
`;

const SetOperations = ({ onCalculateUnion }) => {
  const [set1, setSet1] = useState('');
  const [set2, setSet2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [cardinality, setCardinality] = useState(0);

  const parseSetInput = (inputString) => {
    return inputString.split(',').map(item => item.trim()).filter(item => item !== '');
  };

  const formatCartesianProduct = (data) => {
    return data.map(pair => `(${pair.join(', ')})`).join(', ');
  };

  const handleCalculate = async () => {
    const parsedSet1 = parseSetInput(set1);
    const parsedSet2 = parseSetInput(set2);

    let expression;
    switch (operation) {
      case 'union':
        expression = `setUnion([${parsedSet1}], [${parsedSet2}])`;
        break;
      case 'intersection':
        expression = `setIntersect([${parsedSet1}], [${parsedSet2}])`;
        break;
      case 'minus':
        expression = `setDifference([${parsedSet1}], [${parsedSet2}])`;
        break;
      case 'minus2':
        expression = `setDifference([${parsedSet2}], [${parsedSet1}])`;
        break;
      case 'symmetric-difference':
        expression = `setSymDifference([${parsedSet1}], [${parsedSet2}])`;
        break;
      case 'cartesian-product':
        expression = `setCartesian([${parsedSet1}], [${parsedSet2}])`;
        break;
      default:
        expression = 'Unknown operation';
    }

    try {
      const response = await axios.get(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`);
      let resultData = response.data;

      if (operation === 'cartesian-product') {
        resultData = formatCartesianProduct(resultData);
      } else if (Array.isArray(resultData)) {
        resultData = resultData.join(', ');
      }

      setResult(resultData.toString());
      setCardinality(Array.isArray(response.data) ? response.data.length : 0);
      onCalculateUnion(resultData); // Notify parent component if needed
    } catch (error) {
      console.error(`Error calculating ${operation}:`, error);
    }
  };

  const handleOperationClick = (op) => {
    setOperation(op);
  };

  const handleInputChange = (e, setInput) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9,\s]/g, ''); 
    setInput(validValue);
  };

  useEffect(() => {
    if (operation) {
      handleCalculate();
    }
  }, [operation, set1, set2]);

  const operations = [
    { value: 'union', label: 'A ∪ B' },
    { value: 'intersection', label: 'B ∩ A' },
    { value: 'minus', label: 'A − B' },
    { value: 'minus2', label: 'B − A'},
    { value: 'symmetric-difference', label: 'A △ B' },
    { value: 'cartesian-product', label: 'A × B' },
    
  ];

  return (
    <Container>
      <Label>Set A (comma-separated):</Label>
      <Input
        type="text"
        value={set1}
        onChange={(e) => handleInputChange(e, setSet1)}
        placeholder="Ex: 1, 2, 3, 4..."
      />
      <Label>Set B (comma-separated):</Label>
      <Input
        type="text"
        value={set2}
        onChange={(e) => handleInputChange(e, setSet2)}
        placeholder="Ex: 5, 6, 7, 8..."
      />
      
      <ButtonContainer>
        {operations.map(op => (
          <OperationButton
            key={op.value}
            selected={operation === op.value}
            onClick={() => handleOperationClick(op.value)}
          >
            {op.label}
          </OperationButton>
        ))}
      </ButtonContainer>
      
      {result && (
        <ResultContainer>
          <Result>
            {result}
          </Result>
          <Result>
            Cardinality: {cardinality}
          </Result>
        </ResultContainer>
      )}
    </Container>
  );
};

export default SetOperations;



