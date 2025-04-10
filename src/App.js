import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodCheck from './MoodCheck';
import MainMenu from './MainMenu';
import Learning from './Learning';
import Breathing from './Breathing';
import Progress from './Progress';
import Settings from './Settings';
import Forum from './Forum';
import './App.css'; // обов’язкове підключення стилів

function App() {
  return (
    <div className="App">
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
