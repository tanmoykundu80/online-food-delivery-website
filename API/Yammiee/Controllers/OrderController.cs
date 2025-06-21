using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Yammiee.Models;
using Yammiee.Models.DTOs;

namespace Yammiee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ProjectContext _context;

        public OrderController(ProjectContext context)
        {
            _context = context;
        }

        // ✅ Save a new order
        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] OrderRequest request)
        {
            if (request == null || request.Items == null || !request.Items.Any())
                return BadRequest(new { message = "Invalid order data." });

            var order = new Order
            {
                UserEmail = request.UserEmail,
                Address = request.Address,
                Date = DateTime.Now,
                Status = "Pending",
                Items = request.Items.Select(i => new OrderItem
                {
                    Name = i.Name,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order saved successfully." });
        }

        // ✅ Get all orders placed by a specific user
        [HttpGet("getbyuser/{email}")]
        public IActionResult GetByUser(string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest(new { message = "Email is required." });

            var orders = _context.Orders
                .Where(o => o.UserEmail == email)
                .OrderByDescending(o => o.Date)
                .Select(o => new
                {
                    o.Id,
                    o.Date,
                    o.Address,
                    o.Status,
                    Items = o.Items.Select(i => new
                    {
                        i.Name,
                        i.Quantity,
                        i.Price
                    }).ToList()
                }).ToList();

            return Ok(orders);
        }

        // ✅ Get all orders (for admin)
        [HttpGet("all")]
        public IActionResult All()
        {
            var orders = _context.Orders
                .Include(o => o.Items)
                .OrderByDescending(o => o.Date)
                .Select(o => new
                {
                    o.Id,
                    o.UserEmail,
                    o.Address,
                    o.Date,
                    o.Status,
                    Items = o.Items.Select(i => new
                    {
                        i.Name,
                        i.Quantity,
                        i.Price
                    }).ToList()
                }).ToList();

            return Ok(orders);
        }

        // ✅ Update status of an order
        [HttpPut("update-status")]
        public IActionResult UpdateStatus([FromBody] StatusUpdateRequest request)
        {
            if (request == null || request.OrderId <= 0 || string.IsNullOrEmpty(request.Status))
                return BadRequest(new { message = "Invalid request data." });

            var order = _context.Orders.FirstOrDefault(o => o.Id == request.OrderId);
            if (order == null)
                return NotFound(new { message = "Order not found." });

            order.Status = request.Status;
            _context.SaveChanges();

            return Ok(new { message = "Order status updated successfully." });
        }

        // ✅ Delete an order by ID
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders.Include(o => o.Items).FirstOrDefault(o => o.Id == id);
            if (order == null)
                return NotFound(new { message = "Order not found." });

            _context.OrderItems.RemoveRange(order.Items);
            _context.Orders.Remove(order);
            _context.SaveChanges();

            return Ok(new { message = "Order deleted successfully." });
        }
    }

    // ✅ DTOs
    public class StatusUpdateRequest
    {
        public int OrderId { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class OrderRequest
    {
        public string UserEmail { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public List<OrderItemDTO> Items { get; set; } = new();
    }

    public class OrderItemDTO
    {
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
