using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ProductRepo
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public Product CreateProduct(Product product)
        {
            _productRepository.CreateProduct(product);
            return product;
        }

        public List<Product> GetAllProducts()
        {
            var products = _productRepository.GetAllProducts();
            return products;
        }

        public Product GetProductByBarCode(string barCode)
        {
            var products = _productRepository.GetProductByBarCode(barCode);
            return products;
        }

        public Product Updateproduct(Product product)
        {
            _productRepository.Updateproduct(product);
            return product;
        }
    }
}
