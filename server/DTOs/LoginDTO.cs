namespace server.DTOs
{
    public class LoginDTO
    {
        required public string Email { get; set; }
        required public string Password { get; set; }
    }
}