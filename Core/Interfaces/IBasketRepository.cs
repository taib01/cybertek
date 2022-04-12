using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync (int basketId);
        Task<CustomerBasket> UpdateBasketAsync (CustomerBasket basket); 

        Task<CustomerBasket>  AddingBasketAsync (CustomerBasket basket);
        public void DeleteBasketAsync(int basketId);

        Task<CustomerBasket> GetBasketLastId();
         
    }
}