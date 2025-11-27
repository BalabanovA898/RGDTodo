using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController: Controller
    {
        private readonly IDbService _dbService;
        private readonly ISessionService _sessionService;

        public ProjectsController(IDbService dbService, ISessionService sessionService)
        {
            _dbService = dbService;
            _sessionService = sessionService;
        }
        [HttpGet]
        public IActionResult GetProjectById([FromQuery(Name = "id")] Guid id)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var project = _dbService.GetProjectById(id);
                return Ok(project);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        public IActionResult GetProjectsByUserId([FromQuery(Name = "user-id")] Guid userId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var projects = _dbService.GetProjectsByUserId(userId);
                return Ok(projects);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateProject([FromBody] CreateProjectDTO project)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var projectId = _dbService.CreateProject(project);
                return Ok(projectId);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateProject([FromBody] UpdateProjectDTO project, [FromQuery(Name = "user")] Guid userId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try
            {
                var projectId = _dbService.UpdateProject(userId, project);
                return Ok(projectId);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteProject([FromQuery(Name = "user")] Guid userId, [FromQuery(Name = "id")] Guid projectId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try
            {
                _dbService.DeleteProject(userId, projectId);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } 
    }
}