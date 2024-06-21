// MessageList.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Import axiosInstance
import { Link } from 'react-router-dom';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get('/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axiosInstance.delete(`/messages/${id}`);
        setMessages(messages.filter((message) => message.id !== id));
        alert('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('There was an error deleting the message. Please check the console for more details.');
      }
    }
  };

  return (
    <div>
      <h2>Message List</h2>     
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Code</th>
            <th>Greeting</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.countryCode}</td>
              <td>{message.greeting}</td>
              <td>{new Date(message.startDate).toLocaleString()}</td>
              <td>{message.endDate ? new Date(message.endDate).toLocaleString() : 'N/A'}</td>
              <td>
                <Link to={`/update/${message.id}`} className="btn btn-sm btn-info me-1">
                  Update
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(message.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add" className="btn btn-primary me-1">
          Add message
        </Link>
        <Link to="/GetMessage" className="btn btn-secondary me-1">
          Get message
        </Link>
    </div>
  );
};

export default MessageList;
