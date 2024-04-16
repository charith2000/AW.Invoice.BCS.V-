using Application.StockRepo;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class StockRepository : IStockRepository
    {
        private readonly DataContext _dataContext;

        public StockRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Stock CreateStock(Stock stock)
        {
            _dataContext.Stocks.Add(stock);
            _dataContext.SaveChanges();

            return stock;
        }

        public List<Stock> GetAllStocks()
        {
            var findStocks = _dataContext.Stocks.ToList();
            if(findStocks == null)
            {
                return null;
            }
            return findStocks;
        }

        public Stock GetStockByBarCode(string barCode)
        {
            var findStock = _dataContext.Stocks.FirstOrDefault(stock => stock.PBarCode == barCode); ;
            if (findStock == null)
            {
                return null;
            }
            return findStock;
        }

        public Stock GetStockById(int stockId)
        {
            var findStock = _dataContext.Stocks.Find(stockId);
            if (findStock == null)
            {
                return null;
            }
            return findStock;
        }

        public Stock UpdateStock(Stock stock)
        {
            var findStock = _dataContext.Stocks.Find(stock.StockId);
            if(findStock == null)
            {
                return null;
            }
            findStock.Quantity = stock.Quantity;
            findStock.Status = stock.Status;
            findStock.CreatedBy = stock.CreatedBy;
            findStock.CreatedDate = stock.CreatedDate;

            _dataContext.SaveChanges();
            return findStock;
        }
    }
}
