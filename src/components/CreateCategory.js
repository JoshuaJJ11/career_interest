import React, { useState } from 'react';
import './CreateCategory.css';

function CreateCategory() {
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
    categoryType: ''
  });

  const categoryTypes = [
    'Movies',
    'Songs',
    'Books',
    'Food',
    'Games',
    'TV Shows',
    'Places',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is just UI - no actual functionality needed
    alert('Category creation feature coming soon! This is the MVP UI preview.');
  };

  return (
    <div className="create-category">
      <div className="page-header">
        <h1>Create a Category</h1>
        <p>Organize your favorite items into categories</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="categoryName">
              Category Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="e.g., Top 10 Horror Movies"
              className="form-input"
              required
            />
            <small className="form-hint">
              Give your category a descriptive name
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Category Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., A list of must-watch horror films from the 2000s"
              className="form-textarea"
              rows="4"
            />
            <small className="form-hint">
              Briefly explain what items belong in this category
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="categoryType">
              Category Type <span className="required">*</span>
            </label>
            <select
              id="categoryType"
              name="categoryType"
              value={formData.categoryType}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select a type...</option>
              {categoryTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <small className="form-hint">
              Choose the type of items this category will contain
            </small>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Category
            </button>
          </div>
        </form>

        <div className="preview-section">
          <h3>Preview</h3>
          <div className="preview-card">
            <div className="preview-header">
              <h4>{formData.categoryName || 'Category Name'}</h4>
              {formData.categoryType && (
                <span className="preview-badge">{formData.categoryType}</span>
              )}
            </div>
            <p className="preview-description">
              {formData.description || 'Category description will appear here...'}
            </p>
            <div className="preview-footer">
              <span className="preview-info">0 items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;

