using tickets_management_api.Models;

namespace tickets_management_api.services
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllTickets();

        Task<Ticket> CreateTicket(TicketDto ticket);

        Task UpdateTicket(Ticket ticket);
        Task DeleteTicket(int id);
        Task<PaginatedResult<Ticket>> GetPaginatedTickets(int page,
            int pageSize,
            string sortBy = "Id",
            bool isDescending = false,
            string filterDescription = null,
            TicketStatusEnum? filterStatus = null);

    }
}
