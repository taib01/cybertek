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
                    DisplayName="admin",
                    Email="admin@gmail.com",
                    UserName="admin@gmail.com",
                    Adress = new Adress
                    {
                        FirstName = "admin",
                        LastName ="technotips",
                        Street="null",
                        City="null",
                        State="null",
                        Zipcode="1001"
                    },
                    Role="admin"
                    
                };
                await userManager.CreateAsync(user,"Admin@123");
            }
        }
    }
}