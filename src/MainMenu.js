import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function MainMenu() {
  const navigate = useNavigate();
  const assistant = localStorage.getItem('assistant') || '🧠 Люмі';

  return (
    <div className="menu-bg">
      <div className="menu-card">
        <h1 className="menu-title">👋 Вітаємо на платформі!</h1>
        <p className="menu-subtitle">Я твій помічник {assistant}. Обери, що хочеш зробити сьогодні:</p>
        <div className="menu-buttons">
          <button onClick={() => navigate('/learning')} className="menu-button">📘 Перейти до навчання</button>
          <button onClick={() => navigate('/breathing')} className="menu-button">🫁 Дихальна вправа</button>
          <button onClick={() => navigate('/progress')} className="menu-button">📊 Мій прогрес</button>
          <button onClick={() => navigate('/settings')} className="menu-button">⚙️ Налаштування</button>
          <button onClick={() => navigate('/forum')} className="menu-button forum">🫂 Спільнота підтримки</button>
        </div>
      </div>
    </div>
  );
}
