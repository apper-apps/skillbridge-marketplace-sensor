import mockServices from '@/services/mockData/services.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getServices = async () => {
  await delay(300);
  return [...mockServices];
};

export const getServiceById = async (id) => {
  await delay(200);
  const service = mockServices.find(s => s.Id === id);
  if (!service) {
    throw new Error('Service not found');
  }
  return { ...service };
};

export const getServicesBySeller = async (sellerId) => {
  await delay(250);
  return mockServices.filter(s => s.sellerId === sellerId);
};

export const createService = async (serviceData) => {
  await delay(400);
  const newService = {
    ...serviceData,
    Id: Math.max(...mockServices.map(s => s.Id)) + 1,
    createdAt: new Date().toISOString(),
    rating: 0,
    reviewCount: 0
  };
  mockServices.push(newService);
  return { ...newService };
};

export const updateService = async (id, serviceData) => {
  await delay(300);
  const index = mockServices.findIndex(s => s.Id === id);
  if (index === -1) {
    throw new Error('Service not found');
  }
  mockServices[index] = { ...mockServices[index], ...serviceData };
  return { ...mockServices[index] };
};

export const deleteService = async (id) => {
  await delay(200);
  const index = mockServices.findIndex(s => s.Id === id);
  if (index === -1) {
    throw new Error('Service not found');
  }
  mockServices.splice(index, 1);
  return { success: true };
};