// Breathing.js — дихальна вправа з адаптацією під емоцію і аватара
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Breathing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('Вдих');
  const [count, setCount] = useState(4);
  const [studentId, setStudentId] = useState(null);
  const [mood, setMood] = useState('');
  const [assistant, setAssistant] = useState('🧠 Люмі');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    setStudentId(localStorage.getItem('studentId'));
    setMood(localStorage.getItem('selectedMood') || '');
    setAssistant(localStorage.getItem('assistant') || '🧠 Люмі');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          setPhase((prevPhase) => {
            const next =
              prevPhase === 'Вдих' ? 'Затримка' :
              prevPhase === 'Затримка' ? 'Видих' :
              prevPhase === 'Видих' ? 'Пауза' : 'Вдих';

            if (prevPhase === 'Пауза') {
              setCycleCount((c) => c + 1);
              if (studentId) logActivity();
            }

            return next;
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [studentId]);

  const logActivity = async () => {
    try {
      await fetch('https://focused-server.onrender.com/log-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          activity_type: 'Дихальна вправа',
          duration_minutes: 1,
          emotion: mood
        }),
      });
    } catch (err) {
      console.error('❌ Помилка логування дихання:', err);
    }
  };

  const moodGreeting = {
    радісний: '🌞 Зарядимо ще більше позитиву!',
    нейтральний: '🙂 Спокій — це суперсила.',
    сумний: '💙 Глибоке дихання допоможе тобі трохи відпустити сум.',
    злий: '😡 Вдихни... і відпусти злість.',
    тривожний: '😰 Разом із Люмі дихаємо повільно й заспокоюємось.'
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>🫁 Дихальна вправа: квадратне дихання</h2>
      <p>{assistant} каже: "{moodGreeting[mood] || 'Давай зробимо це разом!'}"</p>

      <div style={{ fontSize: '3rem', margin: '2rem 0' }}>{phase}: {count}</div>

      {cycleCount >= 1 && (
        <div style={{ marginTop: '1rem', background: '#e0f7fa', padding: '1rem', borderRadius: '10px' }}>
          <p>✨ {assistant} каже: "Ти вже зробив(ла) {cycleCount} коло дихання. Ти чудово справляєшся!"</p>
        </div>
      )}

      <button
        onClick={() => navigate('/menu')}
        style={{ marginTop: '2rem', padding: '0.7rem 1.5rem', fontSize: '1rem', borderRadius: '10px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}
      >⬅️ Назад до меню</button>
    </div>
  );
}
