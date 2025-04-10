// src/pages/MoodCheck.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodCheck() {
  const navigate = useNavigate();
  const moods = [
    { label: '😊 Щасливий', color: 'bg-yellow-200' },
    { label: '😐 Нейтральний', color: 'bg-gray-200' },
    { label: '😢 Сумний', color: 'bg-blue-200' },
    { label: '😡 Злий', color: 'bg-red-200' },
    { label: '😨 Стурбований', color: 'bg-purple-200' }
  ];

  const handleMoodSelect = (mood) => {
    localStorage.setItem('mood', mood);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center font-sans p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Як ти себе сьогодні почуваєш?</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            className={`text-xl rounded-xl shadow-md px-6 py-4 hover:scale-105 transition ${mood.color}`}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
} 

// src/pages/MainMenu.js

export default function MainMenu() {
  const navigate = useNavigate();
  const assistant = localStorage.getItem('assistant') || '🧠 Люмі';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-center font-sans p-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">👋 Вітаємо на платформі!</h1>
      <p className="text-lg mb-8">Я твій помічник {assistant}. Обери, що хочеш зробити сьогодні:</p>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <button onClick={() => navigate('/learning')} className="main-button">📘 Перейти до навчання</button>
        <button onClick={() => navigate('/breathing')} className="main-button">🫁 Дихальна вправа</button>
        <button onClick={() => navigate('/progress')} className="main-button">📊 Мій прогрес</button>
        <button onClick={() => navigate('/settings')} className="main-button">⚙️ Налаштування</button>
        <button onClick={() => navigate('/forum')} className="main-button bg-green-400 hover:bg-green-500">🫂 Спільнота підтримки</button>
      </div>
    </div>
  );
}
