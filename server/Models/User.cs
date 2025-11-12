namespace server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string[] Stack { get; set; }
        public byte[] ProfilePicture { get; set; }
    }
}