import axios from "axios";

const backend = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getCountries = async () => {
  try {
    const response = await backend.get('/countries');
    return response?.data.countries;
  }
  catch (error) {
    return null;
  }
};