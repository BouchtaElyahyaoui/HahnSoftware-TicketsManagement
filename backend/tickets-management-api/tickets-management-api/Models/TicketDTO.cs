namespace tickets_management_api.Models
{
  public class TicketDto
{
    public required string Description { get; set; }
    public TicketStatusEnum Status { get; set; }  
}

}
