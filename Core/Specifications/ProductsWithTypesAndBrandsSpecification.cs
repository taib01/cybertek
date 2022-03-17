using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecificaton<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams):base(x=>
                    ( !productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId  ) && 
                    ( !productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId  ) 
                )
        {
            AddInclude(x=> x.ProductType);
            AddInclude(x=> x.ProductBrand);
            AddOrederBy(x=> x.Name);
            ApplyPaging( (productParams.PageSize * (productParams.PageIndex -1)) ,
                          productParams.PageSize
                        );

            if ( !string.IsNullOrEmpty(productParams.Sort))
            {
                switch ( productParams.Sort)
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