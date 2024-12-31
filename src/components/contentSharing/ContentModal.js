// src/components/ContentModal.js
import React from 'react';
import './HomePage.css';

const ContentModal = ({ content, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{content.title}</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <img src={content.image} alt={content.title} />
          <p>{content.content}</p>
          <div className="modal-info">
            <p>By: {content.name}</p>
            <p>Email: {content.email}</p>
            <p>Created: {new Date(content.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(content.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;