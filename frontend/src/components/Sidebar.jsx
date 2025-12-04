import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <h2>User Profile</h2>
      <div className="profile">
        <img src="/user.jpg" alt="Profile Picture" />
        <h3>Name: John Doe</h3>
        <p>Email: john.doe@example.com</p>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;