using server.Models;

namespace server.Services
{
    public class SessionService : ISessionService
    {
        private readonly AppDbContext _context;

        public SessionService(AppDbContext context)
        {
            _context = context;
        }
        public Guid CreateSession()
        {
            var session = new Session
            {
                Expires = DateTime.UtcNow.AddDays(1).ToUniversalTime()
            };
            _context.Sessions.Add(session);
            _context.SaveChanges();
            return session.Id;
        }

        public bool ValidateSession(Guid sessionId)
        {
            var session = _context.Sessions.FirstOrDefault(s => s.Id == sessionId);
            return session != null && session.Expires > DateTime.UtcNow;
        }

        public void DeleteSession(Guid sessionId)
        {
            var session = _context.Sessions.FirstOrDefault(s => s.Id == sessionId);
            if (session == null) throw new Exception("Session not found");
            _context.Sessions.Remove(session);
            _context.SaveChanges();
        }
    }
}