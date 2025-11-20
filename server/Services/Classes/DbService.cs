using server.DTOs;
using server.Models;

namespace server.Services
{
    public class DbService : IDbService
    {
        private readonly AppDbContext _context;

        internal DbService(AppDbContext context)
        {
            _context = context;
        }

        public UserDTO GetUserById(Guid id) 
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) throw new Exception("User not found");
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Stacks = user.Stacks,
                ProfilePicture = user.ProfilePicture
            };
        }
        public UserDTO GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null) throw new Exception("User not found");
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Stacks = user.Stacks,
                ProfilePicture = user.ProfilePicture
            };
        }
        public Guid CreateUser(CreateUserDTO user) {
            var userToCreate = new User
            {
                Username = user.Email,
                Email = user.Email,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password),
                Stacks = [],
                ProfilePicture = []
            };

            _context.Users.Add(userToCreate);
            _context.SaveChanges();
            return userToCreate.Id;
        }
        public Guid UpdateUser(Guid userId, UpdateUserDTO user)
        {
            var userToUpdate = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (userToUpdate == null) throw new Exception("User not found");
            if (user.Email != null) userToUpdate.Email = user.Email;
            if (user.Username != null) userToUpdate.Username = user.Username;
            if (user.Stacks != null) userToUpdate.Stacks = user.Stacks;
            if (user.ProfilePicture != null) userToUpdate.ProfilePicture = user.ProfilePicture;
            _context.SaveChanges();
            return userToUpdate.Id;
        }
        public void DeleteUser(Guid userId)
        {
            var userToDelete = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (userToDelete == null) throw new Exception("User not found");
            _context.Users.Remove(userToDelete);
            _context.SaveChanges();
        }

        public ProjectDTO GetProjectById(Guid id)
        {
            var project = _context.Projects.FirstOrDefault(p => p.Id == id);
            if (project == null) throw new Exception("Project not found");
            return new ProjectDTO
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                Diagram = project.Diagram,
                UserId = project.UserId
            };
        }
        public ProjectDTO[] GetProjectsByUserId(Guid userId)
        {
            var projects = _context.Projects.Where(p => p.UserId == userId).ToList();
            var usersProjects = _context.ProjectMembers.Where(pm => pm.UserId == userId);
            foreach (var project in usersProjects)
            {
                var userProject = _context.Projects.FirstOrDefault(p => p.Id == project.ProjectId);
                if (userProject != null)    
                    projects.Add(userProject);
            }
            return projects.Select(p => new ProjectDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Diagram = p.Diagram,
                UserId = p.UserId
            }).ToArray();
        }
        public Guid CreateProject(CreateProjectDTO project)
        {
            var projectToCreate = new Project
            {
                Title = project.Title,
                Description = project.Description,
                Diagram = project.Diagram,
                UserId = project.UserId
            };

            _context.Projects.Add(projectToCreate);
            _context.SaveChanges();
            return projectToCreate.Id;
        }
        public Guid UpdateProject(Guid projectId, UpdateProjectDTO project)
        {
            var projectToUpdate = _context.Projects.FirstOrDefault(p => p.Id == projectId);
            if (projectToUpdate == null) throw new Exception("Project not found");
            if (project.Title != null) projectToUpdate.Title = project.Title;
            if (project.Description != null) projectToUpdate.Description = project.Description;
            if (project.Diagram != null) projectToUpdate.Diagram = project.Diagram;
            _context.SaveChanges();
            return projectToUpdate.Id;
        }
        public void DeleteProject(Guid projectId)
        {
            var projectToDelete = _context.Projects.FirstOrDefault(p => p.Id == projectId);
            if (projectToDelete == null) throw new Exception("Project not found");
            _context.Projects.Remove(projectToDelete);
            _context.SaveChanges();
        }
        public UserDTO[] GetProjectMembers(Guid projectId)
        {
            List<UserDTO> users = [];
            var usersWhoParticipated = _context.ProjectMembers.Where(p => p.ProjectId == projectId);
            foreach (var user in usersWhoParticipated)
            {
                var projectMember = _context.Users.FirstOrDefault(p => p.Id == user.UserId);
                if (projectMember != null)
                    users.Add(new UserDTO
                    {
                        Id = projectMember.Id,
                        Email = projectMember.Email,
                        Username = projectMember.Username,
                        Stacks = projectMember.Stacks,
                        ProfilePicture = projectMember.ProfilePicture
                    });
            }
            return users.ToArray();
        }

        public void AddProjectMember(Guid projectId, Guid userId)
        {
            var projectMember = new ProjectMember
            {
                ProjectId = projectId,
                UserId = userId
            };
            _context.ProjectMembers.Add(projectMember);
            _context.SaveChanges();
        }
        public void RemoveProjectMember(Guid projectId, Guid userId)
        {
            var projectMember = _context.ProjectMembers.FirstOrDefault(p => p.ProjectId == projectId && p.UserId == userId);
            if (projectMember == null) throw new Exception("Relation not found");
            _context.ProjectMembers.Remove(projectMember);
            _context.SaveChanges();
        }

        public bool ValidatePassword(LoginDTO login)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == login.Email);
            if (user == null) throw new Exception("User not found");
            return BCrypt.Net.BCrypt.Verify(login.Password, user.HashedPassword);
        }
    }
}