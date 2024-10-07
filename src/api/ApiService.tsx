import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiErrorResponse } from './ApiTypes';

// You might want to create a separate file for these types


const ApiService: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
ApiService.interceptors.request.use((config) => {
 // Replace with your storage method
 const authToken = localStorage.getItem('authToken');
  if (config.headers && authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Response interceptor
ApiService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let apiResponse: ApiErrorResponse;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      apiResponse = {
        name: 'server-error',
        error: {
          userMessage: 'An error occurred while processing your request.',
          validationError: [],
        },
        code: error.response.status,
        message: 'Server error',
        devMessage: error.message,
        data: null,
      };

      if (error.response.status < 500) {
        apiResponse = error.response.data as ApiErrorResponse;
      }
    } else if (error.request) {
      // The request was made but no response was received
      apiResponse = {
        name: 'network-error',
        error: {
          userMessage: 'Unable to connect to the server. Please check your internet connection.',
          validationError: [],
        },
        code: 0,
        message: 'Network error',
        devMessage: 'No response received',
        data: null,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      apiResponse = {
        name: 'client-error',
        error: {
          userMessage: 'An unexpected error occurred. Please try again.',
          validationError: [],
        },
        code: 0,
        message: 'Client error',
        devMessage: error.message,
        data: null,
      };
    }

    return Promise.reject(apiResponse);
  }
);

export default ApiService;