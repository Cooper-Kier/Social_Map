import React from 'react';
import './ImageWeb.css';

const ImageWeb = () => {
  // Sample data for the web structure
  const nodes = [
    { id: 1, x: 200, y: 200, image: 'https://picsum.photos/100/100?random=1' },
    { id: 2, x: 400, y: 200, image: 'https://picsum.photos/100/100?random=2' },
    { id: 3, x: 300, y: 300, image: 'https://picsum.photos/100/100?random=3' },
    { id: 4, x: 200, y: 400, image: 'https://picsum.photos/100/100?random=4' },
    { id: 5, x: 400, y: 400, image: 'https://picsum.photos/100/100?random=5' },
  ];

  // Connections between nodes
  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 1 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  return (
    <div className="image-web-container">
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
          <div
            key={node.id}
            className="node"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
            }}
          >
            <img src={node.image} alt={`Node ${node.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageWeb; 