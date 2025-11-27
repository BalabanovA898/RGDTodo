using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        readonly ISessionService _sessionService;
        readonly IDbService _dbService;

        public AuthController(ISessionService sessionService, IDbService dbService)
        {
            _sessionService = sessionService;
            _dbService = dbService;
        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            if (_dbService.ValidatePassword(login))
            {
                var session = _sessionService.CreateSession();
                return Ok(session);
            }
            return Unauthorized();
        }

        [HttpPost]
        public IActionResult Register([FromBody] LoginDTO register)
        {
            CreateUserDTO user = new CreateUserDTO
            {
                Email = register.Email,
                Password = register.Password
            };
            _dbService.CreateUser(user);
            return Ok(_sessionService.CreateSession());
        }

        [HttpPost]
        public IActionResult ResetPassword([FromBody] ResetPasswordDTO reset)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult ResetRequest([FromQuery] Guid id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Logout([FromQuery]Guid sessionId)
        {
            try {
                _sessionService.DeleteSession(sessionId);
                return Ok();
            } catch (Exception e) {
                return Unauthorized(e.Message);
            }
        }
    }
}