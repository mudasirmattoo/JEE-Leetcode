import axios from 'axios';

const API_URL = 'http://localhost:9080/';

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

export const getUserProfile = async () => {
  try {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      return { data: null };
    }

    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { data: null }; // Return null data instead of throwing error
  }
}; 