namespace server.DTOs
{
    public class CreateProjectDTO
    {
        required public string Title { get; set; }
        public string? Description { get; set; }
        required public Guid UserId { get; set; }
    }
}