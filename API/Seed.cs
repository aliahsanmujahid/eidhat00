using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager,RoleManager<AppRole> roleManager)
        {
            
            if (await userManager.Users.AnyAsync()) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Seller"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            
        
            var admin = new AppUser
            {
                DisplayName= "Mujahid",
                UserName = "admin",
                Email = "ahsanalimujahid@gmail.com",
                Image="https://lh3.googleusercontent.com/ogw/ADea4I7FTPL_BVWg3hTn9o3Bjc-WSYnp6HxT_XJ-3BIX1w=s83-c-mo"
            };

            await userManager.CreateAsync(admin, "poipoi");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});

            
        }    
    }
}