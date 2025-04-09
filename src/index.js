import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MoodCheck from './MoodCheck';
import MainMenu from './MainMenu';
import Breathing from './Breathing';
import Learning from './Learning';
import Progress from './Progress';
import Settings from './Settings';
import Forum from './Forum'; 

import './App.css';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoodCheck />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        {/* Якщо шлях не знайдено — переходимо в меню */}
        <Route path="*" element={<MainMenu />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// ✅ Активуємо Service Worker для роботи PWA
serviceWorkerRegistration.register();
