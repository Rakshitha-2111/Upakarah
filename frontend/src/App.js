import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MessageBoard from './components/MessageBoard';
import ResourceDashboard from './components/ResourceDashboard';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MessageBoard" element={<MessageBoard />} />
          <Route path="/resources" element={<ResourceDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
