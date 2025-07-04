import mockOrders from '@/services/mockData/orders.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getOrders = async () => {
  await delay(300);
  return [...mockOrders];
};

export const getOrderById = async (id) => {
  await delay(200);
  const order = mockOrders.find(o => o.Id === id);
  if (!order) {
    throw new Error('Order not found');
  }
  return { ...order };
};

export const createOrder = async (orderData) => {
  await delay(400);
  const newOrder = {
    ...orderData,
    Id: Math.max(...mockOrders.map(o => o.Id)) + 1,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  mockOrders.push(newOrder);
  return { ...newOrder };
};

export const updateOrder = async (id, orderData) => {
  await delay(300);
  const index = mockOrders.findIndex(o => o.Id === id);
  if (index === -1) {
    throw new Error('Order not found');
  }
  mockOrders[index] = { ...mockOrders[index], ...orderData };
  return { ...mockOrders[index] };
};

export const deleteOrder = async (id) => {
  await delay(200);
  const index = mockOrders.findIndex(o => o.Id === id);
  if (index === -1) {
    throw new Error('Order not found');
  }
  mockOrders.splice(index, 1);
  return { success: true };
};