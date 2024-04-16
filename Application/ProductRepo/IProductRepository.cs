using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ProductRepo
{
    public interface IProductRepository
    {
        List<Product> GetAllProducts();

        Product GetProductByBarCode(string barCode);

        Product CreateProduct(Product product);

        Product Updateproduct(Product product);
    }
}
