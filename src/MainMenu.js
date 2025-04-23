import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();
  const assistant = localStorage.getItem('assistant') || '🧠 Люмі';
  const [lang, setLang] = useState('uk');

  const translations = {
    uk: {
      title: '👋 Вітаємо на платформі!',
      greeting: `Я твій помічник ${assistant}. Обери, що хочеш зробити сьогодні:`,
      learning: '📘 Перейти до навчання',
      breathing: '🫁 Дихальна вправа',
      progress: '📊 Мій прогрес',
      settings: '⚙️ Налаштування',
      forum: '🫂 Спільнота підтримки',
      switch: 'ENG'
    },
    en: {
      title: '👋 Welcome to the platform!',
      greeting: `I am your assistant ${assistant}. What would you like to do today?`,
      learning: '📘 Go to Learning',
      breathing: '🫁 Breathing Exercise',
      progress: '📊 My Progress',
      settings: '⚙️ Settings',
      forum: '🫂 Support Community',
      switch: 'UA'
    }
  };

  const t = translations[lang];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #d0f0fd, #f0d9ff)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <button onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')} style={{
        position: 'absolute', top: 20, right: 20, padding: '8px 16px',
        borderRadius: '8px', background: '#fff', border: '1px solid #ccc', cursor: 'pointer'
      }}>{t.switch}</button>

      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#4B0082'
      }}>{t.title}</h1>

      <p style={{ marginBottom: '2rem' }}>{t.greeting}</p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px',
        width: '100%'
      }}>
        <button onClick={() => navigate('/learning')} style={buttonStyle}>{t.learning}</button>
        <button onClick={() => navigate('/breathing')} style={buttonStyle}>{t.breathing}</button>
        <button onClick={() => navigate('/progress')} style={buttonStyle}>{t.progress}</button>
        <button onClick={() => navigate('/settings')} style={buttonStyle}>{t.settings}</button>
        <button onClick={() => navigate('/forum')} style={{ ...buttonStyle, backgroundColor: '#7BC86C' }}>
          {t.forum}
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
