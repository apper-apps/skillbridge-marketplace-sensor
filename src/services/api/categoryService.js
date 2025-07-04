import mockCategories from '@/services/mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCategories = async () => {
  await delay(300);
  return [...mockCategories];
};

export const getCategoryById = async (id) => {
  await delay(200);
  const category = mockCategories.find(c => c.Id === id);
  if (!category) {
    throw new Error('Category not found');
  }
  return { ...category };
};

export const createCategory = async (categoryData) => {
  await delay(400);
  const newCategory = {
    ...categoryData,
    Id: Math.max(...mockCategories.map(c => c.Id)) + 1
  };
  mockCategories.push(newCategory);
  return { ...newCategory };
};

export const updateCategory = async (id, categoryData) => {
  await delay(300);
  const index = mockCategories.findIndex(c => c.Id === id);
  if (index === -1) {
    throw new Error('Category not found');
  }
  mockCategories[index] = { ...mockCategories[index], ...categoryData };
  return { ...mockCategories[index] };
};

export const deleteCategory = async (id) => {
  await delay(200);
  const index = mockCategories.findIndex(c => c.Id === id);
  if (index === -1) {
    throw new Error('Category not found');
  }
  mockCategories.splice(index, 1);
  return { success: true };
};