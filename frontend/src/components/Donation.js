import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageBoard.css';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages'); // Assuming existing endpoint
      setMessages(response.data.slice(0, 8)); // Show up to 8 most recent messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Function to handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/messages', { message: newMessage });
      setNewMessage(''); // Reset input field
      const updatedMessages = [{ message: newMessage, _id: Date.now() }, ...messages].slice(0, 8); // Add new to top, limit to 8
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error adding message:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="message-board-container">
      <h2>Share Your Support</h2>
      
      <div className="message-display">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          name="message"
          value={newMessage}
          onChange={handleChange}
          placeholder="Write your message of support here..."
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default MessageBoard;
