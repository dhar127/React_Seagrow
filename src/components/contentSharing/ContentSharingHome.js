// ContentSharingHome.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentList from "./ContentList";
import ContentForm from "./ContentForm";
import './HomePage.css';

const ContentSharingHome = () => {
  const [contents, setContents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userId');
    if (!userData) {
      navigate('/login');
      return;
    }

    // Fetch user details
    fetch(`http://localhost:3001/fetchUserData/${userData}`)
      .then(response => response.json())
      .then(data => {
        setUser({
          id: data._id,
          name: data.userName,
          email: data.userEmail
        });
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        navigate('/login');
      });

    fetchContents();
  }, [navigate]);

  const fetchContents = () => {
    fetch("http://localhost:3001/api/contents")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setContents(data);
        } else {
          console.error("Received non-array data:", data);
          setContents([]);
        }
      })
      .catch(error => {
        console.error("Error fetching contents:", error);
        setContents([]);
      });
  };

  const handleEdit = (id, updatedContent) => {
    if (!user) return;

    fetch(`http://localhost:3001/api/contents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updatedContent, userId: user.id }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setContents(contents.map(content => 
            content._id === id ? { ...content, ...data } : content
          ));
        }
      })
      .catch(error => console.error("Error updating content:", error));
  };

  const handleDelete = (id) => {
    if (!user) return;
  
    fetch(`http://localhost:3001/api/contents/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setContents(contents.filter(content => content._id !== id));
          alert('Content deleted successfully');
        }
      })
      .catch(error => {
        console.error("Error deleting content:", error);
        alert('Failed to delete content. Please try again.');
      });
  };
  const addContent = (newContent) => {
    // Check if newContent has the content property
    const contentToAdd = newContent.content || newContent;
    setContents(prevContents => [contentToAdd, ...prevContents]);
    setShowForm(false);
    // Refresh the contents list
    fetchContents();
  };

  // Safe filtering with null checks
  const filteredContents = contents.filter(content => {
    if (!content || !content.title) return false;
    return content.title.toLowerCase().includes((searchTerm || '').toLowerCase());
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <nav className="navbar">
        <h1>{showForm ? "Share Your Content" : "Content Sharing Platform"}</h1>
        <div className="nav-items">
          <button onClick={() => navigate('/my-contents')}>My Contents</button>
          {showForm ? (
            <button onClick={() => setShowForm(false)}>Home</button>
          ) : (
            <button onClick={() => setShowForm(true)} className="share-button">
              Share Content
            </button>
          )}
          <button onClick={() => navigate('/home')}>Back to Seagrow</button>
        </div>
      </nav>

      <div className="content-section">
        {showForm ? (
          <ContentForm 
            user={user}
            addContent={addContent} 
            onClose={() => setShowForm(false)} 
          />
        ) : (
          <>
            <div className="content-header">
              <h2>Recent Shares</h2>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            {filteredContents.length > 0 ? (
              <ContentList 
                contents={filteredContents}
                currentUserId={user.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isMyContents={false}
              />
            ) : (
              <p>No contents available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentSharingHome;