using Microsoft.AspNetCore.Mvc;
using tickets_management_api.services;

namespace tickets_management_api.Controllers
{
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
    }
}
