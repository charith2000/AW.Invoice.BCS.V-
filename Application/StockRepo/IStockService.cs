using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.StockRepo
{
    public interface IStockService
    {
        List<Stock> GetStocks();

        Stock CreateStock(Stock stock);

        Stock UpdateStock(Stock stock);

        Stock GetStockById(int stockId);

        Stock GetStockByBarCode(string barCode);

    }
}
