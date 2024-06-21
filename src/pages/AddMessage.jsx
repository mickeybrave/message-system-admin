// src/pages/AddMessage.jsx
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AddMessage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [greeting, setGreeting] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      countryCode,
      greeting,
      startDate,
      endDate: endDate || null, // Set endDate to null if it's empty
    };

    try {
      await axiosInstance.post('/messages', message);
      alert('Message added successfully');
      navigate('/'); // Redirect to message list page
    } catch (error) {
      console.error('There was an error adding the message!', error);
      alert('There was an error adding the message. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Add Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Country Code</label>
          <input type="text" className="form-control" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Greeting</label>
          <input type="text" className="form-control" value={greeting} onChange={(e) => setGreeting(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="datetime-local" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input type="datetime-local" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Message</button>
        <Link to="/" className="btn btn-secondary ms-2">Back to Admin</Link>
      </form>
    </div>
  );
};

export default AddMessage;
