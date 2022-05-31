using Core.Entities;

namespace API.Dtos
{
    public class OrderDto
    {
        public int basketId { get; set; }
        public int shippingPrice { get; set; }
        public string date { get; set; }
        public string adressClient { get; set; }
        public string  numeroClient { get; set; }

        public decimal total { get; set; }
    }
}