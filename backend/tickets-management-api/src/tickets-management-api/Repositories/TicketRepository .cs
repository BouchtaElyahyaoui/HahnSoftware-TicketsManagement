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

        public async Task<Ticket> CreateTicket(TicketDto ticketDto)
        {
            var ticket = new Ticket
            {
                Description = ticketDto.Description,
                Status = ticketDto.Status,
                CreatedAt = DateTime.Now
            };

            _dataContext.Tickets.Add(ticket);
            await _dataContext.SaveChangesAsync();
            return ticket;
        }

        public async Task UpdateTicket(Ticket ticket)
        {
            _dataContext.Entry(ticket).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteTicket(int id)
        {
            var ticket = await _dataContext.Tickets.FindAsync(id);
            if (ticket != null)
            {
                _dataContext.Tickets.Remove(ticket);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<PaginatedResult<Ticket>> GetPaginatedTickets(
            int page,
            int pageSize,
            string sortBy = "Id", 
            bool isDescending = false, 
            string filterDescription = null, 
            TicketStatusEnum? filterStatus = null)
        {
            var query = _dataContext.Tickets.AsQueryable();

            if (!string.IsNullOrEmpty(filterDescription))
            {
                query = query.Where(t => t.Description.Contains(filterDescription));
            }

            if (filterStatus.HasValue)
            {
                query = query.Where(t => t.Status == filterStatus.Value);
            }

            switch (sortBy.ToLower())
            {
                case "description":
                    query = isDescending ? query.OrderByDescending(t => t.Description) : query.OrderBy(t => t.Description);
                    break;
                case "status":
                    query = isDescending ? query.OrderByDescending(t => t.Status) : query.OrderBy(t => t.Status);
                    break;
                case "createdat":
                    query = isDescending ? query.OrderByDescending(t => t.CreatedAt) : query.OrderBy(t => t.CreatedAt);
                    break;
                default:
                    query = isDescending ? query.OrderByDescending(t => t.Id) : query.OrderBy(t => t.Id);
                    break;
            }

            var totalCount = await query.CountAsync();

            var tickets = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResult<Ticket>
            {
                Data = tickets,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };
        }

    }
}
