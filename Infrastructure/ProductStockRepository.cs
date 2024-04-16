using Application.CustomRepos;
using Domain.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class ProductStockRepository : IProductStockRepository
    {
        private readonly DataContext _dataContext;

        public ProductStockRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<ProductStockDetails> GetAll()
        {
            var findProductStock = from p in _dataContext.Products
                                   join s in _dataContext.Stocks on p.BarCode equals s.PBarCode
                                   select new ProductStockDetails
                                   {
                                       BarCode = p.BarCode,
                                       Name = p.Name,
                                       Type = p.Type,
                                       Color = p.Color,
                                       Size = p.Size,
                                       Description = p.Description,
                                       UnitPrice = p.UnitPrice,
                                       ProductStatus = p.Status,
                                       Quantity = s.Quantity,
                                       StockId = s.StockId,
                                       StockStatus = s.Status
                                   };

            var productStockList = findProductStock.ToList();

            return productStockList;
        }

        public ProductStockDetails GetProductStockByBarCode(string barCode)
        {

            var findProductStock = (from p in _dataContext.Products
                                    join s in _dataContext.Stocks on p.BarCode equals s.PBarCode
                                    where p.BarCode == barCode
                                    select new ProductStockDetails
                                    {
                                        BarCode = p.BarCode,
                                        Name = p.Name,
                                        Type = p.Type,
                                        Color = p.Color,
                                        Size = p.Size,
                                        Description = p.Description,
                                        UnitPrice = p.UnitPrice,
                                        ProductStatus = p.Status,
                                        Quantity = s.Quantity,
                                        StockId = s.StockId,
                                        StockStatus = s.Status
                                    }).FirstOrDefault(); // or .ToList() if you expect multiple results
            
            if (findProductStock == null)
            {
                return null;
            }

            return findProductStock;
        }
    }
}
