using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(int id)
        {
            Id = id;
        }

        public int Id { get; set; }    
        public List<BasketItem> Items { get; set; } =  new List<BasketItem>();     
    }
}