import mockUsers from '@/services/mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getUsers = async () => {
  await delay(300);
  return [...mockUsers];
};

export const getUserById = async (id) => {
  await delay(200);
  const user = mockUsers.find(u => u.Id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return { ...user };
};

export const getUserProfile = async (id) => {
  await delay(250);
  const user = mockUsers.find(u => u.Id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return { ...user };
};

export const createUser = async (userData) => {
  await delay(400);
  const newUser = {
    ...userData,
    Id: Math.max(...mockUsers.map(u => u.Id)) + 1,
    joinDate: new Date().toISOString(),
    rating: 0,
    reviewCount: 0
  };
  mockUsers.push(newUser);
  return { ...newUser };
};

export const updateUser = async (id, userData) => {
  await delay(300);
  const index = mockUsers.findIndex(u => u.Id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  mockUsers[index] = { ...mockUsers[index], ...userData };
  return { ...mockUsers[index] };
};

export const deleteUser = async (id) => {
  await delay(200);
  const index = mockUsers.findIndex(u => u.Id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  mockUsers.splice(index, 1);
  return { success: true };
};