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
          <Route path="/" element={<Navigate to="/craft" />} />
          <Route path="/play" element={<Play />} />
          <Route path="/craft" element={<Craft />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;