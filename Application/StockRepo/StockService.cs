using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.StockRepo
{
    public class StockService : IStockService
    {
        private readonly IStockRepository _stockRepository;

        public StockService(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public Stock CreateStock(Stock stock)
        {
            _stockRepository.CreateStock(stock);
            return stock;
        }

        public Stock GetStockByBarCode(string barCode)
        {
            var stock = _stockRepository.GetStockByBarCode(barCode);
            return stock;
        }

        public Stock GetStockById(int stockId)
        {
            var stock = _stockRepository.GetStockById(stockId);
            return stock;
        }

        public List<Stock> GetStocks()
        {
            var stocks =  _stockRepository.GetAllStocks();
            return stocks;
        }

        public Stock UpdateStock(Stock stock)
        {
            _stockRepository.UpdateStock(stock);
            return stock;
        }
    }
}
