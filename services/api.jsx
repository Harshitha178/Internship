import axios from 'axios';
const BASE_URL = 'http://localhost:6001';

// Fixed typo and corrected internships API base URL
const INTERNSHIP_BASE_URL = '/api/internships';

export const getDashboardStats = async () => {
  const res = await axios.get(`${INTERNSHIP_BASE_URL}/dashboard-stats`);
  return res.data;
};

export const getAllInternships = async () => {
  const res = await axios.get(`${INTERNSHIP_BASE_URL}/all`);
  return res.data;
};

export const updateInternshipStatus = async (id, status) => {
  const res = await axios.patch(`${INTERNSHIP_BASE_URL}/${id}/status`, { status });
  return res.data;
};

export const registerUser = async (form) => {
  const { rollNo, name, email, branch, semester, password } = form;
  const res = await axios.post(`${BASE_URL}/auth/register`, {
    rollNo,
    name,
    email,
    branch,
    semester,
    password
  });
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return res.data;
};
