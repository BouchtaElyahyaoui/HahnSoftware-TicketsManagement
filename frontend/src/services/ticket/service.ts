import axios from 'axios';
import { ITicket } from './types';


const API_URL = 'http://localhost:5000/api/Tickets';


export const getTickets = async () => {
  const response = await axios.get(API_URL);
  console.log("Response",response);
  return response.data;
};

export const createTicket = async (ticket:ITicket) => {
  const response = await axios.post(API_URL, ticket);
  return response.data;
};