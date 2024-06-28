import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import GraphTheoryPage from './Pages/GraphTheoryPage';
import NumberTheoryPage from './Pages/NumberTheoryPage';
import SetOperationsPage from './Pages/SetOperationsPage';
import './App.css'; 


const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet");
  @import url(https://fonts.googleapis.com/css2?family=DM+Mono&display=swap" rel="stylesheet);

  body {
    height: 100%;
    margin: 0;
    /* font-family: Arial, Helvetica, sans-serif; 
    background-color: #fffff4; /* Optional: Set background color for the entire body */
  }

  .silkscreen-regular {
    font-family: "Silkscreen, sans-serif";
    font-weight: 400;
    font-style: normal;
  }
  
  .dm-mono-regular {
    font-family: "DM Mono", monospace;
    font-weight: 400;
    font-style: normal;
  }

`;

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  align-items: center; /* Center items horizontally */
  background-color: #fffff4;
  min-height: 100vh; 
  overflow-y: auto;
  padding-top: 80px;
`;

const Header1 = styled.h1`
  font-family: Silkscreen, sans-serif;
  font-size: 4rem;
  margin-bottom: 40px;
  margin-top: 40px;
  span {
    &:first-child {
      color: #9470CE;
    }
    &:last-child {
      color: #F4E064;
    }
  }
`;

const Header2 = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 40px;
  font-family: "DM Mono", monospace;
  color: #A7A1FF;
`;

const NavDiv = styled.div`
  margin: 0 10px; /* Add more space between each button */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
`;


const ButtonLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  font-family: font-family: "DM Mono", monospace;
  text-transform: uppercase;

  &.btn:hover .btn-slide-show-text1 {
    margin-left: 65px;
  }

  &.btn-layered-3d > ::before {
    box-sizing: border-box;
  }

  &.btn-layered-3d {
    width: 240px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0px;
    vertical-align: middle;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: 600;
    text-transform: uppercase;
    padding: 1.15em 2em;
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 0.15s ease-out 0s, background 0.15s ease-out 0s;
  }

  &.btn-layered-3d::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    inset: 0px;
    border-radius: inherit;
    transform: translate3d(0px, 0.75em, -1em);
    transition: transform 0.15s ease-out 0s, box-shadow 0.15s ease-out 0s;
  }

  &.btn-layered-3d:hover {
    transform: translateY(0.25em);
  }

  &.btn-layered-3d:hover::before {
    transform: translate3d(0px, 0.5em, -1em);
  }

  &.btn-layered-3d--orange {
    color: rgb(222, 156, 13);
    background: rgb(255, 239, 204);
    border: 2px solid rgb(222, 156, 13);
  }

  &.btn-layered-3d--orange::before {
    background: rgb(255, 215, 128);
    box-shadow: rgb(222, 156, 13) 0px 0px 0px 2px, rgb(255, 239, 204) 0px 0.625em 0px 0px;
  }

  &.btn-layered-3d--green {
    color: rgb(59, 165, 84);
    background: rgb(233, 247, 236);
    border: 2px solid rgb(59, 165, 84);
  }
  
  &.btn-layered-3d--green::before {
    background: rgb(158, 220, 172);
    box-shadow: rgb(59, 165, 84) 0px 0px 0px 2px, rgb(233, 247, 236) 0px 0.625em 0px 0px;
  }

  &.btn-layered-3d--purple {
    color: rgb(62, 53, 141);
    background: rgb(213, 211, 238);
    border: 2px solid rgb(62, 53, 141);
  }
  
  &.btn-layered-3d--purple::before {
    background: rgb(144, 137, 210);
    box-shadow: rgb(62, 53, 141) 0px 0px 0px 2px, rgb(213, 211, 238) 0px 0.625em 0px 0px;
  }
`;

const RoutesContainer = styled.div`
  margin-top: 40px; /* Adjust this value as needed */
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppContainer>
        <Header1>
          <span>Logical </span>
          <span>Lemon</span>
        </Header1>
          <Header2>Please select a topic to get started</Header2>
          <Nav>
            <NavDiv>
              <ButtonLink to="/graph-theory">
                <Button className="btn btn-layered-3d btn-layered-3d--orange">Graph Analysis</Button>
              </ButtonLink>
            </NavDiv>
            <NavDiv>
              <ButtonLink to="/number-theory">
                <Button className="btn btn-layered-3d btn-layered-3d--green">Euclid's Algorithm</Button>
              </ButtonLink>
            </NavDiv>
            <NavDiv>
              <ButtonLink to="/set-operations">
                <Button className="btn btn-layered-3d btn-layered-3d--purple">Set Operations</Button>
              </ButtonLink>
            </NavDiv>
          </Nav>

          <RoutesContainer>
            <Routes>
              <Route path="/graph-theory" element={<GraphTheoryPage />} />
              <Route path="/number-theory" element={<NumberTheoryPage />} />
              <Route path="/set-operations" element={<SetOperationsPage />} />
            </Routes>
          </RoutesContainer>
        </AppContainer>
      </Router>
    </>
  );
}

export default App;