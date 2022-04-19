using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ExtentsionsStartup
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipalWithAdressAsync(this UserManager<AppUser> input,
        ClaimsPrincipal user)
        {
           var email = user?.Claims?.FirstOrDefault(x=> x.Type == ClaimTypes.Email)?.Value ;   
           return await input.Users.Include(x=> x.Adress).SingleOrDefaultAsync(x=>x.Email==email);

        }

        public static async Task<AppUser> FindEmailFromClaimsPrincipal(this UserManager<AppUser> input,
        ClaimsPrincipal user )
        {
            var email = user?.Claims?.FirstOrDefault(x=>x.Type==ClaimTypes.Email)?.Value;
            return await input.Users.SingleOrDefaultAsync(x=>x.Email==email);
        }
    }
}