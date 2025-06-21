namespace Yammiee.Models.DTOs
{
    public class OrderItemDto
    {
        public required string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
