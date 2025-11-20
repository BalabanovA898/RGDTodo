namespace server.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string[]? Stacks { get; set; }
        public byte[]? ProfilePicture { get; set; }
    }
}