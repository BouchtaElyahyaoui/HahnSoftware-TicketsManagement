using Microsoft.EntityFrameworkCore;
using System;
using tickets_management_api.Data;
using tickets_management_api.Models;

namespace tickets_management_api.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly DataContext _dataContext;

        public TicketRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<IEnumerable<Ticket>> GetAllTickets()
        {
            return await _dataContext.Tickets.ToListAsync();
        }
    }
}
