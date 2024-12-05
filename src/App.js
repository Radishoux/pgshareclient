import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Play from './Play';
import Craft from './Craft';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ConditionalRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalRoute() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasQueryParam = queryParams.has('i');

  return hasQueryParam ? <Play /> : <Craft />;
}

export default App;