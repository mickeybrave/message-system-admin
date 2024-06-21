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
        <nav className="mb-4">
          <Link to="/add" className="btn btn-primary me-2">Add Message</Link>
          <Link to="/update" className="btn btn-secondary me-2">Update Message</Link>
          <Link to="/delete" className="btn btn-danger me-2">Delete Message</Link>
          {/* Remove the "Back to Admin" button/link */}
        </nav>
        <Routes>
          <Route path="/add" element={<AddMessage />} />
          <Route path="/update" element={<UpdateMessage />} />
          <Route path="/delete" element={<DeleteMessage />} />
          <Route path="/" element={<MessageList />} exact />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
