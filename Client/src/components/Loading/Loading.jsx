import React from 'react';
import LoadingGif from '../../assets/loading.gif';

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white', 
      }}
    >
      <img src={LoadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;





