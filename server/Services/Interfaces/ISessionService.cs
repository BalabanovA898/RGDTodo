namespace server.Services
{
    public interface ISessionService
    {
        public Guid CreateSession();
        public bool ValidateSession(Guid sessionId);
        public void DeleteSession(Guid sessionId);
    }
}