// src/pages/Forum.js
import React, { useEffect, useRef, useState } from 'react';

const socket = new WebSocket('wss://focused-community-server.onrender.com'); // або локально: ws://localhost:4000

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('Я');
  const [text, setText] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Отримуємо історію повідомлень після підключення до WebSocket
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'history') {
        setMessages(data.messages); // збереження старих повідомлень
      } else if (data.type === 'new-message') {
        setMessages(prev => [...prev, data.message]); // додаємо нове повідомлення
      } else if (data.type === 'update-reaction') {
        setMessages(prev =>
          prev.map(m => m.id === data.id ? { ...m, reaction: data.reaction } : m)
        );
      }
    };

    // При підключенні до WebSocket отримуємо історію повідомлень
    socket.send(JSON.stringify({
      type: 'get-history'
    }));

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      socket.send(JSON.stringify({
        type: 'new-message',
        text,
        nickname,
        avatar: '🧠'
      }));
      setText('');
    }
  };

  const addReaction = (id, reaction) => {
    socket.send(JSON.stringify({
      type: 'reaction',
      id,
      reaction
    }));
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="forum-wrapper" style={styles.wrapper}>
      <div className="forum-box" style={styles.box}>
        <h1 style={styles.header}>🌱 Спільнота підтримки</h1>
        <div className="forum-messages" style={styles.messages}>
          {messages.map(msg => (
            <div key={msg.id} className="message-card" style={styles.messageCard}>
              <div className="message-header" style={styles.messageHeader}>
                <span className="avatar" style={styles.avatar}>{msg.avatar}</span>
                <strong style={styles.nickname}>{msg.nickname}</strong>
              </div>
              <p style={styles.messageText}>{msg.text}</p>
              <div className="reactions" style={styles.reactions}>
                {['❤️', '👍', '⭐', '🤗'].map(r => (
                  <button
                    key={r}
                    style={styles.reactionButton}
                    onClick={() => addReaction(msg.id, r)}
                  >
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
            style={styles.input}
            placeholder="Твій нік"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <textarea
            style={styles.textarea}
            placeholder="Поділись своїми думками..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button style={styles.sendButton} onClick={sendMessage}>💬 Надіслати</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Nunito, sans-serif',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  box: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  messages: {
    height: '300px',
    overflowY: 'auto',
    marginBottom: '1.5rem',
  },
  messageCard: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  avatar: {
    fontSize: '1.5rem',
    marginRight: '0.5rem',
  },
  nickname: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  reactions: {
    display: 'flex',
    gap: '0.5rem',
  },
  reactionButton: {
    fontSize: '1.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  selectedReaction: {
    fontSize: '1.5rem',
    color: '#ff6347', // щоб обрана реакція була виділена
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    minHeight: '100px',
    boxSizing: 'border-box',
  },
  sendButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Forum;
