namespace Yammiee.Models.DTOs
{
    public class OrderRequest
    {
        public required string UserEmail { get; set; }
        public required string Address { get; set; }
        public required List<OrderItemDto> Items { get; set; }

    }
}
