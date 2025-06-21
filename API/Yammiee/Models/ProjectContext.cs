using Microsoft.EntityFrameworkCore;

namespace Yammiee.Models
{
    public class ProjectContext : DbContext
    {
        // ✅ Only change made: Strongly typed DbContextOptions<ProjectContext>
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        {
        }

        public DbSet<User> tblUser { get; set; }
        public DbSet<Admin> tblAdmin { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

    }
}
