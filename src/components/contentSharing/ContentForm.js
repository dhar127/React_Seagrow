import React, { useState } from "react";
import './ContentForm.css';

const ContentForm = ({ user, addContent, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    userId: user?.id || '',
    title: "",
    image: "",
    content: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userId) {
      console.error("User ID is missing");
      alert("User information is missing. Please try logging in again.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/contents", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.success) {
        console.log("Content added successfully:", data);
        addContent(data.content); // Update this line to use data.content
        onClose();
      } else {
        console.error("Failed to add content:", data);
        alert("Failed to add content. Please try again.");
      }
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Error adding content. Please try again.");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("Current form data:", formData); // Debugging log
  console.log("User props:", user); // Debugging log

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Your Content</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled // Make these fields read-only since they come from user data
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled // Make these fields read-only since they come from user data
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Content</button>
      </form>
    </div>
  );
};

export default ContentForm;