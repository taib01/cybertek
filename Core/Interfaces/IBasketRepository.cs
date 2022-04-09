using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync (int basketId);
        Task<CustomerBasket> UpdateBasketAsync (CustomerBasket basket); 

        void  AddingBasketAsync (CustomerBasket basket);
        public void DeleteBasketAsync(int basketId);
         
    }
}