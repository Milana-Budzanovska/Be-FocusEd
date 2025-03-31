import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodCheck() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    localStorage.setItem('selectedMood', mood);

    // Затримка для візуального кліку і перехід
    setTimeout(() => {
      navigate('/menu');
    }, 500);
  };

  const moods = [
    { emoji: '😃', label: 'радісний' },
    { emoji: '😐', label: 'нейтральний' },
    { emoji: '😢', label: 'сумний' },
    { emoji: '😡', label: 'злий' },
    { emoji: '😰', label: 'тривожний' },
  ];

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>👋 Привіт! Як ти почуваєшся сьогодні?</h1>
      <p>Обери свій настрій:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {moods.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => handleMoodSelect(label)}
            style={{
              fontSize: '2.5rem',
              padding: '1rem',
              borderRadius: '12px',
              border: selectedMood === label ? '3px solid #007BFF' : '1px solid #ccc',
              backgroundColor: selectedMood === label ? '#e0f0ff' : '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
