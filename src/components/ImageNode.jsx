import React from 'react';
import './ImageNode.css';

const ImageNode = ({ node }) => {
  return (
    <div
      className="node"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
      }}
    >
      <img src={node.image} alt={`Node ${node.id}`} />
    </div>
  );
};

export default ImageNode;
