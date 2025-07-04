import mockConversations from '@/services/mockData/conversations.json';
import mockMessages from '@/services/mockData/messages.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getConversations = async () => {
  await delay(300);
  return [...mockConversations];
};

export const getMessages = async (conversationId) => {
  await delay(250);
  return mockMessages.filter(m => m.conversationId === conversationId);
};

export const sendMessage = async (conversationId, content) => {
  await delay(200);
  const newMessage = {
    Id: Math.max(...mockMessages.map(m => m.Id)) + 1,
    conversationId,
    senderId: 1, // Mock current user
    content,
    timestamp: new Date().toISOString(),
    read: false
  };
  mockMessages.push(newMessage);
  return { ...newMessage };
};

export const markMessageAsRead = async (messageId) => {
  await delay(100);
  const index = mockMessages.findIndex(m => m.Id === messageId);
  if (index === -1) {
    throw new Error('Message not found');
  }
  mockMessages[index].read = true;
  return { ...mockMessages[index] };
};