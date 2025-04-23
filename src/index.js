import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 10000;
const wss = new WebSocketServer({ port: PORT });

let messageHistory = [];

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'history', messages: messageHistory }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case 'new-message':
          const newMsg = {
            id: uuidv4(),
            text: message.text,
            nickname: message.nickname,
            avatar: message.avatar || '🧠',
            reaction: null,
          };
          messageHistory.push(newMsg);
          broadcast({ type: 'new-message', message: newMsg });
          break;

        case 'reaction':
          messageHistory = messageHistory.map(m =>
            m.id === message.id ? { ...m, reaction: message.reaction } : m
          );
          broadcast({ type: 'update-reaction', id: message.id, reaction: message.reaction });
          break;

        case 'delete-message':
          messageHistory = messageHistory.filter(m => m.id !== message.id);
          broadcast({ type: 'delete-message', id: message.id });
          break;

        case 'clear-history':
          messageHistory = [];
          broadcast({ type: 'clear-history' });
          break;
      }
    } catch (err) {
      console.error('Invalid message:', err);
    }
  });
});

function broadcast(data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

console.log(`✅ WebSocket server running on port ${PORT}`);
