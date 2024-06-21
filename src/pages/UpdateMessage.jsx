// UpdateMessage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Import axiosInstance
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState('');
  const [greeting, setGreeting] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get(`/messages/GetById/${id}`);
        const message = response.data;

        // Populate state with fetched message data
        setCountryCode(message.countryCode);
        setGreeting(message.greeting);
        setStartDate(new Date(message.startDate).toISOString().slice(0, 16));
        setEndDate(message.endDate ? new Date(message.endDate).toISOString().slice(0, 16) : '');
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, [id]); // Fetch message data when id changes or component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMessage = { countryCode, greeting, startDate, endDate, id };

    try {
      await axiosInstance.put(`/messages/${id}`, updatedMessage);
      alert('Message updated successfully');
      navigate('/'); // Redirect back to message list after update
    } catch (error) {
      console.error('Error updating message:', error);
      alert('There was an error updating the message. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2>Update Message</h2>
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
          <label htmlFor="greeting" className="form-label">Greeting</label>
          <textarea
            className="form-control"
            id="greeting"
            rows="3"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date (Optional)</label>
          <input
            type="datetime-local"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Message</button>
        <Link to="/" className="btn btn-secondary ms-2">Back to Admin</Link>
      </form>
    </div>
  );
};

export default UpdateMessage;
