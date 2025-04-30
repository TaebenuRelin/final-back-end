// App.jsx

import React from 'react';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div>
      <Sidebar />
      <div className="content">
        <h1>Main Content</h1>
        <p>This is the main content of the page.</p>
      </div>
    </div>
  );
};

export default App;
