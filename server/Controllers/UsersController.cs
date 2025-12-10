using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDbService _dbService;
        private readonly ISessionService _sessionService;
        public UsersController(IDbService dbService, ISessionService sessionService)
        {
            _dbService = dbService;
            _sessionService = sessionService;
        }

        [HttpGet]
        public IActionResult GetUsersByProjectId([FromQuery(Name = "project-id")] Guid projectId)
        {
            var authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var users = _dbService.GetProjectMembers(projectId);
                return Ok(users);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateUser([FromQuery(Name = "id")] Guid userId, [FromBody] UpdateUserDTO user)
        {
            var authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var res = _dbService.UpdateUser(userId, user);
                return Ok(res);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteUser([FromQuery(Name = "id")] Guid Id)
        {
            var authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                _dbService.DeleteUser(Id);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}