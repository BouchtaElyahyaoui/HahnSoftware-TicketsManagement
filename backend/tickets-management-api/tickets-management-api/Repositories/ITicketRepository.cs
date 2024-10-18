﻿using tickets_management_api.Models;

namespace tickets_management_api.Repositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllTickets();
        Task<Ticket> CreateTicket(TicketDto ticket);
        Task UpdateTicket(Ticket ticket);
        Task DeleteTicket(int id);

        Task<PaginatedResult<Ticket>> GetPaginatedTickets(int page,int pageSize);

    }
}
