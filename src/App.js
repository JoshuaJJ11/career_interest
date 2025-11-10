import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateCategory from './components/CreateCategory';
import RankItems from './components/RankItems';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Rankaroo
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/create-category" className="nav-link">Create Category</Link>
              <Link to="/rank-items" className="nav-link">Rank Items</Link>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/rank-items" element={<RankItems />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

