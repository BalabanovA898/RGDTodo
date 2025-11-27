using server.Models;

namespace server.DTOs
{
    public class CreateTaskDTO
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public Guid? ParentId { get; set; }
        public Guid ProjectId { get; set; }
        public TaskState? Status { get; set; }
    }    
}