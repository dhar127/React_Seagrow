import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const NewsCard = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Only show cards that have an image URL
  if (!article.urlToImage) {
    return null;
  }

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      height: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        height: '200px', 
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        position: 'relative'
      }}>
        {!imageLoaded && !imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Loading...
          </div>
        )}
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageLoaded && !imageError ? 'block' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        {imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            No image available
          </div>
        )}
      </div>
      <div style={{ 
        padding: '15px', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'white'
      }}>
        <h3 style={{
          fontSize: '18px',
          margin: '0 0 10px 0',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.3'
        }}>
          {article.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#555',
          margin: '0 0 15px 0',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          flex: 1
        }}>
          {article.description}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: '#4b0082',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a020f0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4B0082'}
        >
          Read More
        </a>
      </div>
    </div>
  );
};

const News = () => {
  const [newsByCategory, setNewsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');

  const API_KEY = '38464e6865174e018a00b0da5ae38d7a';

  const categories = [
    { id: 'general', label: 'World News' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'health', label: 'Health' },
    { id: 'sports', label: 'Sports' },
    { id: 'science', label: 'Science' },
    { id: 'entertainment', label: 'Entertainment' }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category: activeCategory,
            apiKey: API_KEY,
            pageSize: 15
          }
        });

        // Quick filter for articles with image URLs
        const articlesWithImages = response.data.articles.filter(
          article => article.urlToImage && article.urlToImage.trim() !== ''
        );

        setNewsByCategory(prev => ({
          ...prev,
          [activeCategory]: articlesWithImages
        }));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    margin: '20px 0'
  };

  const buttonStyle = (isActive) => ({
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: isActive ? ' #4B0082' : '#E6E6FA',
    color: isActive ? 'white' : '#333',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={buttonStyle(activeCategory === category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading...
        </div>
      )}

      {error && (
        <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div style={gridStyle}>
          {newsByCategory[activeCategory]?.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
