import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodCheck() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('uk');

  const moods = {
    uk: [
      { label: '😊 Щасливий', color: '#e0f7fa' },
      { label: '😐 Нейтральний', color: '#f0f4c3' },
      { label: '😢 Сумний', color: '#fce4ec' },
      { label: '😡 Злий', color: '#fff9c4' },
      { label: '😨 Стурбований', color: '#d1c4e9' }
    ],
    en: [
      { label: '😊 Happy', color: '#e0f7fa' },
      { label: '😐 Neutral', color: '#f0f4c3' },
      { label: '😢 Sad', color: '#fce4ec' },
      { label: '😡 Angry', color: '#fff9c4' },
      { label: '😨 Worried', color: '#d1c4e9' }
    ]
  };

  const handleMoodSelect = (mood) => {
    localStorage.setItem('mood', mood);
    navigate('/menu');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f5f5f5',
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
    fontSize: '2.5rem',
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
    maxWidth: '350px',
  };

  const buttonStyle = (color) => ({
    fontSize: '1.4rem',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: color,
    color: '#333',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box',
  });

  return (
    <div style={containerStyle}>
      <button
        onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
        style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', backgroundColor: '#ddd', cursor: 'pointer' }}
      >
        {language === 'uk' ? 'EN' : 'UA'}
      </button>
      <h1 style={headingStyle}>
        {language === 'uk' ? 'Як ти себе сьогодні почуваєш?' : 'How do you feel today?'}
      </h1>
      <div style={buttonContainerStyle}>
        {moods[language].map((mood, index) => (
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
