import React, { useState, useEffect } from 'react';
import './UsersWeb.css';
import ImageNode from './ImageNode';

const UsersWeb = () => {
  // Initial center node (current user)
  const [centerNode, setCenterNode] = useState({
    id: 1,
    x: 300,
    y: 300,
    image: 'https://picsum.photos/100/100?random=1',
    neighbors: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] // IDs of neighboring nodes
  });

  // State for all nodes including neighbors
  const [nodes, setNodes] = useState([centerNode]);
  const [connections, setConnections] = useState([]);
  
  // Base distance and growth factor
  const baseDistance = 150;
  const distanceGrowthFactor = 1.5;
  const nodesPerCircle = 8; // Number of nodes that complete a full circle before radius increases
  
  // Function to calculate position for a node
  const calculateNodePosition = (index, totalNodes) => {
    // Calculate which circle this node belongs to (0-based)
    const circleIndex = Math.floor(index / nodesPerCircle);
    
    // Calculate distance based on circle index
    const distance = baseDistance * Math.pow(distanceGrowthFactor, circleIndex);
    
    // Calculate position within the current circle (0 to nodesPerCircle-1)
    const positionInCircle = index % nodesPerCircle;
    
    // Calculate angle based on position in circle
    const baseAngle = (positionInCircle * 2 * Math.PI) / nodesPerCircle;
    
    // Add some randomness to the angle to make it less perfect
    const randomAngleOffset = (Math.random() - 0.5) * 0.3; // Random offset between -0.15 and 0.15 radians
    const angle = baseAngle + randomAngleOffset;
    
    // Add some randomness to the distance as well
    const randomDistanceFactor = 0.95 + Math.random() * 0.1; // Random factor between 0.95 and 1.05
    const finalDistance = distance * randomDistanceFactor;
    
    return {
      x: centerNode.x + finalDistance * Math.cos(angle),
      y: centerNode.y + finalDistance * Math.sin(angle)
    };
  };

  // Function to fetch neighboring nodes (placeholder for database integration)
  const fetchNeighborNodes = async (neighborIds) => {
    // This would be replaced with actual database calls
    return neighborIds.map((id, index) => {
      const position = calculateNodePosition(nodes.length + index, nodes.length + neighborIds.length);
      
      return {
        id,
        x: position.x,
        y: position.y,
        image: `https://picsum.photos/100/100?random=${id}`,
        neighbors: [] // These would be fetched from database
      };
    });
  };

  // Function to update connections based on current nodes
  const updateConnections = (currentNodes) => {
    const newConnections = [];
    currentNodes.forEach(node => {
      if (node.neighbors) {
        node.neighbors.forEach(neighborId => {
          const neighbor = currentNodes.find(n => n.id === neighborId);
          if (neighbor) {
            newConnections.push({
              from: node.id,
              to: neighborId
            });
          }
        });
      }
    });
    setConnections(newConnections);
  };

  // Load initial neighboring nodes
  useEffect(() => {
    const loadNeighbors = async () => {
      const neighborNodes = await fetchNeighborNodes(centerNode.neighbors);
      const allNodes = [centerNode, ...neighborNodes];
      setNodes(allNodes);
      updateConnections(allNodes);
    };
    loadNeighbors();
  }, []);

  return (
    <div className="users-web-container">
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

export default UsersWeb; 