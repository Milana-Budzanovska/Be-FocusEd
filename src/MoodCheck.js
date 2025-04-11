// src/pages/MoodCheck.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodCheck() {
  const navigate = useNavigate();
  const moods = [
    { label: '😊 Щасливий', color: '#ffeb3b' },
    { label: '😐 Нейтральний', color: '#9e9e9e' },
    { label: '😢 Сумний', color: '#2196f3' },
    { label: '😡 Злий', color: '#f44336' },
    { label: '😨 Стурбований', color: '#9c27b0' }
  ];

  const handleMoodSelect = (mood) => {
    localStorage.setItem('mood', mood);
    navigate('/menu');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #d8f3ff, #f3d8ff)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nunito, sans-serif',
    padding: '1.5rem',
    boxSizing: 'border-box',
    margin: 0,
  };

  const headingStyle = {
    fontSize: '3rem', // використано великий шрифт для заголовка
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  };

  const buttonStyle = (color) => ({
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    borderRadius: '15px',
    border: 'none',
    backgroundColor: color,
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease-in-out',
    width: '100%',
    maxWidth: '350px', // додаємо максимальну ширину для кнопок
    textAlign: 'center', // вирівнюємо текст по центру
  });

  const buttonHoverStyle = {
    transform: 'scale(1.05)',
    backgroundColor: '#a29bfe', // Hover effect для всіх кнопок
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Як ти себе сьогодні почуваєш?</h1>
      <div style={buttonContainerStyle}>
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            style={buttonStyle(mood.color)}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a29bfe'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = mood.color}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}
