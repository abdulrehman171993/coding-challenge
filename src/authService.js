import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (username, password) => {
  return await axios.post(`${API_URL}/users`, { username, password });
};

export const login = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

export const logout = async () => {
  return await axios.post(`${API_URL}/logout`);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};