// MessageByCodeAndDate.jsx

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';

const MessageByCodeAndDate = () => {
  const [countryCode, setCountryCode] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(`/messages/${countryCode}?date=${date}`);
      setMessage(response.data);
      setError(null);
    } catch (error) {
        if (error.response && error.response.status && error.response.status==404) {
            setWarning("No data found by your request. Make sure that you use valid input values")
            return;
        }
      setMessage(null);
      setError('Error fetching message. Please check the input values and try again.');
      console.error('Error fetching message:', error);
    }
  };

  return (
    <div>
      <h2>Get Message by Country Code and Date</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="countryCode" className="form-label">Country Code</label>
          <input
            type="text"
            className="form-control"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary ms-2">Get Message</button>
        <Link to="/" className="btn btn-secondary ms-2">Back to Admin</Link>
      </form>

      {message && (
        <div className="mt-4">
          <h4>Message:</h4>
          <p>{message.greeting}</p>
        </div>
      )}

    {warning && (
        <div className="mt-4 alert alert-warning" role="alert">
          {warning}
        </div>
      )}

      {error && (
        <div className="mt-4 alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default MessageByCodeAndDate;
