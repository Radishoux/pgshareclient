import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Play from './Play';
import Craft from './Craft';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/Craft" />} />
          <Route path="/Play" element={<Play />} />
          <Route path="/Craft" element={<Craft />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;