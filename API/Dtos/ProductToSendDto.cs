namespace API.Dtos
{
    public class ProductToSendDto
    {
        public int Id { get; set; }
        public string Reference { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; }
        public int ProductTypeId { get; set; }
    
        public int ProductBrandId { get; set; }
        
    }
}