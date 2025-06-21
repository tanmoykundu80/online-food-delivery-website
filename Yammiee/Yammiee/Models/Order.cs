using Yammiee.Models;

public class Order
{
    public int Id { get; set; }
    public string UserEmail { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Status { get; set; } = "Pending";
    public List<OrderItem> Items { get; set; } = new();
}
