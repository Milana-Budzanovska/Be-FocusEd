// src/pages/Forum.js
import React, { useEffect, useRef, useState } from 'react';

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('Я');
  const [text, setText] = useState('');
  const socket = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket('wss://focused-community-server.onrender.com');

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
    };

    return () => socket.current && socket.current.close();
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      socket.current.send(
        JSON.stringify({
          type: 'new-message',
          text,
          nickname,
          avatar: '🧠'
        })
      );
      setText('');
    }
  };

  const addReaction = (id, reaction) => {
    socket.current.send(
      JSON.stringify({ type: 'reaction', id, reaction })
    );
  };

  const deleteMessage = (id) => {
    socket.current.send(
      JSON.stringify({ type: 'delete-message', id })
    );
  };

  const clearAll = () => {
    if (window.confirm('Очистити всю історію повідомлень?')) {
      socket.current.send(JSON.stringify({ type: 'clear-history' }));
    }
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
                {msg.nickname === nickname && (
                  <button onClick={() => deleteMessage(msg.id)} style={styles.deleteButton}>🗑</button>
                )}
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={sendMessage} style={styles.sendButton}>💬 Надіслати</button>
            <button onClick={clearAll} style={styles.clearButton}>🧹 Очистити все</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', background: 'linear-gradient(to bottom right, #d8f3ff, #f3d8ff)',
    fontFamily: 'Comic Sans MS, Nunito, sans-serif', padding: '1rem', boxSizing: 'border-box'
  },
  box: {
    width: '100%', maxWidth: '600px', padding: '1.5rem', background: '#ffffff',
    borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden'
  },
  header: { fontSize: '24px', textAlign: 'center', color: '#6c5ce7' },
  messages: { maxHeight: '400px', overflowY: 'scroll', marginBottom: '1rem' },
  messageCard: {
    backgroundColor: '#f7f7f7', padding: '1rem', borderRadius: '10px',
    marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  messageHeader: { display: 'flex', alignItems: 'center', marginBottom: '0.5rem' },
  avatar: { marginRight: '0.5rem', fontSize: '1.5rem' },
  reactions: { display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' },
  reactionButton: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem' },
  selectedReaction: { marginLeft: '0.5rem', fontSize: '1.5rem', color: '#6c5ce7' },
  deleteButton: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#d63031' },
  inputs: { display: 'flex', flexDirection: 'column' },
  input: {
    padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px',
    border: '1px solid #ccc', fontSize: '1rem'
  },
  textarea: {
    padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px',
    border: '1px solid #ccc', fontSize: '1rem', height: '100px'
  },
  sendButton: {
    padding: '0.8rem', backgroundColor: '#6c5ce7', color: '#fff',
    border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem'
  },
  clearButton: {
    padding: '0.8rem', backgroundColor: '#fdcb6e', color: '#fff',
    border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem'
  }
};

export default Forum;
