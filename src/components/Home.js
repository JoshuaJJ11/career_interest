import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Rankaroo</h1>
        <p className="hero-subtitle">
          Create categories and rank your favorite items
        </p>
      </div>

      <div className="features-section">
        <h2 className="section-title">MVP Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Create Category</h3>
            <p className="feature-description">
              Organize different types of items or content into categories that match your interests.
              Create categories for movies, books, songs, food, and more.
            </p>
            <Link to="/create-category" className="feature-button">
              Try It Out
            </Link>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Rank Items</h3>
            <p className="feature-description">
              Add items to your categories and assign rankings. Compare and assess
              the quality or relevance of items within a specific category.
            </p>
            <Link to="/rank-items" className="feature-button">
              Try It Out
            </Link>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create a Category</h3>
            <p>Name your category, add a description, and select a type (Movies, Songs, Books, etc.)</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Items</h3>
            <p>Search for or manually add items to your category</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Rank & Compare</h3>
            <p>Assign rankings to items and see them sorted automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

