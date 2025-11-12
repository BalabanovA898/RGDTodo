namespace server.DTOs
{
    public class UpdateProjectDTO
    {   
        required public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Diagram { get; set; }
    }
}