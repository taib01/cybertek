namespace Core.Entities
{
    public class Order : BaseEntity
    {
        public string idClient { get; set; }
        public CustomerBasket customerBasket { get; set; } 
        public int customerBasketId { get; set; }
        public int shippingPrice { get; set; }
        public string  date { get; set; }
        public decimal total { get; set; }
        public string nameClient { get; set; }
        public string adressClient { get; set; }
        public string  numeroClient { get; set; }
    }
}