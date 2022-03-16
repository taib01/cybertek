using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecificaton<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(string sort )
        {
            AddInclude(x=> x.ProductType);
            AddInclude(x=> x.ProductBrand);
            AddOrederBy(x=> x.Name);

            if ( !string.IsNullOrEmpty(sort))
            {
                switch ( sort)
                {
                    case "priceAsc":
                        AddOrederBy(p=>p.Price);
                    break ; 
                    case "priceDesc": 
                        AddOrederByDescendig(p=>p.Price); 
                    break ;
                    default:
                        AddOrederBy(n=>n.Name);
                    break ; 

                }
            }

        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x=> x.Id == id )
        {
            AddInclude(x=> x.ProductType);
            AddInclude(x=> x.ProductBrand);
        }
    }
}