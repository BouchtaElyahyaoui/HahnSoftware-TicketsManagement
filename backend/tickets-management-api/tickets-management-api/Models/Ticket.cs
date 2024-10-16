namespace tickets_management_api.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
