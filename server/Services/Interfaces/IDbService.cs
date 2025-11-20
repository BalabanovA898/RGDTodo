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
        public Guid UpdateProject(Guid projectId, UpdateProjectDTO project);
        public void DeleteProject(Guid projectId);
        public UserDTO[] GetProjectMembers(Guid projectId);

        public void AddProjectMember(Guid projectId, Guid userId);
        public void RemoveProjectMember(Guid projectId, Guid userId);
        public bool ValidatePassword(LoginDTO login);
    }
}