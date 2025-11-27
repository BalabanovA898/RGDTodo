

using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    [PrimaryKey("TaskId", "UserId")]
    public class AssignedToTask
    {
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }
    }
}