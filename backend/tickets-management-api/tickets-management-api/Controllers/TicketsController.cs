using Microsoft.AspNetCore.Mvc;
using tickets_management_api.Models;
using tickets_management_api.services;

namespace tickets_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _service;

        public TicketsController(ITicketService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            var tickets = await _service.GetAllTickets();
            return Ok(tickets);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(Ticket ticket)
        {
            var createdTicket = await _service.CreateTicket(ticket);
            var tickets = await _service.GetAllTickets();
            return Ok(tickets);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }
            await _service.UpdateTicket(ticket);
            return NoContent();
        }
    }
}
