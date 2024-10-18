import axios from 'axios';


const API_URL = 'http://localhost:5000/api/Tickets';


export const getTickets = async () => {
  const response = await axios.get(API_URL);
  console.log("Response",response);
  return response.data;
};