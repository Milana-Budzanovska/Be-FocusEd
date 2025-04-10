// src/pages/Forum.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Forum.css'; // стилі для анімації, градієнтів, фону

const socket = io('wss://focused-chat-server.onrender.com', {
  transports: ['websocket']
});

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [emotion, setEmotion] = useState('Радість');
  const [text, setText] = useState('');
  const [nickname, setNickname] = useState('Я');

  useEffect(() => {
    socket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('new_message');
    };
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      const message = {
        nickname,
        emotion,
        text,
        avatar: `/avatars/${emotion}.png`,
      };
      socket.emit('send_message', message);
      setMessages((prev) => [...prev, message]);
      setText('');
    }
  };

  const getColor = (emo) => {
    switch (emo) {
      case 'Сум': return 'bg-yellow-100';
      case 'Радість': return 'bg-purple-100';
      case 'Спокій': return 'bg-blue-100';
      case 'Злість': return 'bg-red-100';
      case 'Страх': return 'bg-gray-100';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4 forum-bg">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 relative z-10">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">🌱 Спільнота підтримки</h1>
        <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`rounded-xl p-3 shadow flex gap-3 items-start ${getColor(m.emotion)}`}>
              <img src={m.avatar} alt="avatar" className="w-10 h-10 rounded-full shadow" />
              <div>
                <p className="text-sm text-gray-500">{m.nickname} — {m.emotion}</p>
                <p className="text-md">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Твій нік"
            className="w-full border px-3 py-2 rounded-md mb-2"
          />
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-2"
          >
            {['Радість', 'Сум', 'Спокій', 'Злість', 'Страх'].map((emo) => (
              <option key={emo} value={emo}>{emo}</option>
            ))}
          </select>
          <textarea
            placeholder="Напиши свої думки..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-2"
          />
          <button
            onClick={handleSend}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full shadow-md"
          >
            💬 Надіслати
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
