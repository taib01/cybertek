using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.ExtentsionsStartup;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager,
                                SignInManager<AppUser> signInManager,
                                ITokenService tokenService , 
                                IMapper mapper)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto2>> GetCurrentUser()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x=> x.Type == ClaimTypes.Email)?
            //                .Value ;
            //var user2 = await _userManager.FindByEmailAsync(email);
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);                
            return new UserDto2
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName , 
                adress = _mapper.Map<Adress,AdressDto>(user.Adress),
                phoneNumber=user.PhoneNumber
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null ; 
        }


        [Authorize]
        [HttpGet("adress")]
        public async Task<ActionResult<AdressDto>> GetUserAdress()
        {  
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            return   _mapper.Map<Adress,AdressDto>(user.Adress);
        }


        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserDto2 user)
        {  
            var userInitial = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            var adressObject = new Adress{
                FirstName = user.adress.FirstName , 
                LastName = user.adress.LastName,
                Street = user.adress.Street,
                City = user.adress.City,
                State = user.adress.State,
                Zipcode = user.adress.Zipcode 
            };
            /*var userObject = new AppUser
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                UserName = user.Email,
                Adress = adressObject ,
                PhoneNumber = user.phoneNumber
  
            };*/
            userInitial.DisplayName = user.DisplayName;
            userInitial.Adress = adressObject;
            userInitial.PhoneNumber=user.phoneNumber;
            
            //userInitial=userObject;
            var result = await _userManager.UpdateAsync(userInitial);
            if(result.Succeeded) return Ok();
            return BadRequest("Problem Updating user");

        }

        /*[Authorize]
        [HttpPut]
        public async Task<ActionResult<AdressDto>> UpdateUserAllChamp(UserDto2 userInfo)
        {  
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            user.Adress=_mapper.Map<AdressDto,Adress>(userInfo.adress);
            //user.phoneNumber=userInfo.phoneNumber;
            var result = await _userManager.UpdateAsync(user);
            if(result.Succeeded) return Ok(_mapper.Map<Adress,AdressDto>(user.Adress));
            return BadRequest("Problem Updating the adress of user");

        }*/

        [Authorize]
        [HttpPut("adress")]
        public async Task<ActionResult<AdressDto>> UpdateUserAdress(AdressDto adress)
        {  
            var user = await _userManager.FindUserByClaimsPrincipalWithAdressAsync(HttpContext.User);
            user.Adress=_mapper.Map<AdressDto,Adress>(adress);
            var result = await _userManager.UpdateAsync(user);
            if(result.Succeeded) return Ok(_mapper.Map<Adress,AdressDto>(user.Adress));
            return BadRequest("Problem Updating the adress of user");

        }


        

        [HttpPost("login")]
        public async Task<ActionResult<UserDto2>> Login(LoginDto loginDto)
        { 
            //UserManager<AppUser> input;
            var user2 =   _userManager.Users.Include(x=>x.Adress).FirstOrDefault(a => a.Email == loginDto.Email);
            //var user2 = await _userManager.Include(x=>x.Adress).FindByEmailAsync(loginDto.Email);
            
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            //var adress = _userManager.Users.FirstOrDefault(x=>x.email == loginDto.email).Include(x=>x.adress);
            if (user == null) return Unauthorized(new ApiResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Passowrd, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            //var Tokendata = _tokenService.CreateToken(user);
            //var user2 = await _userManager.FindUserByClaimsPrincipalWithAdressAsync();
            return new UserDto2
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                adress=_mapper.Map<Adress,AdressDto>(user2.Adress/*adress*/),
                
                phoneNumber=user.PhoneNumber
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(CheckEmailExistAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors =new []
                {"Email Adress is in use"}});
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Passowrd);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }


        [HttpPost("registerwithadress")]
        public async Task<ActionResult<UserDto2>> RegisterWithAdress(RegisterDto2 registerDto)
        {
            if(CheckEmailExistAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors =new []
                {"Email Adress is in use"}});
            }
            var adressObject = new Adress{
                FirstName = registerDto.Adress.FirstName , 
                LastName = registerDto.Adress.LastName,
                Street = registerDto.Adress.Street,
                City = registerDto.Adress.City,
                State = registerDto.Adress.State,
                Zipcode = registerDto.Adress.Zipcode 
            };
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                Adress = adressObject ,
                PhoneNumber = registerDto.phoneNumber
  
            };
            var result = await _userManager.CreateAsync(user, registerDto.Passowrd);
            // for adding adress :
            /// var user2 = await _userManager.FindByEmailAsync(user.Email);


            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            return new UserDto2
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email,
                adress = registerDto.Adress ,
                phoneNumber = registerDto.phoneNumber  

            };
        }
    }
}