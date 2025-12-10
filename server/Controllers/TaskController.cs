
using server.DTOs;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController: Controller
    {
        private readonly ISessionService _sessionService;
        private readonly IDbService _dbService;
        public TaskController(IDbService dbService, ISessionService sessionService)
        {
            _dbService = dbService;   
            _sessionService = sessionService;
        }

        [HttpGet]
        public IActionResult GetProjectTasks([FromQuery(Name = "project-id")] Guid projectId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var tasks = _dbService.GetTasksByProjectId(projectId);
                return Ok(tasks);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpPost]
        public IActionResult CreateTask([FromBody] CreateTaskDTO task)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var taskId = _dbService.CreateTask(task);
                return Ok(taskId);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateTask([FromBody] UpdateTaskDTO task)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                var taskId = _dbService.UpdateTask(task);
                return Ok(taskId);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteTask([FromQuery(Name = "id")] Guid taskId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                _dbService.DeleteTask(taskId);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("assign")]
        public IActionResult AssignToTask ([FromQuery(Name="user-id")] Guid userId, [FromQuery(Name="task-id")] Guid taskId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                _dbService.AssignToTask(taskId, userId);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("assign")]
        public IActionResult RemoveAssignToTask ([FromQuery(Name="user-id")] Guid userId, [FromQuery(Name="task-id")] Guid taskId)
        {
            Guid authorization = Guid.Parse(Request.Headers["Authorization"]);
            if (!_sessionService.ValidateSession(authorization))
                return Unauthorized();
            try {
                _dbService.RemoveAssignToTask(taskId, userId);
                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}