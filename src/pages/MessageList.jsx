// src/pages/MessageList.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get('/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('There was an error fetching the messages!', error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Message List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Code</th>
            <th>Greeting</th>
            <th>Start Date</th>
            <th>End Date</th>
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
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default MessageList;
