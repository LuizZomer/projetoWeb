import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/userLogin'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}`, { username, password });
    const token = response.data.accessToken; // Acesse a propriedade correta
    localStorage.setItem('token', token); // Armazene o token no localStorage
    return token;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed. Please check your credentials.'); // Lançar um erro customizado
  }
};