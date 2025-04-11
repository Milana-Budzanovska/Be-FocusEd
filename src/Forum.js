import React, { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from './webSocketService'; // Імпортуємо сервіс для WebSocket

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('Я');
  const [text, setText] = useState('');
  const messageEndRef = useRef(null); // Для прокручування до останнього повідомлення
  const socket = useRef(null); // Зберігаємо посилання на WebSocket

  // Підключаємося до WebSocket і отримуємо повідомлення
  useEffect(() => {
    // Підключення до WebSocket і передача callback для обробки повідомлень
    socket.current = connectWebSocket('wss://focused-community-server.onrender.com', (data) => {
      console.log('Отримано повідомлення від сервера:', data); // Логуємо отримані дані

      if (data.type === 'history') {
        setMessages(data.messages); // Якщо тип 'history', то оновлюємо список повідомлень
      } else if (data.type === 'new-message') {
        setMessages((prev) => [...prev, data.message]); // Якщо тип 'new-message', додаємо нове повідомлення
      } else if (data.type === 'update-reaction') {
        setMessages((prev) =>
          prev.map((m) => (m.id === data.id ? { ...m, reaction: data.reaction } : m)) // Оновлюємо реакції
        );
      }
    });

    // Закриваємо WebSocket при демонтажі компоненту
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  // Функція для надсилання повідомлення
  const sendMessage = () => {
    if (text.trim()) {
      socket.current.send(
        JSON.stringify({
          type: 'new-message',
          text,
          nickname,
          avatar: '🧠',
        })
      );
      setText(''); // Очищаємо текст після відправки
    }
  };

  // Функція для додавання реакцій до повідомлення
  const addReaction = (id, reaction) => {
    socket.current.send(
      JSON.stringify({
        type: 'reaction',
        id,
        reaction,
      })
    );
  };

  // Прокручуємо вниз при кожному оновленні списку повідомлень
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Прокручування до останнього повідомлення
    }
  }, [messages]);

  return (
    <div className="forum-wrapper" style={styles.wrapper}>
      <div className="forum-box" style={styles.box}>
        <h1 style={styles.header}>🌱 Спільнота підтримки</h1>
        <div className="forum-messages" style={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} className="message-card" style={styles.messageCard}>
              <div className="message-header" style={styles.messageHeader}>
                <span className="avatar" style={styles.avatar}>{msg.avatar}</span>
                <strong>{msg.nickname}</strong>
              </div>
              <p>{msg.text}</p>
              <div className="reactions" style={styles.reactions}>
                {['❤️', '👍', '⭐', '🤗'].map((r) => (
                  <button key={r} onClick={() => addReaction(msg.id, r)} style={styles.reactionButton}>
                    {r}
                  </button>
                ))}
                {msg.reaction && <span style={styles.selectedReaction}>{msg.reaction}</span>}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className="forum-inputs" style={styles.inputs}>
          <input
            placeholder="Твій нік"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Поділись своїми думками..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={sendMessage} style={styles.sendButton}>💬 Надіслати</button>
        </div>
      </div>
    </div>
  );
};

// Стилі для компонентів
const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #d8f3ff, #f3d8ff)',
    fontFamily: "'Comic Sans MS', 'Nunito', sans-serif',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  box: {
    width: '100%',
    maxWidth: '600px',
    padding: '
