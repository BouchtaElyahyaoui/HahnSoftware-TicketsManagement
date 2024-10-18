import axios from 'axios';
import { ITicket } from './types';


const API_URL = 'http://localhost:5000/api/Tickets';


export const getTickets = async () : Promise<ITicket[]> => {
  const response = await axios.get(API_URL);
  return response.data as ITicket[];
};

export const createTicket = async (ticket:ITicket) : Promise<ITicket[]> => {
  const response = await axios.post(API_URL, ticket);
  return response.data as ITicket[];
};

export const editTicket = async (id:number,ticket:ITicket) : Promise<void> => {
  await axios.put(`${API_URL}/${id}`,ticket)
}

export const deleteTicket = async (id:number) : Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}