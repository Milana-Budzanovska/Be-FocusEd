// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodCheck from './MoodCheck';
import MainMenu from './MainMenu';
import Learning from './Learning';
import Breathing from './Breathing';
import Progress from './Progress';
import Settings from './Settings';
import './App.css';
import Forum from './Forum'; // ✅ Додано імпорт форуму

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌤️ Початкова сторінка – вибір настрою */}
        <Route path="/" element={<MoodCheck />} />

        {/* 📚 Основні сторінки */}
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />

        {/* 🧑‍🤝‍🧑 Форум / спільнота */}
        <Route path="/forum" element={<Forum />} />

        {/* 🛑 Фолбек: якщо неправильний маршрут */}
        <Route path="*" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
