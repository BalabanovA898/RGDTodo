namespace server.DTOs
{
    public class UpdateUserDTO
    {
        required public string Email { get; set; }
        public string[]? Stack { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public string? Username { get; set; }
    }
}