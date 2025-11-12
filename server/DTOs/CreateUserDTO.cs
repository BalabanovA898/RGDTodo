namespace server.DTOs
{
    public class CreateUserDTO
    {
        required public string Email { get; set; }
        required public string Password { get; set; }
    }
}