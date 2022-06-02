using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context;

        public GenericRepository(StoreContext context)
        {
            _context = context;
        }

        public GenericRepository()
        {
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync() ; 
        }
        
        public async Task<T> GetEntityWithSpac(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync(); 
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        private IQueryable<T> ApplySpecification (ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(),spec); 
        }

        public void  poostProduct (Product prod){
            prod.PictureUrl= DateTime.Now.ToString("ddMMyyyy_HH_mm_ss") + "_" +prod.PictureUrl ;
            _context.Products.Add(prod) ; 
            _context.SaveChanges();
        }
        public void  poostType(ProductType type){

            _context.ProductTypes.Add(type) ; 
            _context.SaveChanges();
        }
        public void  poostBrand(ProductBrand brand){
            _context.ProductBrands.Add(brand) ; 
            _context.SaveChanges();
        }


        public void deleteProduct(int id){
            var product = _context.Products.Find(id);
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public void deleteType(int id){
            var type = _context.ProductTypes.Find(id);
            _context.ProductTypes.Remove(type);
            _context.SaveChanges();
        }

        public void deleteBrand(int id){
            var brand = _context.ProductBrands.Find(id);
            _context.ProductBrands.Remove(brand);
            _context.SaveChanges();
        }

        public void putProduct(Product product){
            //var brand = _context.ProductBrands.Find(id);
            _context.Products.Update(product);
            _context.SaveChanges();
        }
        public void putType(ProductType type){
            //var brand = _context.ProductBrands.Find(id);
            _context.ProductTypes.Update(type);
            _context.SaveChanges();
        }
        public void putBrand(ProductBrand brand){
            //var brand = _context.ProductBrands.Find(id);
            _context.ProductBrands.Update(brand);
            _context.SaveChanges();
        }


    }
}