namespace server.Services
{
    public interface ISessionService
    {
        public Guid CreateSession(Guid userId);
        public bool ValidateSession(Guid sessionId);
        public void DeleteSession(Guid sessionId);
        public Guid? GetSessionUserId (Guid sessionId);
    }
}