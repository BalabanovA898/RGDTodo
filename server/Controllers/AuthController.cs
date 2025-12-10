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

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            if (_dbService.ValidatePassword(login))
            {
                var user = _dbService.GetUserByEmail(login.Email);
                var session = _sessionService.CreateSession(user.Id);
                return Ok(new {session = session, userDTO = user});
            }
            return Unauthorized();
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] LoginDTO register)
        {
            CreateUserDTO user = new CreateUserDTO
            {
                Email = register.Email,
                Password = register.Password
            };
            var userId = _dbService.CreateUser(user);

            return Ok(new {
                session = _sessionService.CreateSession(_dbService.GetUserByEmail(user.Email).Id),
                user = _dbService.GetUserById(userId)
            } );
        }

        [Route("logout")]
        [HttpPost]
        public IActionResult Logout()
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                _sessionService.DeleteSession(authorization);
                return Ok();
            } catch (Exception e) {
                return Unauthorized(e.Message);
            }
        }

        [Route("refresh")]
        [HttpGet]
        public IActionResult Refresh ()
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            var id = _sessionService.GetSessionUserId(authorization);
            if (id != null)
                return Ok(new {
                    session = authorization, 
                    userDTO = _dbService.GetUserById(id ?? Guid.NewGuid())
                });
            return Unauthorized();
        }
    }
}