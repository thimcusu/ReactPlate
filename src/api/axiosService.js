import axios from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:3001/';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
