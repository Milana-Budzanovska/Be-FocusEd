export const connectWebSocket = (url, onMessage) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket підключено');
    socket.send(JSON.stringify({ type: 'get-history' }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);  // Викликаємо callback, переданий в компонент
  };

  socket.onerror = (error) => {
    console.error('Помилка WebSocket:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket закрито');
  };

  return socket;
};
