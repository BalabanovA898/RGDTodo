using server.Models;

namespace server.DTOs
{
    public class UpdateTaskDTO
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public string? Status { get; set; }
    }    
}