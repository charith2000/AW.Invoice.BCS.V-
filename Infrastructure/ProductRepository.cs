using Application.ProductRepo;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _dataContext;

        public ProductRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Product CreateProduct(Product product)
        {
            _dataContext.Products.Add(product);
            _dataContext.SaveChanges();

            return product;
        }

        public List<Product> GetAllProducts()
        {
            var findProduct =  _dataContext.Products.ToList();
            return findProduct;
        }

        public Product GetProductByBarCode(string barCode)
        {
            var findProduct = _dataContext.Products.Find(barCode);

            if (findProduct == null)
            {
                return null;
            }
            return findProduct;
        }

        public Product Updateproduct(Product product)
        {
            var findProduct =  _dataContext.Products.Find(product.BarCode);
            
            if (findProduct == null)
            {
                return null;
            }

            findProduct.Name = product.Name;
            findProduct.Type = product.Type;
            findProduct.Description = product.Description;
            findProduct.Color = product.Color;
            findProduct.Size = product.Size;
            findProduct.UnitPrice = product.UnitPrice;
            findProduct.SupplierId = product.SupplierId;
            findProduct.Status = product.Status;
            findProduct.CreatedBy = product.CreatedBy;
            findProduct.CreatedDate = product.CreatedDate;

            _dataContext.SaveChanges();

            return findProduct;
        }

    }
}
