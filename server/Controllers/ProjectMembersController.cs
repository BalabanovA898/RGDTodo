using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/project-members")]
    public class ProjectMembersController
    {
        [HttpPost]
        public IActionResult AddProjectMember([FromQuery(Name = "project-id")] Guid projectId, [FromQuery(Name = "user-id")] Guid userId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult RemoveProjectMember([FromQuery(Name = "project-id")] Guid projectId, [FromQuery(Name = "user-id")] Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}