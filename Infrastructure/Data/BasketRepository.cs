using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly StoreContext _database;
        // replace IConnectionMultiplexer by StoreContext to change service of worke
        public BasketRepository( StoreContext redis)
        {
            //change GetDatabase() by nothing
            _database = redis ;
        }


        public void  DeleteBasketAsync(int basketId)
        {
            CustomerBasket basketItem =  _database.CustomerBaskets.Include(a => a.Items).FirstOrDefault(a=>a.Id==basketId); 
            var all = basketItem.Items ; 
              //_database.CustomerBaskets.Remove(basketItem);
              _database.CustomerBaskets.Remove(basketItem);
              _database.BasketItems.RemoveRange(all);
              _database.SaveChanges();
        }


        public async Task<CustomerBasket> GetBasketAsync(int basketId)
        { 
            //BasketItem [] dataitems ;
            //dataitems =  _database.BasketItems.SingleOrDefault(b=>b.Id == basketId);
            CustomerBasket item = await _database.CustomerBaskets.Include(a => a.Items).FirstOrDefaultAsync(a=>a.Id==basketId); ;
            //var dataItems = _database.BasketItems.SingleOrDefault(b => b.Customer);

            //return data.ToString() ? null : (data) ; 
            return item ; 
        }


        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            /*var created = await _database.StringSetAsync(
                basket.Id, JsonSerializer.Serialize(basket),TimeSpan.FromDays(30)
            );
            if ( !created) return null ; 
            return await GetBasketAsync(basket.Id); */

            var created =  _database.CustomerBaskets.Find(basket.Id);
            var created2 =  _database.CustomerBaskets.Include(a => a.Items).SingleOrDefault(b => b.Id == basket.Id);
            //var created2 = await _database.BasketItems.FindAsync()
            if (created2.Items==null){
                //var id = basket.Id ;
                
                foreach( var item in basket.Items){
                    _database.BasketItems.Add(item);
                    
                }
               // _database.CustomerBaskets.Add();
                _database.SaveChanges();
  
            }else 
            {
                _database.CustomerBaskets.Update(basket) ;
                _database.SaveChanges();
            }

            return await GetBasketAsync(basket.Id); 
        }


///////// first method of adding /////////////////////////////////////////////////////////////////////// 
        /*public void  AddingBasketAsync(CustomerBasket basket )
        {
            
            var v1 = new CustomerBasket {
                Id = basket.Id
            };
            var v2 = new BasketItem() ; 
            //CustomerBasket v1 = basket.Id ; 
            foreach ( BasketItem item in basket.Items){
                 v2.Id = item.Id ; 
                 v2.ProductName = item.ProductName ;  
                 v2.Price = item.Price ; 
                 v2.Quantity =item.Quantity ; 
                 v2.PictureUrl=item.PictureUrl;
                 v2.Brand=item.Brand;
                 v2.Type=item.Type;
                 

            }
            _database.CustomerBaskets.Add(v1);
            _database.SaveChanges();
             _database.BasketItems.Add(v2);
            
            //BasketItem item = basket;
           
            

            _database.SaveChanges();

            //return basket; 
            
        }*/

///////// second method adding ////////////////////////////////////////
        /*public void  AddingBasketAsync(CustomerBasket basket )
        {
            var testFind = _database.CustomerBaskets.Find(basket.Id); 
            if (testFind ==null )
            {
                var v1 = new CustomerBasket {
                    Id = basket.Id
                };

                _database.CustomerBaskets.Add(v1);
                _database.SaveChanges();
            }

            var v2 = new BasketItem() ; 
            //CustomerBasket v1 = basket.Id ; 
            foreach ( BasketItem item in basket.Items){
                var testFind2 = _database.BasketItems.Find(item.Id);
                if(testFind2==null) 
                {
                    v2.Id = item.Id ; 
                    v2.ProductName = item.ProductName ;  
                    v2.Price = item.Price ; 
                    v2.Quantity =item.Quantity ; 
                    v2.PictureUrl=item.PictureUrl;
                    v2.Brand=item.Brand;
                    v2.Type=item.Type;
                    
                    _database.BasketItems.Add(v2);
                    _database.SaveChanges();
                }
            }
        }*/
        



/////////////// * Adding working good without ( update & response ) //////////////////////////
/*
        public void  AddingBasketAsync(CustomerBasket basket )
        {
            var v1 = new CustomerBasket ();

            var testFind = _database.CustomerBaskets.Find(basket.Id); 
            if (testFind ==null )
            {
                v1.Id  = basket.Id ; 
            };

            v1.Items = basket.Items ; 
            _database.CustomerBaskets.Add(v1);
            _database.SaveChanges();
        }
*/
        public  async Task<CustomerBasket>  AddingBasketAsync(CustomerBasket basket )
        {
            var v1 = new CustomerBasket ();

            var testFind = _database.CustomerBaskets.Find(basket.Id); 
            if (testFind == null )
            {
                v1.Id  = basket.Id ; 
                v1.Items = basket.Items ; 
                _database.CustomerBaskets.Add(v1);
                _database.SaveChanges();
                if(basket.Id == 0){
                    var lastColumn = _database.CustomerBaskets.OrderBy(x=>x.Id).LastOrDefault();
                    basket.Id = lastColumn.Id ; 
                }

                return (basket);
            }
            else
            {
                CustomerBasket basketItem =  _database.CustomerBaskets.Include(a => a.Items).FirstOrDefault(a=>a.Id==basket.Id); 
                var all = basketItem.Items ; 
                 //_database.CustomerBaskets.Remove(basketItem);
                _database.CustomerBaskets.Remove(basketItem);
                 _database.BasketItems.RemoveRange(all);
                 _database.SaveChanges();

                v1.Id  = basket.Id ; 
                v1.Items = basket.Items ; 
                _database.CustomerBaskets.Add(v1);
                _database.SaveChanges();
                return (v1);
            };


            




            
            

            
        }

    }
}