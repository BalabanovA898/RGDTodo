using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController
    {
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

        [Authorize]
        [HttpPost]
        public IActionResult Logout()
        {
            throw new NotImplementedException();
        }
    }
}