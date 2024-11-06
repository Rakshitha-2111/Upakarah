import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageBoard.css';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });
  const [visibleMessages, setVisibleMessages] = useState(8); // Default message count

  useEffect(() => {
    fetchMessages();
    handleResize(); // Calculate the initial number of visible messages
    window.addEventListener('resize', handleResize); // Update on resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Adjust the number of visible messages based on viewport height
  const handleResize = () => {
    const maxMessages = Math.floor(window.innerHeight / 150); // 150px per message
    setVisibleMessages(maxMessages);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/messages', newMessage);
      setNewMessage({ name: '', message: '' });
      fetchMessages();
    } catch (error) {
      console.error("Error adding message:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="message-board-container">
      <h2>Messages of Support</h2>

      <div className="message-display">
        {messages.slice(0, visibleMessages).map((msg, index) => (
          <div key={index} className="message">
            <p className="message-text">"{msg.message}"</p>
            <p className="message-author">- {msg.name}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          name="name"
          value={newMessage.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <textarea
          name="message"
          value={newMessage.message}
          onChange={handleChange}
          placeholder="Share your message..."
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default MessageBoard;
