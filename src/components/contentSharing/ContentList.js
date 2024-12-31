import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

const ContentList = ({ contents, onDelete, onEdit, isMyContents }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    title: "",
    image: "",
    content: "",
    description: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };
  
  const handleReadMore = (content) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  const handleEdit = (content) => {
    setEditingId(content._id);
    setEditFormData({
      name: content.name,
      email: content.email,
      title: content.title,
      image: content.image,
      content: content.content,
      description: content.description,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedContent = await onEdit(editingId, editFormData);
      
      if (updatedContent && updatedContent.content) {
        setSelectedContent(updatedContent.content);
      } else if (updatedContent) {
        setSelectedContent(updatedContent);
      }
      
      setEditingId(null);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleDelete = (id) => {
    onDelete(id);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContent(null);
    setEditingId(null);
  };

  if (contents.length === 0) {
    return <p>No contents available. Add some content to get started!</p>;
  }

  return (
    <div className="align">
      {contents.map((content) => (
        <div key={content._id} className="content-card">
          <h2>{content.title}</h2>
          <img src={content.image} alt={content.title} />
          <p className="description">{content.description}</p>
          <button
            className="read-more-button"
            onClick={() => handleReadMore(content)}
          >
            Read More
          </button>
        </div>
      ))}
      
      {showModal && selectedContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="full-content" onClick={(e) => e.stopPropagation()}>
            {editingId === selectedContent._id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditChange}
                  required
                />
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  required
                />
                <textarea
                  name="content"
                  value={editFormData.content}
                  onChange={handleEditChange}
                  required
                />
                <div className="button-group">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <button className="close-button" onClick={closeModal}>
                  <X size={16} />
                </button>
                <h2>{selectedContent.title}</h2>
                <img src={selectedContent.image} alt={selectedContent.title} />
                <p>{selectedContent.content}</p>
                <div className="content-info">
                  <div className="author-info">
                    <p><strong>Author:</strong> {selectedContent.name}</p>
                    <p><strong>Email-id:</strong> {selectedContent.email}</p>
                  </div>
                  <div className="timestamp-info">
                    <p>Created: {formatDate(selectedContent.createdAt)}</p>
                    <p>Last Updated: {formatDate(selectedContent.updatedAt)}</p>
                  </div>
                </div>
                {isMyContents && (
                  <div className="button-group">
                    <button onClick={() => handleEdit(selectedContent)}>
                      <Pencil size={16} className="button-icon" />
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(selectedContent._id)}
                    >
                      <Trash2 size={16} className="button-icon" />
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentList;