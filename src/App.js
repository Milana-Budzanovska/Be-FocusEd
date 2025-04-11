import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodCheck from './MoodCheck';
import MainMenu from './MainMenu';
import Learning from './Learning';
import Breathing from './Breathing';
import Progress from './Progress';
import Settings from './Settings';
import Forum from './Forum';

function App() {
  const appStyle = {
    fontFamily: 'Nunito, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #d8f3ff, #f3d8ff)',
    padding: '2rem',
    boxSizing: 'border-box',
    margin: 0,
  };

  return (
    <div className="App" style={appStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<MoodCheck />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
