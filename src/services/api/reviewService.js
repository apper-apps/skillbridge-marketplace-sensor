import mockReviews from '@/services/mockData/reviews.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getReviews = async (serviceId) => {
  await delay(300);
  return mockReviews.filter(r => r.serviceId === serviceId);
};

export const getReviewsByUser = async (userId) => {
  await delay(250);
  return mockReviews.filter(r => r.reviewerId === userId);
};

export const getReviewById = async (id) => {
  await delay(200);
  const review = mockReviews.find(r => r.Id === id);
  if (!review) {
    throw new Error('Review not found');
  }
  return { ...review };
};

export const createReview = async (reviewData) => {
  await delay(400);
  const newReview = {
    ...reviewData,
    Id: Math.max(...mockReviews.map(r => r.Id)) + 1,
    createdAt: new Date().toISOString()
  };
  mockReviews.push(newReview);
  return { ...newReview };
};

export const updateReview = async (id, reviewData) => {
  await delay(300);
  const index = mockReviews.findIndex(r => r.Id === id);
  if (index === -1) {
    throw new Error('Review not found');
  }
  mockReviews[index] = { ...mockReviews[index], ...reviewData };
  return { ...mockReviews[index] };
};

export const deleteReview = async (id) => {
  await delay(200);
  const index = mockReviews.findIndex(r => r.Id === id);
  if (index === -1) {
    throw new Error('Review not found');
  }
  mockReviews.splice(index, 1);
  return { success: true };
};