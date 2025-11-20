using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController
    {
        [HttpGet]
        public IActionResult GetProjectsByUserId([FromQuery(Name = "user-id")] Guid userId)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult CreateProject([FromBody] CreateProjectDTO project)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public IActionResult UpdateProject([FromBody] UpdateProjectDTO project)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult DeleteProject([FromQuery(Name = "id")] Guid Id)
        {
            throw new NotImplementedException();
        }
    }
}