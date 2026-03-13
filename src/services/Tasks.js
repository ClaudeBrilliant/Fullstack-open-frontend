import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getAllTasks = async () => {
  const response = await axios.get(`${BASE_URL}/api/tasks`);
  return response.data;
};

const getTaskById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/tasks/${id}`);
  return response.data;
};

const createTask = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/tasks`, formData);
    return response.data;
  } catch (err) {
    // Log detailed information to help debug server 500 errors
    console.error("createTask error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      headers: err.response?.headers,
    });
    if (err.response) {
      // Throw a clearer error for the UI to show (or to inspect in console)
      throw new Error(`API ${err.response.status}: ${JSON.stringify(err.response.data)}`);
    }
    throw err;
  }
};

const updateTask = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/api/tasks/${id}`, updatedData);
  return response.data;
};

const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/api/tasks/${id}`);
};

export  {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};