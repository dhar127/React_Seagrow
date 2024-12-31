import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentList from "./ContentList";
import './HomePage.css';

const MyContents = () => {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userId');

    if (!userData) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3001/fetchUserData/${userData}`)
      .then(response => response.json())
      .then(data => {
        setUser({
          id: data._id,
          name: data.userName,
          email: data.userEmail
        });
        fetchUserContents(data._id);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        navigate('/login');
      });
  }, [navigate]);

  const fetchUserContents = (userId) => {
  fetch(`http://localhost:3001/api/contents/user/${userId}`)
    .then(response => response.json())
    .then(data => setContents(data))
    .catch(error => console.error("Error fetching user contents:", error));
};

  const handleEdit = async (id, updatedContent) => {
    try {
      const response = await fetch(`http://localhost:3001/api/contents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedContent, userId: user.id }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return null;
      } else {
        setContents(contents.map(content => 
          content._id === id ? data.content : content
        ));
        return data;
      }
    } catch (error) {
      console.error("Error updating content:", error);
      return null;
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/contents/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setContents(contents.filter(content => content._id !== id));
        }
      })
      .catch(error => console.error("Error deleting content:", error));
  };

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <nav className="navbar">
        <h1>My Contents</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/content-sharing')}>Back to Content Sharing</button>
          <button onClick={() => navigate('/home')}>Back to Seagrow</button>
        </div>
      </nav>

      <div className="content-section">
        <div className="content-header">
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
        {filteredContents.length === 0 ? (
          <p>No matching content found.</p>
        ) : (
          <ContentList 
            contents={filteredContents}
            currentUserId={user.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isMyContents={true}
          />
        )}
      </div>
    </div>
  );
};

export default MyContents;