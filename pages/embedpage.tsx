import React from 'react';

const embedpage: React.FC = () => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Embedded HTML Project"
      />
    </div>
  );
};

export default embedpage;
