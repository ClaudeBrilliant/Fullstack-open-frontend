import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createTask = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
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
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export  {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};