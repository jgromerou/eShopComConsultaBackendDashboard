import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const urlApi = 'https://dashboard-react-avanzado-backend.vercel.app/api';

export const eShopApiUrl = axios.create({
  baseURL: urlApi,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

eShopApiUrl.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('tokenAuth');
  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});
