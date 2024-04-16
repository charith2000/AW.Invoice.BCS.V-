using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Branch> Branch { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<StockDispatch> StockDispatches { get; set; }
        public DbSet<StockDispatchItem> StockDispatchItems { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Set schema for each entity
        //    modelBuilder.Entity<Branch>().ToTable("Branchs", schema: "aw");
        //    modelBuilder.Entity<Customer>().ToTable("Customers", schema: "aw");
        //    modelBuilder.Entity<Order>().ToTable("Orders", schema: "aw");
        //    modelBuilder.Entity<OrderProduct>().ToTable("OrderProducts", schema: "aw");
        //    modelBuilder.Entity<Product>().ToTable("Products", schema: "aw");
        //    modelBuilder.Entity<Stock>().ToTable("Stocks", schema: "aw");
        //    modelBuilder.Entity<Supplier>().ToTable("Suppliers", schema: "aw");
        //    modelBuilder.Entity<User>().ToTable("Users", schema: "aw");
        //}
    }
}
