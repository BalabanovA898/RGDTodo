namespace server.Models
{
    public class Session
    {
        public Guid Id { get; set; }
        public DateTime Expires { get; set; }
    }
}