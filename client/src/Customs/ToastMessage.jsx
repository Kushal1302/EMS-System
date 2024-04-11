import React from 'react';
import { toast } from 'react-hot-toast';

const ToastMessage = (message) => {
  const toastStyles = {
    position: 'relative',
    maxWidth: '20rem',
    width: '100%',
    backgroundColor: '#4CAF50',
    color: '#FFF',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyles = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#FFF',
    fontSize: '1rem',
    marginLeft: '1rem',
  };

  return (
    toast.custom((t) => (
      <div
        style={{
          ...toastStyles,
          animation: `${t.visible ? 'slideIn' : 'slideOut'} 0.3s ease-in-out forwards`,
        }}
      >
        <div>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{message}</p>
          <p style={{ fontSize: '0.875rem' }}>This is a stylish toast message. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={buttonStyles}
        >
          &#x2716;
        </button>
      </div>
    ))
  );
};

export default ToastMessage;
