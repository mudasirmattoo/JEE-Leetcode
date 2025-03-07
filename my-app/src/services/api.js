import axios from 'axios';

const API_URL = 'http://localhost:5004/api';

export const getQuestionsByTopic = async (topic) => {
  console.log(topic);
  try {
    
    const response = await axios.get(`${API_URL}/questions/topic/${topic}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const getRandomQuestionsByTopic = async (topic, count) => {
  try {
    const response = await axios.get(`${API_URL}/questions/random/${topic}/${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random questions:', error);
    throw error;
  }
}; 