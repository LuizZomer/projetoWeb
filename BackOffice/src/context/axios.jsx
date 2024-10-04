import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/userLogin'; 

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}`, { username, password });
  return response.data.token; 
};