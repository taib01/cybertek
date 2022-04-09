using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private  IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpPost]
        public  async Task<ActionResult<CustomerBasket>> AddingBasket([FromBody]CustomerBasket basket)
        {
            var basket2 = await _basketRepository.AddingBasketAsync(basket);
            return Ok(basket2);
            //return Ok(updateBasket);
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(int id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            //return Ok(basket ?? new CustomerBasket(id));
            return Ok(basket);
        }

        [HttpPut]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket([FromBody]CustomerBasket basket)
        {
            var updateBasket = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(updateBasket);
        }



        [HttpDelete]
        public void DeleteBasketAsync(int id)
        {
             _basketRepository.DeleteBasketAsync(id) ; 
        }
    }
}