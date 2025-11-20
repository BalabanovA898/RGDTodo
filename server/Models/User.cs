namespace server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        required public string Email { get; set; }
        required public string Username { get; set; }
        required public string HashedPassword { get; set; }
        required public string[] Stacks { get; set; }
        required public byte[] ProfilePicture { get; set; }
    }
}