namespace Core.Entities.OrderAggregate
{
    public class OrderItem 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}