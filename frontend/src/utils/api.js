import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (name, email, password, role) =>
    api.post('/auth/register', { name, email, password, role }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

// Assignment APIs
export const assignmentAPI = {
  getAll: () => api.get('/assignments'),
  getById: (id) => api.get(`/assignments/${id}`),
  create: (data) => api.post('/assignments', data),
  update: (id, data) => api.put(`/assignments/${id}`, data),
  delete: (id) => api.delete(`/assignments/${id}`),
};

// Submission APIs
export const submissionAPI = {
  upload: (assignmentId, file) => {
    const formData = new FormData();
    formData.append('assignmentId', assignmentId);
    formData.append('file', file);
    return api.post('/submissions/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getByAssignment: (assignmentId) =>
    api.get(`/submissions/${assignmentId}`),
  getByStudent: (studentId) =>
    api.get(`/submissions/student/${studentId}`),
  getById: (id) => api.get(`/submissions/single/${id}`),
  grade: (id, marks, feedback) =>
    api.put(`/submissions/${id}/grade`, { marks, feedback }),
};

// Deadline APIs
export const deadlineAPI = {
  getInfo: (assignmentId) =>
    api.get(`/deadline/${assignmentId}`),
  getAllInfo: () => api.get('/deadline/all/deadlines'),
};

export default api;
