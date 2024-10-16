using tickets_management_api.Models;

namespace tickets_management_api.Repositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllTickets();
       
    }
}
