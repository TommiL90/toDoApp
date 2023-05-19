import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fake-api-todo.onrender.com',
  timeout: 10000,
});
