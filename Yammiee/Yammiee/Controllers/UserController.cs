using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yammiee.Models;
using Yammiee.Models.Repository;
using System.Linq;

namespace Yammiee.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Idatarepository<User> _repos;

        public UserController(Idatarepository<User> repos)
        {
            _repos = repos;
        }

        [HttpPost]
        public IActionResult UserReg(User Obj)
        {
            bool success = _repos.Register(Obj);
            if (success)
                return Ok("Registration Success");
            else
                return BadRequest("Error Occured");
        }

        [HttpPost]
        public IActionResult UserLogin(User Obj)
        {
            bool Success = _repos.Login(Obj);
            if (Success)
                return Ok("Login Successful");
            else
                return BadRequest("Invaild Email or Password");
        }

        [HttpGet]
        public IActionResult ShowUsers()
        {
            return Ok(_repos.GetAll());
        }

        [HttpGet]
        public IActionResult GetUsersPaged(int pageNumber = 1, int pageSize = 10)
        {
            var users = _repos.GetAll().ToList(); // ensure it's a List
            var totalUsers = users.Count;
            var pagedUsers = users
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                TotalCount = totalUsers,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Users = pagedUsers
            };

            return Ok(result);
        }

        // ✅ NEW: Delete User By Email
        [HttpDelete]
        public IActionResult DeleteUserByEmail([FromQuery] string email)
        {
            Console.WriteLine("Delete request received for email: " + email);

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { message = "Email is required." });

            bool result = _repos.DeleteByEmail(email);
            if (result)
                return Ok(new { message = "User deleted successfully." });
            else
                return NotFound(new { message = "User not found." });
        }





    }
}
