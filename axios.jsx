// src/axiosConfig.js
import axios from 'axios';

const API_URL = 'http://192.168.3.3:8000/'; // Substitua pelo URL gerado pelo Ngrok

const api = axios.create({
  baseURL: API_URL,
});

export default api;
