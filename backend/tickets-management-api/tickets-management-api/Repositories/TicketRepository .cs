using Microsoft.EntityFrameworkCore;
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

        public async Task<Ticket> CreateTicket(Ticket ticket)
        {
            _dataContext.Tickets.Add(ticket);
            await _dataContext.SaveChangesAsync();
            return ticket;
        }

        public async Task UpdateTicket(Ticket ticket)
        {
            _dataContext.Entry(ticket).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
        }
    }
}
