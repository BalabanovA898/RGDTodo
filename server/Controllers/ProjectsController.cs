using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController
    {
        [Authorize]
        [HttpGet]
        public IActionResult GetProjectsByUserId([FromQuery(Name = "user-id")] Guid userId)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateProject([FromBody] CreateProjectDTO project)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPut]
        public IActionResult UpdateProject([FromBody] UpdateProjectDTO project)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpDelete]
        public IActionResult DeleteProject([FromQuery(Name = "id")] Guid Id)
        {
            throw new NotImplementedException();
        }
    }
}