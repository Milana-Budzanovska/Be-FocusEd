// Progress.js — сторінка відображення емоційного та навчального прогресу
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Progress() {
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [activityCounts, setActivityCounts] = useState({
    'Дихальна вправа': 0,
    'Навчання': 0,
    'Налаштування': 0
  });

  useEffect(() => {
    setMood(localStorage.getItem('selectedMood') || '');

    fetch('https://focused-server.onrender.com/get-activity-summary')
      .then(res => res.json())
      .then(data => {
        if (data && data.activityCounts) {
          setActivityCounts(data.activityCounts);
        }
      })
      .catch((err) => console.error('Помилка при отриманні активностей:', err));
  }, []);

  const moodEmoji = {
    радісний: '😃',
    нейтральний: '😐',
    сумний: '😢',
    злий: '😡',
    тривожний: '😰'
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>📊 Мій прогрес</h2>

      <div style={{ marginTop: '1.5rem' }}>
        <h4>Емоційний стан сьогодні:</h4>
        <p style={{ fontSize: '2rem' }}>{moodEmoji[mood] || '🤔'} {mood || 'Не вказано'}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h4>Активності:</h4>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem' }}>
          {Object.entries(activityCounts).map(([activity, count]) => (
            <li key={activity}>✅ {activity}: <strong>{count}</strong></li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem', background: '#f0f8ff', padding: '1rem', borderRadius: '10px' }}>
        <p>
          {mood === 'сумний'
            ? 'Ти витримав важкий день — і все одно не здався. Це неймовірно 💙'
            : mood === 'радісний'
            ? 'Супер! Навчання — це радість. Продовжуй у тому ж дусі!'
            : 'Ти молодець! Кожен крок — це твоя перемога.'}
        </p>
      </div>

      <button
        onClick={() => navigate('/menu')}
        style={{ marginTop: '2rem', padding: '0.7rem 1.5rem', fontSize: '1rem', borderRadius: '10px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}
      >⬅️ Назад до меню</button>
    </div>
  );
}
