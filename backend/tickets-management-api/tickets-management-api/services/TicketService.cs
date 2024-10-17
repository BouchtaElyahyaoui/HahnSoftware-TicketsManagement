using tickets_management_api.Models;
using tickets_management_api.Repositories;

namespace tickets_management_api.services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _repository;

        public TicketService(ITicketRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Ticket>> GetAllTickets()
        {
            return await _repository.GetAllTickets();
        }

        public async Task<Ticket> CreateTicket(Ticket ticket)
        {
            ticket.CreatedAt = DateTime.UtcNow;
            return await _repository.CreateTicket(ticket);
        }

        public async Task UpdateTicket(Ticket ticket)
        {
            await _repository.UpdateTicket(ticket);
        }


    }
}
