import React from 'react';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          GraphPulse - Workflow Builder
        </h1>
      </header>
      <main>
        <Canvas />
      </main>
    </div >
  );
}

export default App;
