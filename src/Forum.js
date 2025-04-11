// імпорти
import React, { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from './webSocketService';

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('Я');
  const [text, setText] = useState('');
  const messageEndRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = connectWebSocket('wss://rhinestone-tin-ranunculus.glitch.me', (data) => {
      if (data.type === 'history') {
        setMessages(data.messages);
      } else if (data.type === 'new-message') {
        setMessages((prev) => [...prev, data.message]);
      } else if (data.type === 'update-reaction') {
        setMessages((prev) =>
          prev.map((m) => (m.id === data.id ? { ...m, reaction: data.reaction } : m))
        );
      } else if (data.type === 'delete-message') {
        setMessages((prev) => prev.filter((m) => m.id !== data.id));
      } else if (data.type === 'clear-history') {
        setMessages([]);
      }
    });
    return () => socket.current && socket.current.close();
  }, []);

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
      setText('');
    }
  };

  const deleteMessage = (id) => {
    socket.current.send(
      JSON.stringify({
        type: 'delete-message',
        id,
      })
    );
  };

  const clearHistory = () => {
    if (window.confirm("Очистити всю історію?")) {
      socket.current.send(
        JSON.stringify({
          type: 'clear-history',
        })
      );
    }
  };

  const addReaction = (id, reaction) => {
    socket.current.send(
      JSON.stringify({
        type: 'reaction',
        id,
        reaction,
      })
    );
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h1 style={styles.header}>🌱 Спільнота підтримки</h1>

        {/* Кнопка для очищення історії */}
        <button onClick={clearHistory} style={styles.clearButton}>🗑 Очистити історію</button>

        <div style={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} style={styles.messageCard}>
              <div style={styles.messageHeader}>
                <span style={styles.avatar}>{msg.avatar}</span>
                <strong>{msg.nickname}</strong>
              </div>
              <p>{msg.text}</p>

              <div style={styles.reactions}>
                {['❤️', '👍', '⭐', '🤗'].map((r) => (
                  <button key={r} onClick={() => addReaction(msg.id, r)} style={styles.reactionButton}>
                    {r}
                  </button>
                ))}
                {msg.reaction && <span style={styles.selectedReaction}>{msg.reaction}</span>}
              </div>

              {/* Якщо повідомлення належить поточному користувачу */}
              {msg.nickname === nickname && (
                <button
                  onClick={() => deleteMessage(msg.id)}
                  style={styles.deleteButton}
                >
                  ❌ Видалити
                </button>
              )}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div style={styles.inputs}>
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

// додаємо стилі для нових кнопок
const styles = {
  ... /* (всі твої попередні стилі залишаються тут без змін) */,
  deleteButton: {
    marginTop: '0.3rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontSize: '0.8rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  clearButton: {
    background: '#ffe0e0',
    color: '#b80000',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '0.6rem',
  },
};

export default Forum;
