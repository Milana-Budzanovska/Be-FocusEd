// src/pages/MoodCheck.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodCheck() {
  const navigate = useNavigate();
  const moods = [
    { label: '😊 Щасливий', color: '#e0f7fa' }, // м'який блакитний
    { label: '😐 Нейтральний', color: '#f0f4c3' }, // пастельний зелений
    { label: '😢 Сумний', color: '#fce4ec' }, // м'який рожевий
    { label: '😡 Злий', color: '#fff9c4' }, // світлий жовтий
    { label: '😨 Стурбований', color: '#d1c4e9' } // пастельний фіолетовий
  ];

  const handleMoodSelect = (mood) => {
    localStorage.setItem('mood', mood);
    navigate('/menu');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f5f5f5', // ніжний фон для кращого контрасту
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
    fontSize: '2.5rem', // великий шрифт для заголовка
    fontWeight: 'bold',
    color: '#6a0dad', // м'який фіолетовий для заголовка
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    maxWidth: '350px', // щоб кнопки не були занадто широкими на екрані
  };

  const buttonStyle = (color) => ({
    fontSize: '1.4rem',
    padding: '1rem 1.5rem',
    borderRadius: '10px', // округлі краї
    border: 'none',
    backgroundColor: color,
    color: '#333', // темний текст для кращої читабельності
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box',
  });

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Як ти себе сьогодні почуваєш?</h1>
      <div style={buttonContainerStyle}>
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            style={buttonStyle(mood.color)}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}
