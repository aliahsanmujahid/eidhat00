using System.Collections.Generic;

namespace API.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public int ShopId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        
    }
}