using Microsoft.AspNetCore.Mvc;
using Yammiee.Models;
using Microsoft.EntityFrameworkCore;

namespace Yammiee.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ProjectContext _context;

        public CartController(ProjectContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult SaveCartItems([FromBody] List<CartItem> items)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model state.");
            }

            if (items == null || items.Count == 0)
            {
                return BadRequest("No items to save.");
            }

            try
            {
                string userEmail = items.First().UserEmail;

                if (string.IsNullOrEmpty(userEmail))
                {
                    return BadRequest("User email is missing.");
                }

                // Clear previous cart items for this user
                var existingItems = _context.CartItems
                    .Where(c => c.UserEmail == userEmail);

                _context.CartItems.RemoveRange(existingItems);
                _context.CartItems.AddRange(items);

                _context.SaveChanges();

                return Ok(new { message = "Cart saved successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while saving the cart.", details = ex.Message });
            }
        }

        [HttpGet("{email}")]
        public IActionResult GetCartItems(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required.");
            }

            try
            {
                var items = _context.CartItems
                    .Where(c => c.UserEmail == email)
                    .ToList();

                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to fetch cart items.", details = ex.Message });
            }
        }
    }
}
