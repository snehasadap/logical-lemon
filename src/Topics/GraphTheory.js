import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  max-width: 1000px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-family: 'DM Mono', monospace;
  color: rgb(222, 156, 13);
`;

const Input = styled.textarea`
  width: 100px; /* Set a fixed width */
  height: 150px; /* Adjust height as needed */
  padding: 8px;
  font-weight: 600;
  margin: 0 auto; /* Center the input box */
  display: block; /* Ensure margin auto works */
  margin-bottom: 40px;
  margin-top: 20px;
  color: rgb(222, 156, 13);
  border: 3px solid rgb(222, 156, 13);
  background: none;
  outline: none;
  border-radius: 4px;
  font-family: 'DM Mono', monospace;

  ::placeholder {
    color: #f2f2f2;
    font-style: italic;
  }
`;

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  background-color: rgb(255, 239, 204);
  color: rgb(222, 156, 13);
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: 0 auto;
  display: block;

  &:focus {
    outline: none; /* Ensure focus outline is removed */
  }
  &:active {
    box-shadow: rgb(222, 156, 13);
    top: 5px;
    left: 5px;
  }
  &:hover {
    background-color: #fff;
  }

  @media (min-width: 768px) {
    padding: 0.25em 0.75em;
  }
`;

const GraphContainer = styled.div`
  margin-top: 20px;
  width: 100%; 
  height: auto;
`;

const GraphTheory = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [inputData, setInputData] = useState('');
  const graphRef = useRef();

  const handleGenerateGraph = () => {
    const lines = inputData.trim().split('\n');
    const nodesMap = new Map();
    const links = [];

    lines.forEach(line => {
      const vertices = line.split('-').map(item => item.trim());
      vertices.forEach(vertex => {
        if (vertex && !nodesMap.has(vertex)) {
          nodesMap.set(vertex, { id: vertex });
        }
      });

      if (vertices.length === 2) {
        links.push({ source: vertices[0], target: vertices[1] });
      }
    });

    const nodes = Array.from(nodesMap.values());
    setGraphData({ nodes, links });
  };

  useEffect(() => {
    d3.select(graphRef.current).selectAll('*').remove();

    if (graphData.nodes.length > 0) {
      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const initialWidth = 1000 - margin.left - margin.right;
      const initialHeight = 600 - margin.top - margin.bottom;

      const svg = d3.select(graphRef.current)
        .append('svg')
        .attr('width', initialWidth + margin.left + margin.right)
        .attr('height', initialHeight + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(150).strength(0.1)) // Increase distance
        .force('charge', d3.forceManyBody().strength(-100)) // Adjust repulsion strength
        .force('center', d3.forceCenter(initialWidth / 2, initialHeight / 2));

      const link = svg.selectAll('.link')
        .data(graphData.links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 2);

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      const nodeGroup = svg.selectAll('.node')
        .data(graphData.nodes)
        .enter().append('g')
        .attr('class', 'node')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      nodeGroup.append('rect')
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', d => colorScale(d.id))
        .attr('x', -25) 
        .attr('y', -25); 

      nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .text(d => d.id);

      simulation.on('tick', () => {
        link.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);

        const minX = d3.min(graphData.nodes, d => d.x);
        const maxX = d3.max(graphData.nodes, d => d.x);
        const minY = d3.min(graphData.nodes, d => d.y);
        const maxY = d3.max(graphData.nodes, d => d.y);

        const newWidth = maxX - minX + margin.left + margin.right;
        const newHeight = maxY - minY + margin.top + margin.bottom;

        d3.select(graphRef.current).select('svg')
          .attr('width', newWidth)
          .attr('height', newHeight);

        svg.attr('transform', `translate(${margin.left - minX},${margin.top - minY})`);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  }, [graphData];

  return (
    <Container>
      <Label>Vertices-Edges:</Label>
      <Input
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder={`eg: A - B\nB - C\nC - A`}
      />
      <Button onClick={handleGenerateGraph}>Enable Graph</Button>
      <GraphContainer ref={graphRef}></GraphContainer>
    </Container>
  );
};

export default GraphTheory;
