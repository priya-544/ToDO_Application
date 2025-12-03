using Microsoft.EntityFrameworkCore;
using ToDo_Application.Models.Entities;

namespace ToDo_Application.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

                
        }

        public DbSet<ToDo> ToDo { get; set; }
    }
}
