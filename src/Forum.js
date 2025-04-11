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

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #d8f3ff, #f3d8ff)',
    fontFamily: "'Comic Sans MS', 'Nunito', sans-serif",
    padding: '1rem',
    boxSizing: 'border-box',
  },
  box: {
    width: '100%',
    maxWidth: '500px',
    padding: '1rem',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '22px',
    textAlign: 'center',
    color: '#6c5ce7',
    marginBottom: '1rem',
  },
  messages: {
    maxHeight: '50vh',
    overflowY: 'scroll',
    marginBottom: '1rem',
  },
  messageCard: {
    backgroundColor: '#f7f7f7',
    padding: '0.8rem',
    borderRadius: '12px',
    marginBottom: '0.8rem',
    fontSize: '0.95rem',
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.4rem',
  },
  avatar: {
    marginRight: '0.5rem',
    fontSize: '1.2rem',
  },
  reactions: {
    display: 'flex',
    gap: '0.4rem',
    marginTop: '0.5rem',
  },
  reactionButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '1.4rem',
  },
  selectedReaction: {
    marginLeft: '0.6rem',
    fontSize: '1.4rem',
    color: '#6c5ce7',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.6rem',
    marginBottom: '0.6rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.6rem',
    marginBottom: '0.6rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    height: '80px',
  },
  sendButton: {
    padding: '0.6rem',
    backgroundColor: '#6c5ce7',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Forum;
