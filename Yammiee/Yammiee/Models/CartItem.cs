// Models/CartItem.cs
using System.ComponentModel.DataAnnotations;

public class CartItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string UserEmail { get; set; } = "";

    [Required]
    public string ItemName { get; set; } = "";

    public int Quantity { get; set; }

    public decimal Price { get; set; }
}
