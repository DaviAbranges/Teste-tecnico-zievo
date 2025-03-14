import axios from 'axios';
import { env } from '../utils/env';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});
