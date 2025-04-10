// src/MainMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();
  const assistant = localStorage.getItem('assistant') || '🧠 Люмі';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #d0f0fd, #f0d9ff)',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        👋 Вітаємо на платформі!
      </h1>
      <p>Я твій помічник {assistant}. Обери, що хочеш зробити сьогодні:</p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px',
        margin: '2rem auto'
      }}>
        <button onClick={() => navigate('/learning')} style={buttonStyle}>📘 Перейти до навчання</button>
        <button onClick={() => navigate('/breathing')} style={buttonStyle}>🫁 Дихальна вправа</button>
        <button onClick={() => navigate('/progress')} style={buttonStyle}>📊 Мій прогрес</button>
        <button onClick={() => navigate('/settings')} style={buttonStyle}>⚙️ Налаштування</button>
        <button onClick={() => navigate('/forum')} style={{ ...buttonStyle, backgroundColor: '#7BC86C' }}>
          🫂 Спільнота підтримки
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '0.8rem 1.2rem',
  fontSize: '1rem',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: 'white',
  cursor: 'pointer',
};
