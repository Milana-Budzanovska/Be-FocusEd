import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodCheck from './MoodCheck'; // Створення вибору настрою
import MainMenu from './MainMenu';  // Головне меню
import Learning from './Learning';  // Сторінка навчання
import Breathing from './Breathing';  // Дихальні вправи
import Progress from './Progress';  // Прогрес
import Settings from './Settings';  // Налаштування

function App() {
  return (
    <Router>
      <Routes>
        {/* Додано маршрут для вибору настрою */}
        <Route path="/" element={<MoodCheck />} />
        
        {/* Основні маршрути для меню та інших компонентів */}
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Фолбек для неправильних маршрутів */}
        <Route path="*" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
