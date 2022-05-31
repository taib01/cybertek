using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.ExtentsionsStartup;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly StoreContext _context;
        public UserManager<AppUser> _userManager { get; }
        public SignInManager<AppUser> _signInManager { get; }

        public ITokenService _tokenService { get; }

        public OrderController(UserManager<AppUser> userManager,
                                SignInManager<AppUser> signInManager,
                                Core.Interfaces.ITokenService tokenService , 
                                IMapper mapper,
                                StoreContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OrderDto>> Post([FromBody]OrderDto orderDto)
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            if (user == null) return Unauthorized(new ApiResponse(401));

             var order = new Order {
                 idClient = user.Id,
                 customerBasketId = orderDto.basketId ,
                 shippingPrice = orderDto.shippingPrice,
                 date = orderDto.date,
                 total = orderDto.total,
                 nameClient = user.Adress.FirstName +'-'+user.Adress.LastName , 
                 adressClient=user.Adress.State +'-'+user.Adress.City+'-'+user.Adress.Street ,
                 numeroClient=user.PhoneNumber 
                 
             };
             var result = await _context.Orders.AddAsync(order);
             _context.SaveChanges();
            //if (result.) return BadRequest(new ApiResponse(400));
            return orderDto;
        }

        [Authorize]
        [HttpGet("getforuser")]
        public async Task<ActionResult<IReadOnlyList<Order>>> getForUser()
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            if (user == null) return Unauthorized(new ApiResponse(401));
             
             //var result =  _context.Orders.Include(a => a.customerBasket).SingleOrDefault(b => b.idClient == user.Id);
             //var result =  _context.Orders.Include(a => a.customerBasket).FirstOrDefault(a=>a.idClient==user.Id); 
             var result =  _context.Orders.Include(a => a.customerBasket).Where(b=> b.idClient == user.Id); 
             
            //if (result.) return BadRequest(new ApiResponse(400));
            return  result.ToList();
        }
        [Authorize]
        [HttpGet("getforadmin")]
        public async Task<ActionResult<IReadOnlyList<Order>>> getForAdmin()
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            if (user == null) return Unauthorized(new ApiResponse(401));
             
             //var result =  _context.Orders.Include(a => a.customerBasket).SingleOrDefault(b => b.idClient == user.Id);
             //var result =  _context.Orders.Include(a => a.customerBasket).FirstOrDefault(a=>a.idClient==user.Id); 
             var result =  _context.Orders.Include(a => a.customerBasket); 
             
            //if (result.) return BadRequest(new ApiResponse(400));
            return await result.ToListAsync();
        }


    }
}