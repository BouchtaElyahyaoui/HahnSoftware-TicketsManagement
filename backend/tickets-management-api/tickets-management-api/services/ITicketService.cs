using tickets_management_api.Models;

namespace tickets_management_api.services
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllTickets();
    }
}
