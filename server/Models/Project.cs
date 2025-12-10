using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        required public string Title { get; set; }
        public string? Description { get; set; }
        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
    }
}