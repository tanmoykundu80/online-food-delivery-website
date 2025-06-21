using Microsoft.AspNetCore.Mvc;
using Yammiee.Models.Repository;
using Yammiee.Models;

namespace Yammiee.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly Idatarepository<Admin> _repos;

        public AdminController(Idatarepository<Admin> repos)
        {
            _repos = repos;
        }

        [HttpPost]
        public IActionResult AdminReg([FromBody] Admin Obj)
        {
            bool success = _repos.Register(Obj);
            return Ok(success);
        }

        [HttpGet]
        public IActionResult ShowAdmins()
        {
            return Ok(_repos.GetAll());
        }

        [HttpPost]
        public IActionResult AdminLogin([FromBody] Admin Obj)
        {
            bool success = _repos.Login(Obj);
            return Ok(success);
        }

        // ✅ Added: Delete Admin by Email
        [HttpDelete("{email}")]
        public IActionResult Delete(string email)
        {
            var result = _repos.DeleteByEmail(email);
            if (result)
                return Ok(new { message = "Admin deleted successfully" });
            else
                return NotFound(new { message = "Admin not found" });
        }
    }
}
