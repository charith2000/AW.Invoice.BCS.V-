using Domain.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CustomRepos
{
    public class ProductStockService : IProductStockService
    {
        private readonly IProductStockRepository _productStockRepository;

        public ProductStockService(IProductStockRepository productStockRepository)
        {
            _productStockRepository = productStockRepository;
        }

        public List<ProductStockDetails> GetAll()
        {
            var productStock = _productStockRepository.GetAll();
            return productStock;
        }

        public ProductStockDetails GetProductStockByBarCode(string barCode)
        {
            var productStock = _productStockRepository.GetProductStockByBarCode(barCode);
            return productStock;
        }
    }
}
