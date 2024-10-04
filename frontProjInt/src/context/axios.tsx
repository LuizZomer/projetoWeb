import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/customerLogin'; 

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}`, { email, password });
  return response.data.token; 
};