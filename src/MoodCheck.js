import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodCheck() {
  const navigate = useNavigate();
  const moods = [
    { label: '😊 Щасливий', color: '#fef2c0' },  // світло-жовтий
    { label: '😐 Нейтральний', color: '#d1d5db' },  // світло-сірий
    { label: '😢 Сумний', color: '#a7c7e7' },  // світло-синій
    { label: '😡 Злий', color: '#fca5a5' },  // світло-червоний
    { label: '😨 Стурбований', color: '#e9d6f7' },  // світло-фіолетовий
  ];

  const handleMoodSelect = (mood) => {
    localStorage.setItem('mood', mood);
    navigate('/menu');
  };

  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #A2C2E2, #E4A0A0)', // градієнтний фон
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4B2C20',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '500px',
  };

  const buttonStyle = (color) => ({
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    borderRadius: '12px',
    backgroundColor: color,
    color: '#4B2C20',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  });

  const buttonHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div style={appStyle}>
      <h1 style={titleStyle}>Як ти себе сьогодні почуваєш?</h1>
      <div style={buttonGridStyle}>
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            style={buttonStyle(mood.color)}
            onMouseEnter={(e) => e.target.style = { ...buttonStyle(mood.color), ...buttonHoverStyle }}
            onMouseLeave={(e) => e.target.style = buttonStyle(mood.color)}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}
