import React from 'react';
import { ToastContainer } from 'react-toastify';

const NotificationSystem = ({ type }) => {
  const handleCloseToast = () => {
    if (type === 'error') {
      console.error('Notification dismissed');
    } else {
      console.log('Notification dismissed');
    }
  };

  return (
    <div>
      <button onClick={() => window.alert('This is an alert')}>Alert</button>
      <button onClick={() => window.confirm('Are you sure?')}>Confirm</button>
      <button onClick={() => window.prompt('What do you want to save?')}>Prompt</button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        onClose={handleCloseToast}
        toastClassName="custom-toast"
      />
    </div>
  );
};

export default NotificationSystem;