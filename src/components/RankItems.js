import React, { useState } from 'react';
import './RankItems.css';

function RankItems() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'The Shining', ranking: 10 },
    { id: 2, name: 'Get Out', ranking: 9 },
    { id: 3, name: 'Hereditary', ranking: 8 },
    { id: 4, name: 'The Conjuring', ranking: 7 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemRanking, setNewItemRanking] = useState(5);

  const categories = [
    'Top 10 Horror Movies',
    'Best 90s Movies',
    'Top Workout Songs',
    'Favorite Books',
    'Best Restaurants'
  ];

  const handleAddItem = (e) => {
    e.preventDefault();
    // This is just UI - no actual functionality needed
    alert('Add item feature coming soon! This is the MVP UI preview.');
  };

  const handleRankingChange = (itemId, newRanking) => {
    // This is just UI - no actual functionality needed
    alert('Ranking update feature coming soon! This is the MVP UI preview.');
  };

  const sortedItems = [...items].sort((a, b) => b.ranking - a.ranking);

  return (
    <div className="rank-items">
      <div className="page-header">
        <h1>Rank Items</h1>
        <p>Add items to categories and assign rankings</p>
      </div>

      <div className="rank-container">
        <div className="category-selection">
          <h2>Select Category</h2>
          <div className="category-list">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="selected-category-info">
              <h3>Selected: {selectedCategory}</h3>
            </div>
          )}
        </div>

        <div className="items-section">
          <div className="add-item-section">
            <h2>Add New Item</h2>
            <form onSubmit={handleAddItem} className="add-item-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Item name (e.g., movie, song, book)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="item-input"
                  required
                />
                <div className="ranking-input-group">
                  <label>Ranking:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newItemRanking}
                    onChange={(e) => setNewItemRanking(parseInt(e.target.value))}
                    className="ranking-input"
                  />
                  <span className="ranking-scale">/10</span>
                </div>
                <button type="submit" className="btn-add">
                  Add Item
                </button>
              </div>
            </form>
          </div>

          <div className="ranked-items-section">
            <h2>Ranked Items</h2>
            {selectedCategory ? (
              <div className="items-list">
                {sortedItems.map((item, index) => (
                  <div key={item.id} className="item-card">
                    <div className="item-rank-badge">
                      #{index + 1}
                    </div>
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-ranking">
                        <div className="ranking-display">
                          <span className="ranking-value">{item.ranking}</span>
                          <span className="ranking-max">/10</span>
                        </div>
                        <div className="ranking-stars">
                          {[...Array(10)].map((_, i) => (
                            <span
                              key={i}
                              className={`star ${i < item.ranking ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleRankingChange(item.id, item.ranking)}
                      >
                        Edit Ranking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Please select a category to view and rank items</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankItems;

