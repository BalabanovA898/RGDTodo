using Microsoft.VisualBasic;
using server.DTOs;
using server.Models;

namespace server.Services
{
    public class DbService : IDbService
    {
        private readonly AppDbContext _context;

        private string TaskStateToString (TaskState value)
        {
            switch (value) {
                case TaskState.CREATED:
                    return "CREATED";
                case TaskState.CANCELLED:
                    return "CANCELLED";
                case TaskState.DONE:
                    return "DONE";
            }   
            return "WIP";
        }

        private TaskState TaskStateFromString (string value)
        {
            switch (value) {
                case "WIP":
                    return TaskState.WIP;
                case "CANCELLED":
                    return TaskState.CANCELLED;
                case "DONE":
                    return TaskState.DONE;
            }   
            return TaskState.CREATED;
        }

        public DbService(AppDbContext context)
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
                ProfilePicture = ""
            };

            _context.Users.Add(userToCreate);
            _context.SaveChanges();
            return userToCreate.Id;
        }
        public Guid UpdateUser(Guid userId, UpdateUserDTO user)
        {
            var userToUpdate = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (userToUpdate == null) throw new Exception("User not found");
            Console.WriteLine(user.ProfilePicture);
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
                UserId = project.UserId
            };
        }
        public ProjectDTO[] GetProjectsByUserId(Guid userId)
        {
            var projects = _context.Projects.Where(p => p.UserId == userId).ToList();
            var usersProjects = _context.ProjectMembers.Where(pm => pm.UserId == userId).ToArray();
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
                UserId = p.UserId
            }).ToArray();
        }
        public Guid CreateProject(CreateProjectDTO project)
        {
            var projectToCreate = new Project
            {
                Title = project.Title,
                Description = project.Description,
                UserId = project.UserId
            };

            _context.Projects.Add(projectToCreate);
            _context.SaveChanges();
            return projectToCreate.Id;
        }
        public Guid UpdateProject(Guid userId, UpdateProjectDTO project)   
        {
            var projectToUpdate = _context.Projects.FirstOrDefault(p => p.Id == project.Id);
            if (projectToUpdate == null) throw new Exception("Project not found");
            if (projectToUpdate.UserId != userId) throw new Exception("Must be owner");
            if (project.Title != null) projectToUpdate.Title = project.Title;
            if (project.Description != null) projectToUpdate.Description = project.Description;
            _context.SaveChanges();
            return projectToUpdate.Id;
        }
        public void DeleteProject(Guid userId, Guid projectId)
        {
            var projectToDelete = _context.Projects.FirstOrDefault(p => p.Id == projectId);
            if (projectToDelete == null) throw new Exception("Project not found");
            if (projectToDelete.UserId != userId) throw new Exception("Must be owner");
            _context.Projects.Remove(projectToDelete);
            var tasksToDelete = _context.Tasks.Where(t => t.ProjectId == projectId).ToArray();
            foreach (var item in tasksToDelete)
            {
                var assigmentsToRemove = _context.AssignedToTasks.Where(a => a.TaskId == item.Id);
                _context.RemoveRange(assigmentsToRemove);
            }
            _context.Tasks.RemoveRange(tasksToDelete);
            _context.SaveChanges();
        }
        public UserDTO[] GetProjectMembers(Guid projectId)
        {
            List<UserDTO> users = [];
            var usersWhoParticipated = _context.ProjectMembers.Where(p => p.ProjectId == projectId).ToArray();
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
            var project = _context.Projects.FirstOrDefault(p => p.Id == projectId);
            if (project.UserId == userId) 
                throw new Exception("There'no reason to invite yorself.");
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
        public TaskDTO[] GetTasksByProjectId(Guid projectId)
        {
            var tasks = _context.Tasks.Where(t => t.ProjectId == projectId).ToList();
            TaskDTO[] tasksDTO = new TaskDTO[tasks.Count];
            for (int i = 0; i < tasks.Count; i++)
            {
                Console.WriteLine(tasks[i].Id);
                var AssignedUsers = _context.Users.Where(u => _context.AssignedToTasks.Any(at => at.TaskId == tasks[i].Id && at.UserId == u.Id));
                var AssignedUsersDTO = AssignedUsers.Select(i => new UserDTO
                {
                    Id = i.Id,
                    Username = i.Username,
                    Email =  i.Email,
                    ProfilePicture = i.ProfilePicture,
                    Stacks = i.Stacks
                }).ToArray();

                tasksDTO[i] = new TaskDTO
                {
                    Id = tasks[i].Id,
                    Title = tasks[i].Title,
                    Description = tasks[i].Description,
                    Deadline = tasks[i].Deadline,
                    ParentId = tasks[i].ParentId,
                    ProjectId = tasks[i].ProjectId,
                    Status = TaskStateToString(tasks[i].Status),
                    Assigned = AssignedUsersDTO
                };
            }
            return tasksDTO;
        }
        public Guid CreateTask(CreateTaskDTO task)
        {
            Models.Task taskToCreate = new Models.Task
            {
                Title = task.Title,
                Description = task.Description ?? "",
                Deadline = task.Deadline,
                ParentId = task.ParentId,
                ProjectId = task.ProjectId,
                Status = TaskStateFromString(task.Status)
            };
            _context.Tasks.Add(taskToCreate);
            _context.SaveChanges();
            return taskToCreate.Id;
        }

        public Guid UpdateTask(UpdateTaskDTO task)
        {
            var taskToUpdate = _context.Tasks.FirstOrDefault(t => t.Id == task.Id);
            if (taskToUpdate == null) throw new Exception("Task not found");
            if (task.Title != null) taskToUpdate.Title = task.Title;
            if (task.Description != null) taskToUpdate.Description = task.Description;
            if (task.Deadline != null) taskToUpdate.Deadline = task.Deadline;
            if (task.Status != null) taskToUpdate.Status = TaskStateFromString(task.Status);
            _context.SaveChanges();
            return taskToUpdate.Id;
        }
        public void DeleteTask(Guid taskId)
        {
            var taskToDelete = _context.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (taskToDelete == null) throw new Exception("Task not found");
            var tasksChildren = _context.Tasks.Where(t => t.ParentId == taskId).ToList();
            _context.Tasks.Remove(taskToDelete);
            while (tasksChildren.Count > 0)
            {
                tasksChildren.AddRange(_context.Tasks.Where(t => t.ParentId == tasksChildren[0].Id));
                _context.Tasks.Remove(tasksChildren[0]);
                tasksChildren.RemoveAt(0);
            }
            _context.SaveChanges();
        }

        public void AssignToTask (Guid taskId, Guid userId)
        {
            var taskToAsignTo = _context.Tasks.FirstOrDefault(t => t.Id == taskId);   
            if (taskToAsignTo == null) throw new Exception("Task not found");
            _context.AssignedToTasks.Add(new AssignedToTask{TaskId = taskId, UserId = userId});
            _context.SaveChanges();
        }
        public void RemoveAssignToTask (Guid taskId, Guid userId)
        {
            var taskToAsignTo = _context.AssignedToTasks.FirstOrDefault(t => t.TaskId == taskId && t.UserId == userId);   
            if (taskToAsignTo == null) throw new Exception("Assigment not found");
            _context.AssignedToTasks.Remove(taskToAsignTo);
            _context.SaveChanges();
        }
    }
}