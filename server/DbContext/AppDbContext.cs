using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<PasswordResetRequest> PasswordResetRequests { get; set; }
        public DbSet<AssignedToTask> AssignedToTasks { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
    }
}