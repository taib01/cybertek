using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;


namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T: BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync(); 
        Task<T> GetEntityWithSpac(ISpecification<T> spec) ;
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec );

        Task<int> CountAsync(ISpecification<T> spec);

        public void  poostProduct (Product prod);
        public void  poostType (ProductType type);
        public void  poostBrand (ProductBrand brand);
        
        public void deleteProduct(int id); 
        public void deleteType(int id); 
        public void deleteBrand(int id); 

        public void putProduct(Product product);
        public void putBrand(ProductBrand brand);
        public void putType(ProductType type); 

    }
}