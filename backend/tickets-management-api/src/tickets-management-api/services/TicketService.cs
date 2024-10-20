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

        public async Task<Ticket> CreateTicket(TicketDto ticket)
        {
            return await _repository.CreateTicket(ticket);
        }

        public async Task UpdateTicket(Ticket ticket)
        {
            await _repository.UpdateTicket(ticket);
        }
        public async Task DeleteTicket(int id)
        {
            await _repository.DeleteTicket(id);
        }

        public async Task<PaginatedResult<Ticket>> GetPaginatedTickets(int page, int pageSize)
        {
            return await _repository.GetPaginatedTickets(page, pageSize);
        }


    }
}
