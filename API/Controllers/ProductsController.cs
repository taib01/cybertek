using System.Collections.Generic;
using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
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
        IGenericRepository<ProductType> TypeRepo , IMapper mapper )
        {
            _productRepo = ProductRepo;
            _brandRepo = BrandRepo;
            _typeRepo = TypeRepo;
            _mapper = mapper;
        }



/////////old methode to getting data 
        /*public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts(
                                                                [FromQuery]ProductSpecParams productParams)
        
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var products = await _productRepo.ListAsync(spec);
             return Ok(_mapper
             .Map< IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDto> > (products));
        }*/

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
                                   [FromQuery]ProductSpecParams productParams)
        
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productRepo.CountAsync(countSpec);
            var products = await _productRepo.ListAsync(spec);


            var data = _mapper
            .Map< IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDto> > (products);
//// here we do mapping with nuget package " auto mapping " 
             
             
             return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,
                                            productParams.PageSize,totalItems,data));
        }

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

            }).ToList();
            }*/
        




        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof ( ApiResponse), StatusCodes.Status404NotFound)]
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

        



        [HttpPost("image"),DisableRequestSizeLimit]
        public void PostProductPicture(){
            var file = Request.Form.Files[0];
            //var product = Request.Form.Files[0];
            var folderName = Path.Combine("Resources","Image");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);
            if (file.Length>0)
            {
                var fileName = DateTime.Now.ToString("ddMMyyyy_HH_mm_ss") + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave,fileName);
                var dbPath = Path.Combine(folderName,fileName);
                using(var stream = new FileStream(fullPath,FileMode.Create))
                {
                    file.CopyTo(stream);
                }

            } 
        }

        
        [HttpPost()]
        public void PostProduct([FromBody]ProductToSendDto prod){
            var prodSaving=_mapper.Map<ProductToSendDto,Product>(prod);
            _productRepo.poostProduct(prodSaving);
        }

        [HttpPost("type")]
        public void PostType([FromBody]ProductType type){
            _productRepo.poostType(type);
        }
        [HttpPost("brand")]
        public void PostBrand([FromBody]ProductBrand brand){
            _productRepo.poostBrand(brand);
        }

        [HttpDelete]
        public void DeleteProduct(int id ){
            
            _productRepo.deleteProduct(id);
        }

        [HttpDelete("type")]
        public void DeleteType(int id ){
            
            _productRepo.deleteType(id);
        }

        [HttpDelete("brand")]
        public void DeleteBrand(int id ){
            
            _productRepo.deleteBrand(id);
        }


        [HttpPut]
        public void PutProduct([FromBody]ProductToSendDto product ){

            var prodSaving=_mapper.Map<ProductToSendDto,Product>(product);
            _productRepo.putProduct(prodSaving);
        }
        [HttpPut("type")]
        public void PutType([FromBody]ProductType type ){
            
            _productRepo.putType(type);
        }
        [HttpPut("brand")]
        public void PutBrand([FromBody]ProductBrand brand ){
            
            _productRepo.putBrand(brand);
        }


    }
}