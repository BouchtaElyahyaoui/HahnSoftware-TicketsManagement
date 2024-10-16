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
    }
}
