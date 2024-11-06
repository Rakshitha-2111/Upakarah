import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ResourceDashboard.css';

const resources = [
  { id: 1, name: 'Food Supplies', description: 'Non-perishable food items.' },
  { id: 2, name: 'Medical Supplies', description: 'First aid kits, medicines.' },
  { id: 3, name: 'Shelter Materials', description: 'Tents, tarps, blankets.' },
  { id: 4, name: 'Water', description: 'Clean drinking water.' },
  { id: 5, name: 'Clothing', description: 'Warm clothing and footwear.' },
];

const ResourceDashboard = () => {
  const [contributeData, setContributeData] = useState({ name: '', location: '', phone: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => setContributeData({ ...contributeData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/resources/contribute', {
        resourceName: selectedResource.name,
        resourceDescription: selectedResource.description,
        contributorName: contributeData.name,
        contributorLocation: contributeData.location,
        contributorPhone: contributeData.phone,
      });

      setThankYouMessage(`Thank you, ${contributeData.name}! You'll be contacted shortly.`);
      setIsMessageVisible(true);
      setContributeData({ name: '', location: '', phone: '' });
      setShowForm(false);
      setSelectedResource(null);

      // Fade out the message after 3 seconds
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting contribution:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (showForm) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showForm]);

  return (
    <div className="resource-dashboard">
      <h2>Resources Needed During Disaster</h2>
      <div className="resources-container">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <button
              className="contribute-button"
              onClick={() => {
                setShowForm(true);
                setSelectedResource(resource);
              }}
            >
              Contribute
            </button>
            {showForm && selectedResource?.id === resource.id && (
              <form onSubmit={handleSubmit} className="contribute-form" ref={formRef}>
                <h4>Contribute to {selectedResource.name}</h4>
                <input type="text" name="name" placeholder="Your Name" value={contributeData.name} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Your Location" value={contributeData.location} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Your Phone Number" value={contributeData.phone} onChange={handleChange} required />
                <button type="submit" className="submit-button">Submit Contribution</button>
              </form>
            )}
          </div>
        ))}
      </div>
      {isMessageVisible && <p className="thank-you-message">{thankYouMessage}</p>}
    </div>
  );
};

export default ResourceDashboard;
