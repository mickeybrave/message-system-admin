// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddMessage from './pages/AddMessage';
import UpdateMessage from './pages/UpdateMessage';
import DeleteMessage from './pages/DeleteMessage';
import MessageList from './pages/MessageList';

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="mb-4">Message Administration</h1>
      
        <Routes>
          <Route path="/add" element={<AddMessage />} />
          <Route path="/update/:id" element={<UpdateMessage />} />
          <Route path="/delete/:id" element={<DeleteMessage />} />
          <Route path="/" element={<MessageList />} exact />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
