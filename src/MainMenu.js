// src/pages/MainMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
