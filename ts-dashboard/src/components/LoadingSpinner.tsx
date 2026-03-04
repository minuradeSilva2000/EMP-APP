import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: '2rem',
        height: '2rem',
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
    </div>
  );
};

export default LoadingSpinner;
