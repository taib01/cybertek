using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName="test",
                    Email="test@gmail.com",
                    UserName="test@gmail.com",
                    Adress = new Adress
                    {
                        FirstName = "test",
                        LastName ="testi",
                        Street="10 cite cheby",
                        City="manouba",
                        State="tebourba",
                        Zipcode="1133"
                    }
                };
                await userManager.CreateAsync(user,"Pa$$w0rd");
            }
        }
    }
}