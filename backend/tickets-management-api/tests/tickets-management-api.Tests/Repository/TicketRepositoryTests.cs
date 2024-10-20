using Microsoft.EntityFrameworkCore;
using tickets_management_api.Data;
using tickets_management_api.Models;
using tickets_management_api.Repositories;
using Xunit;

public class TicketRepositoryTests
{
    private readonly TicketRepository _ticketRepository;
    private readonly DataContext _context;

    public TicketRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "TicketDatabase")
            .Options;
        _context = new DataContext(options);
        _ticketRepository = new TicketRepository(_context);

        SeedDatabase();
    }

    private void SeedDatabase()
    {
        _context.Tickets.AddRange(
            new Ticket { Id = 1, Description = "Test Ticket 1", Status = TicketStatusEnum.OPEN, CreatedAt = DateTime.Now },
            new Ticket { Id = 2, Description = "Test Ticket 2", Status = TicketStatusEnum.CLOSED, CreatedAt = DateTime.Now }
        );
        _context.SaveChanges();
    }

    [Fact]
    public async Task GetAllTickets_ShouldReturnAllTickets()
    {
        var result = await _ticketRepository.GetAllTickets();
        Assert.Equal(2, result.Count());
    }
}
