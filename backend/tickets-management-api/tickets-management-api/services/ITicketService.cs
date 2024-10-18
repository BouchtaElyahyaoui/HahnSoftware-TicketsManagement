using tickets_management_api.Models;

namespace tickets_management_api.services
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllTickets();

        Task<Ticket> CreateTicket(TicketDto ticket);

        Task UpdateTicket(Ticket ticket);
        Task DeleteTicket(int id);


    }
}
