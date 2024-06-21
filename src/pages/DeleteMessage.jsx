// src/pages/DeleteMessage.jsx
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';

const DeleteMessage = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/messages/${id}`);
      alert('Message deleted successfully');
    } catch (error) {
      console.error('There was an error deleting the message!', error);
      alert('There was an error deleting the message. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Delete Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Message ID</label>
          <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-danger">Delete Message</button>
        <Link to="/" className="btn btn-secondary ms-2">Back to Admin</Link>
      </form>
    </div>
  );
};

export default DeleteMessage;
