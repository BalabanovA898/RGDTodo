namespace server.Models
{
    public class PasswordResetRequest
    {
        public Guid Id { get; set; }
        required public string Email { get; set; }
    }
}