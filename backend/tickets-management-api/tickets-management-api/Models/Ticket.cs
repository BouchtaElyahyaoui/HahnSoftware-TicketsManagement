namespace tickets_management_api.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public required string Description { get; set; }

        public TicketStatusEnum Status { get; set; } = TicketStatusEnum.OPEN;

        public DateTime CreatedAt { get; set; }
    }

}
