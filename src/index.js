import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MoodCheck from './MoodCheck';
import MainMenu from './MainMenu';
import Learning from './Learning';
import Breathing from './Breathing';
import Progress from './Progress';
import Settings from './Settings';
import './App.css';
import Forum from './Forum'; // імпортуємо сторінку форуму

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MoodCheck />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forum" element={<Forum />} /> {/* ✅ Доданий маршрут */}
        <Route path="*" element={<MainMenu />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
