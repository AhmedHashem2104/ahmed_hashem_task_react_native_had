import axios from 'axios';

export const baseURL = `https://api.themoviedb.org/3`;

export const instance = axios.create({
  baseURL,
  timeout: 10000,
});
