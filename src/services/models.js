import axios from "axios";

const backend = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    post: {
      "Access-Control-Allow-Origin": true
    }
  }
});

export const getPredictionsByCountries = async (countries, days) => {
  const data = {
    countries,
    days: parseInt(days)
  }

  console.log(data);

  try {
    const response = await backend.post('/predictions', {
      countries,
      days: parseInt(days)

    });
    return response?.data;
  }
  catch (error) {
    console.log(error)
    return null;
  }
};