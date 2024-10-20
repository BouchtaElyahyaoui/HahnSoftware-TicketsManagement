using Microsoft.EntityFrameworkCore;
using tickets_management_api.Models;

namespace tickets_management_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>()
                .Property(t => t.Status)
                .HasConversion<string>();
        }
    }
}
