import React, { useState, useEffect } from 'react';
import './ContentWeb.css';
import ImageNode from './ImageNode';

const ContentWeb = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);


  const createInitialNodes = () => {
    const centerNode = {
      id: 0,
      x: 600,
      y: 300,
      image: 'https://picsum.photos/100/100?random=1',
      neighbors: Array.from({ length: 48 }, (_, i) => i + 1) // Create 8 neighbors
    };
  
  // Function to calculate position for a node
  let numNodes = 1;
  let numNodesIdx = 1;
  let nodesMax = 5
  //Dictionary to store the constants connected to certain number 
  const distanceFactorDict = {
    1: 5, 2: 10, 3: 20, 4: 40, 5: 80, 6: 160, 7: 320, 8: 640, 9: 1280, 10: 2560, 11: 5120,
    12: 10240, 13: 20480, 14: 40960, 15: 81920, 16: 163840, 17: 327680, 18: 655360, 19: 1310720, 20: 2621440,
  };
  const calculateNodePosition = () => {
    
    // Add some randomness to the distance
    const randomDistanceFactor = 0.8 + Math.random() * 0.2; // Random factor between 0.95 and 1.05
    let distanceFactor = randomDistanceFactor * numNodesIdx;
    let angleShift = distanceFactorDict[numNodesIdx];
    let angle = (2 * Math.PI * numNodes)/angleShift + (numNodesIdx * randomDistanceFactor);
    console.log(numNodes);
    //Update node placement constants 
    numNodes++;
    if (numNodes > nodesMax){
      numNodesIdx++;
      nodesMax += distanceFactorDict[numNodesIdx];
    }

    //Return postion of new node
    return {
      x: centerNode.x + (200 * distanceFactor * Math.cos(angle)),
      y: centerNode.y + (200 * distanceFactor * Math.sin(angle))
    };
  };

    const neighborNodes = centerNode.neighbors.map((id, index) => {
      const position = calculateNodePosition(index, centerNode.neighbors.length);
      return {
        id,
        x: position.x,
        y: position.y,
        image: `https://picsum.photos/100/100?random=${id}`,
      };
    });

    return [centerNode, ...neighborNodes];
  };

  // Initialize nodes and connections
  useEffect(() => {
    const initialNodes = createInitialNodes();
    setNodes(initialNodes);

    // Create connections from center to all neighbors
    const initialConnections = initialNodes[0].neighbors.map(neighborId => ({
      from: 0,
      to: neighborId
    }));
    setConnections(initialConnections);
  }, []);

  return (
    <div className="content-web-container">
      <svg className="connections-layer">
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className="connection-line"
            />
          );
        })}
      </svg>
      <div className="nodes-layer">
        {nodes.map((node) => (
          <div key={node.id}>
            <ImageNode node={node} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentWeb; 