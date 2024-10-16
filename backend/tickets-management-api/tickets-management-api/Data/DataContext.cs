using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using tickets_management_api.Models;

namespace tickets_management_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Ticket> Tickets { get; set; }
    }
}
