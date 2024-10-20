using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using tickets_management_api.Controllers;
using tickets_management_api.Models;
using tickets_management_api.services;
using Xunit;

namespace tickets_management_api.Tests.Controllers
{
    public class TicketsControllerTests
    {
        private readonly Mock<ITicketService> _mockService;
        private readonly TicketsController _controller;

        public TicketsControllerTests()
        {
            _mockService = new Mock<ITicketService>();
            _controller = new TicketsController(_mockService.Object);
        }

        [Fact]
        public async Task CreateTicket_Returns_Ok_With_Tickets_List()
        {
            var ticketDto = new TicketDto { Description = "Test ticket", Status = TicketStatusEnum.OPEN };
            var createdTicket = new Ticket { Id = 1, Description = "Test ticket", Status = TicketStatusEnum.OPEN };
            var ticketsList = new List<Ticket> { createdTicket };

            _mockService.Setup(s => s.CreateTicket(It.IsAny<TicketDto>())).ReturnsAsync(createdTicket);
            _mockService.Setup(s => s.GetAllTickets()).ReturnsAsync(ticketsList);

            var result = await _controller.CreateTicket(ticketDto) as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(ticketsList, result.Value);
        }

        [Fact]
        public async Task UpdateTicket_Returns_NoContent_On_Success()
        {
            var ticket = new Ticket { Id = 1, Description = "Updated ticket", Status = TicketStatusEnum.CLOSED };

            _mockService.Setup(s => s.UpdateTicket(ticket)).Returns(Task.CompletedTask);

            var result = await _controller.UpdateTicket(1, ticket) as NoContentResult;

            Assert.NotNull(result);
            Assert.Equal(204, result.StatusCode); 
        }

        [Fact]
        public async Task UpdateTicket_Returns_BadRequest_When_Id_Does_Not_Match()
        {
            var ticket = new Ticket { Id = 2, Description = "Updated ticket", Status = TicketStatusEnum.CLOSED };

            var result = await _controller.UpdateTicket(1, ticket) as BadRequestResult;

            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode); 
        }

        [Fact]
        public async Task DeleteTicket_Returns_NoContent_On_Success()
        {
           
            _mockService.Setup(s => s.DeleteTicket(1)).Returns(Task.CompletedTask);

           
            var result = await _controller.DeleteTicket(1) as NoContentResult;

          
            Assert.NotNull(result);
            Assert.Equal(204, result.StatusCode); 
        }

        [Fact]
        public async Task GetPaginatedTickets_Returns_Ok_With_Paginated_Result()
        {
           
            var paginatedResult = new PaginatedResult<Ticket>
            {
                Data = new List<Ticket>
                {
                    new Ticket { Id = 1, Description = "Test ticket 1", Status = TicketStatusEnum.OPEN }
                },
                Page = 1,
                PageSize = 1,
                TotalCount = 1
            };

            _mockService.Setup(s => s.GetPaginatedTickets(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(paginatedResult);

            
            var result = await _controller.GetPaginatedTickets(1, 1) as OkObjectResult;

            
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(paginatedResult, result.Value);
        }
    }
}
