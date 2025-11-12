using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    [PrimaryKey("ProjectId", "UserId")]
    public class ProjectMember
    {
        public Guid ProjectId { get; set; }
        public Guid UserId { get; set; }
    }
}