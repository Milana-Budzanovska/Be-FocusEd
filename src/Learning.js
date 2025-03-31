// Learning.js — адаптивна сторінка навчання
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Learning() {
  const [mood, setMood] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMood(localStorage.getItem('selectedMood') || '');
    setLearningStyle(localStorage.getItem('learningStyle') || 'візуальний');
    setStudentId(localStorage.getItem('studentId'));
  }, []);

  useEffect(() => {
    if (studentId) {
      fetch('https://focused-server.onrender.com/log-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          activity_type: 'Навчання',
          duration_minutes: 1,
          emotion: mood
        })
      });
    }
  }, [studentId, mood]);

  const moodGreeting = {
    радісний: '🌞 Ти у чудовому настрої — давай вчитися з посмішкою!',
    нейтральний: '🙂 Почнемо спокійно й впевнено.',
    сумний: '😢 Сьогодні не найкращий день? Навчання допоможе відволіктися 💙',
    злий: '😡 Спробуємо трохи заспокоїтись і сфокусуватись разом.',
    тривожний: '😰 Зробимо все повільно і легко, без стресу.'
  };

  const styleContent = {
    візуальний: '🖼️ Подивись на цю схему або малюнок — уяви собі, як це працює.',
    аудіальний: '🎧 Прослухай коротке пояснення — і повтори вголос.',
    кінестетичний: '👐 Спробуй виконати завдання руками або уявити рухи.'
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>📚 Навчання</h2>

      {mood && (
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          {moodGreeting[mood] || 'Гайда до навчання!'}
        </p>
      )}

      <div style={{
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        marginTop: '1rem',
        background: '#f9f9f9'
      }}>
        <h3>Твій стиль навчання: {learningStyle}</h3>
        <p>{styleContent[learningStyle]}</p>
      </div>

      <button onClick={() => navigate('/menu')} style={{
        marginTop: '2rem',
        padding: '0.7rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer'
      }}>
        ⬅️ Повернутися до меню
      </button>
    </div>
  );
}
