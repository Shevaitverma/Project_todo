// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

export const API_ENDPOINTS = {
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
  
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/users/login`,
  REGISTER: `${API_BASE_URL}/api/users/register`,
  LOGOUT: `${API_BASE_URL}/api/users/logout`,
  GET_USER: `${API_BASE_URL}/api/users/get-user`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/users/refresh-token`,
  DELETE_ACCOUNT: `${API_BASE_URL}/api/users/delete-account`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/users/change-password`,
  UPDATE_ACCOUNT: `${API_BASE_URL}/api/users/update-account`,
  
  // Todo endpoints
  TODOS: `${API_BASE_URL}/api/todos`,
  TODO_BY_ID: (id) => `${API_BASE_URL}/api/todos/${id}`,
};

export default API_ENDPOINTS; 