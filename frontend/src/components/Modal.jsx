import React, { useState } from 'react';

const Modal = ({ isOpen, setIsOpen }) => {
  const [modalContent, setModalContent] = useState('');

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        {modalContent}
        <button onClick={handleCloseModal} aria-label="Close Modal">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;