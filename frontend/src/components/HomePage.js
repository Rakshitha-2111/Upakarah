import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-heading">WELCOME TO UPAKARAH</h1>
      <p className="intro-text">
        Our mission is to provide timely support and resources to communities affected by disasters.
      </p>
      <p className="description">
        Whether it's a flood, earthquake, or any other natural calamity, we are here to help those in need. Join us in our efforts to make a difference.
      </p>
      <p className="call-to-action">
        Together, we can rebuild lives and restore hope. Explore the available resources or make a donation today!
      </p>
    </div>
  );
};

export default Home;
