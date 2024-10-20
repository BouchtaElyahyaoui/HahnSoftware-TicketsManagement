﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public async Task<IActionResult> CreateTicket(TicketDto ticket)
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            await _service.DeleteTicket(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetPaginatedTickets(
             [FromQuery] int page = 1,
             [FromQuery] int pageSize = 10,
             [FromQuery] string sortBy = "Id",
             [FromQuery] bool isDescending = false,
             [FromQuery] string filterDescription = null,
             [FromQuery] TicketStatusEnum? filterStatus = null)
        {
            var tickets = await _service.GetPaginatedTickets(page, pageSize, sortBy, isDescending, filterDescription, filterStatus);
            return Ok(tickets);
        }
    }
}
