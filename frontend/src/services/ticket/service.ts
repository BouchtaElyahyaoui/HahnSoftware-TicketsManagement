import axios from 'axios';
import { IPaginatedResult, ITicket, ITicketFilter, SortByEnum } from './types';


const API_URL = 'http://localhost:5000/api/Tickets';

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

export const getPaginatedResult = async (
  page: number,
  pageSize: number,
  ticketFilter: ITicketFilter
): Promise<IPaginatedResult> => {
  const { description, isDescending, sortBy, status } = ticketFilter;
  const params: {
    page: string;
    pageSize: string;
    sortBy?: SortByEnum;
    isDescending?: string;
    filterDescription?: string;
    filterStatus?: string;
  } = {
    page:String(page),
    pageSize:String(pageSize),
    ...(sortBy && { sortBy }),
    ...(typeof isDescending === 'boolean' && { isDescending:String(isDescending) }),
    ...(description && description.trim() !== '' && { filterDescription: description }),
    ...(status && { filterStatus: status })
  };

  const queryString = new URLSearchParams(params).toString();
  const response = await axios.get(`${API_URL}?${queryString}`);

  return response.data as IPaginatedResult;
};