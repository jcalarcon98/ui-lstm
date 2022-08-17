import axios from "axios";

const backend = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    post: {
      "Access-Control-Allow-Origin": true
    }
  }
});

export const getPredictionsByCountries = async (countries, days, date) => {
  const data = {
    countries,
    days: parseInt(days),
    pivot_date: date
  }

  try {
    const response = await backend.post('/predictions', data);
    return response?.data;
  }
  catch (error) {
    console.log(error)
    return null;
  }
};