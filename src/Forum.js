import React, { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from './webSocketService'; // Імпортуємо сервіс

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('Я');
  const [text, setText] = useState('');
  const messageEndRef = useRef(null);
  const socket = useRef(null); // зберігаємо посилання на WebSocket

  useEffect(() => {
    // Підключення до WebSocket і передача callback для обробки повідомлень
    socket.current = connectWebSocket('wss://focused-community-server.onrender.com', (data) => {
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

    return () => {
      socket.current.close(); // Закриваємо з'єднання при демонтажі компонента
    };
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
    <div className="forum-wrapper">
      <div className="forum-box">
        <h1>🌱 Спільнота підтримки</h1>
        <div className="forum-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <div className="message-header">
                <span className="avatar">{msg.avatar}</span>
                <strong>{msg.nickname}</strong>
              </div>
              <p>{msg.text}</p>
              <div className="reactions">
                {['❤️', '👍', '⭐', '🤗'].map((r) => (
                  <button key={r} onClick={() => addReaction(msg.id, r)}>
                    {r}
                  </button>
                ))}
                {msg.reaction && <span className="selected-reaction">{msg.reaction}</span>}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className="forum-inputs">
          <input
            placeholder="Твій нік"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <textarea
            placeholder="Поділись своїми думками..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={sendMessage}>💬 Надіслати</button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
