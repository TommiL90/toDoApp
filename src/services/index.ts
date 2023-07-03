import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nestjsapi.onrender.com',
  timeout: 15000,
});
