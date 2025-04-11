// src/webSocketService.js

export const connectWebSocket = (url, onMessageCallback) => {
  const socket = new WebSocket(url); // Підключення до WebSocket серверу

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data); // Отримуємо дані з WebSocket
    onMessageCallback(data); // Викликаємо callback функцію, передану в компонент
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error); // Логуємо помилки WebSocket
  };

  socket.onopen = () => {
    console.log('WebSocket підключено'); // Логуємо підключення
  };

  socket.onclose = () => {
    console.log('WebSocket закрито'); // Логуємо закриття підключення
  };

  return socket; // Повертаємо WebSocket для подальшого використання в компоненті
};
