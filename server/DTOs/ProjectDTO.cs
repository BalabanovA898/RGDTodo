namespace server.DTOs
{
    public class ProjectDTO
    {
        public Guid Id { get; set; }
        required public string Title { get; set; }
        public string? Description { get; set; }
        required public string Diagram { get; set; } 
        public Guid UserId { get; set; }
    }
}