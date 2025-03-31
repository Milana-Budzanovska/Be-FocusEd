// Settings.js — сторінка налаштувань профілю учня
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [assistant, setAssistant] = useState('🧠 Люмі');
  const [learningStyle, setLearningStyle] = useState('візуальний');
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    const storedAssistant = localStorage.getItem('assistant') || '🧠 Люмі';
    const storedStyle = localStorage.getItem('learningStyle') || 'візуальний';
    const storedFont = localStorage.getItem('fontSize') || 'normal';
    setAssistant(storedAssistant);
    setLearningStyle(storedStyle);
    setFontSize(storedFont);
  }, []);

  const handleSave = () => {
    localStorage.setItem('assistant', assistant);
    localStorage.setItem('learningStyle', learningStyle);
    localStorage.setItem('fontSize', fontSize);
    alert('✅ Зміни збережено!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>⚙️ Налаштування</h2>

      <div style={{ margin: '1rem 0' }}>
        <label>Аватар-помічник:</label><br />
        <select value={assistant} onChange={(e) => setAssistant(e.target.value)}>
          <option value="🧠 Люмі">🧠 Люмі</option>
          <option value="🐸 Фінч">🐸 Фінч</option>
          <option value="🦊 Міко">🦊 Міко</option>
        </select>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <label>Стиль навчання:</label><br />
        <select value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)}>
          <option value="візуальний">🖼️ Візуальний</option>
          <option value="аудіальний">🎧 Аудіальний</option>
          <option value="кінестетичний">👐 Кінестетичний</option>
        </select>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <label>Розмір шрифту:</label><br />
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="normal">🔤 Стандартний</option>
          <option value="large">🔠 Великий</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        style={{ marginTop: '1rem', padding: '0.7rem 1.5rem', fontSize: '1rem', borderRadius: '10px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}
      >💾 Зберегти налаштування</button>

      <br />
      <button
        onClick={() => navigate('/menu')}
        style={{ marginTop: '1.5rem', padding: '0.7rem 1.5rem', fontSize: '1rem', borderRadius: '10px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}
      >⬅️ Назад до меню</button>
    </div>
  );
}
