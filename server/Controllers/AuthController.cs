using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController
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
           throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Register([FromBody] LoginDTO register)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult ResetPassword([FromBody] ResetPasswordDTO reset)
        {
            throw new NotImplementedException();
        }

        [HttpPost("{id}")]
        public IActionResult ResetRequest([FromQuery] Guid id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Logout()
        {
            throw new NotImplementedException();
        }
    }
}