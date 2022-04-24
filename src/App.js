import React from 'react';
import Home from './pages/home.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Home />
      <div id="portal-root" className="portal-container hidden"></div>
    </div>
  );
}

export default App;
