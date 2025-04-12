import axios from 'axios';

const API_URL = 'http://localhost:5004/api/questions';

export const getQuestionsByTopic = async (topic) => {
  try {
    const response = await axios.get(`${API_URL}/topic/${topic}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}; 