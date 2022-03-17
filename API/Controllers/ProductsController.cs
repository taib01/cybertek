using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {


        /*private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;

        }*/
        ///////////////////////////////////////////////////////////////////////////
        /*[HttpGet]
public async Task<ActionResult<List<Product>>> GetProducts()
{
    var products = await _repo.GetProductsAsync();
    return Ok(products);
}
[HttpGet("{id}")]

public async Task<ActionResult<Product>> GetProducts(int id)
{
     return await _repo.GetProductByIdAsync(id) ;

}

[HttpGet("brands")]
public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
{
    var brands = await _repo.GetProductBrandsAsync();
    return Ok(brands);
}
[HttpGet("types")]
public async Task<ActionResult<List<ProductType>>> GetProductTypes()
{

    return Ok( await _repo.GetProductTypesAsync() );
}*/
        //////////////////////////////////////////////////////////////////////////////////////

        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> ProductRepo,
        IGenericRepository<ProductBrand> BrandRepo,
        IGenericRepository<ProductType> TypeRepo , IMapper mapper)
        {
            _productRepo = ProductRepo;
            _brandRepo = BrandRepo;
            _typeRepo = TypeRepo;
            _mapper = mapper;
        }



        [HttpGet]
        public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts(
                                                                [FromQuery]ProductSpecParams productParams)
        
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var products = await _productRepo.ListAsync(spec);
//// here we do mapping with nuget package " auto mapping " 
             return Ok(_mapper
             .Map< IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDto> > (products));
//// here we do mapper manuellement 
            /*return products.Select(product =>new ProductToReturnDto {

                Id = product.Id,
                Reference = product.Reference,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl, 
                Price = product.Price,
                Quantity = product.Quantity,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name

            }).ToList();*/
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof ( ApiResponse), StatusCodes.Status404NotFound)]
///////////// old methode fpr return data         
        /*public async Task<ActionResult<ProductToReturnDto>> GetProducts(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpac(spec);
            if (product == null) return NotFound(new ApiResponse(404)) ; 

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }*/

                public async Task<ActionResult<ProductToReturnDto>> GetProducts(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpac(spec);
            if (product == null) return NotFound(new ApiResponse(404)) ; 

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            var brands = await _brandRepo.ListAllAsync();
            return Ok(brands);
        }
        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {

            return Ok(await _typeRepo.ListAllAsync());
        }
    }
}