import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createTicket, deleteTicket, editTicket, getPaginatedResult } from '../service';
import { IPaginatedResult, ITicket, ITicketFilter, SortByEnum, TicketStatusEnum } from '../types';


describe('Ticket API Tests', () => {
  const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

  beforeAll(() => {
    mock.reset();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should create a ticket successfully', async () => {
    const newTicket: ITicket = { id: 1, description: 'Test ticket', status: TicketStatusEnum.OPEN, createdAt: '2024-10-19 00:02:50.7720264' };

    mock.onPost('http://localhost:5000/api/Tickets').reply(201, [newTicket]);

    const result = await createTicket(newTicket);
    
    expect(result).toEqual([newTicket]);
    expect(mock.history.post.length).toBe(1);
  });

  it('should edit a ticket successfully', async () => {
    const updatedTicket: ITicket = { id: 1, description: 'Updated ticket', status: TicketStatusEnum.OPEN, createdAt: '2024-10-19 00:02:50.7720264' };

    mock.onPut('http://localhost:5000/api/Tickets/1').reply(200);

    await editTicket(1, updatedTicket);

    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].data).toEqual(JSON.stringify(updatedTicket));
  });

  it('should delete a ticket successfully', async () => {
    mock.onDelete('http://localhost:5000/api/Tickets/1').reply(204);

    await deleteTicket(1);

    expect(mock.history.delete.length).toBe(1);
  });

  it('should return paginated results', async () => {
    const ticketFiler:ITicketFilter = {
      description:'',
      isDescending:false,
      sortBy:SortByEnum.ID,
      status: null,
    } 
    const paginatedResult: IPaginatedResult = {
      data: [
        { id: 1, description: 'Test ticket 1', status: TicketStatusEnum.OPEN, createdAt: '2024-10-19 00:02:50.7720264' },
        { id: 2, description: 'Test ticket 2', status: TicketStatusEnum.CLOSED, createdAt: '2024-10-19 00:02:50.7720264' },
      ],
      page: 1,
      pageSize: 2,
      totalCount: 2,
      totalPages: 1,
    };

    mock.onGet('http://localhost:5000/api/Tickets?page=1&pageSize=2&sortBy=Id&isDescending=false').reply(200, paginatedResult);

    const result = await getPaginatedResult(1, 2,ticketFiler);

    expect(result).toEqual(paginatedResult);
    expect(mock.history.get.length).toBe(1);
  });
});
