using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/project-members")]
    public class ProjectMembersController: Controller
    {
        private readonly IDbService _dbService;
        private readonly ISessionService _sessionService;

        public ProjectMembersController(IDbService dbService, ISessionService sessionService)
        {
            _dbService = dbService;
            _sessionService = sessionService;
        }

        [HttpPost]
        public IActionResult AddProjectMember([FromQuery(Name = "project-id")] Guid projectId, [FromQuery(Name = "user-id")] Guid userId)
        {
            var authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try
            {
                _dbService.AddProjectMember(projectId, userId);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult RemoveProjectMember([FromQuery(Name = "project-id")] Guid projectId, [FromQuery(Name = "user-id")] Guid userId)
        {
            var authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try
            {
                _dbService.RemoveProjectMember(projectId, userId);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}