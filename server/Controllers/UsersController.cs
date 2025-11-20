using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpGet]
        public IActionResult GetUserById([FromQuery(Name = "id")] Guid Id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public IActionResult GetUsersByProjectId([FromQuery(Name = "project-id")] Guid projectId)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserDTO user)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public IActionResult UpdateUser([FromBody] UpdateUserDTO user)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult DeleteUser([FromQuery(Name = "id")] Guid Id)
        {
            throw new NotImplementedException();
        }
    }
}