using server.Models;

namespace server.DTOs
{
    public class TaskDTO
    {
        public Guid Id {get; set;}
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? Deadline { get; set; }
        public Guid? ParentId { get; set; }
        public Guid ProjectId { get; set; }
        public string Status { get; set; }
        public UserDTO[]? Assigned {get; set;}
    }
}