using server.DTOs;

namespace server.Services
{
    public interface IDbService
    {
        public UserDTO GetUserById(Guid id);
        public UserDTO GetUserByEmail(string email);
        public Guid CreateUser(CreateUserDTO user);
        public Guid UpdateUser(Guid userId, UpdateUserDTO user); 
        public void DeleteUser(Guid userId);

        public ProjectDTO GetProjectById(Guid id);
        public ProjectDTO[] GetProjectsByUserId(Guid userId);
        public Guid CreateProject(CreateProjectDTO project);
        public Guid UpdateProject(Guid userId, UpdateProjectDTO project);
        public void DeleteProject(Guid userId,Guid projectId);
        public UserDTO[] GetProjectMembers(Guid projectId);

        public void AddProjectMember(Guid projectId, Guid userId);
        public void RemoveProjectMember(Guid projectId, Guid userId);
        public bool ValidatePassword(LoginDTO login);


        public TaskDTO GetTaskById(Guid id);
        public TaskDTO[] GetTasksByProjectId(Guid projectId);
        public Guid CreateTask(CreateTaskDTO task);
        public Guid UpdateTask(UpdateTaskDTO task);
        public void DeleteTask(Guid taskId);
    }
}