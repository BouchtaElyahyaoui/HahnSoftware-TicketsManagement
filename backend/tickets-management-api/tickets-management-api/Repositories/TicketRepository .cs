﻿using Microsoft.EntityFrameworkCore;
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
    }
}
