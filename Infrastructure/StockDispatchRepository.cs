using Application.StockDispatchRepo;
using Domain;
using Domain.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class StockDispatchRepository : IStockDispatchRepository
    {
        private readonly DataContext _dataContext;

        public StockDispatchRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public StockDispatchDetails CreateStockDispatch(StockDispatchDetails stockDispatchDetails)
        {
            var stockDispatch = stockDispatchDetails.StockDispatch;
            var stockDispatchItems = stockDispatchDetails.StockDispatchItems;

            _dataContext.StockDispatches.Add(stockDispatch);
            _dataContext.SaveChanges();

            var stockDispatchId = stockDispatch.DispatchId;

            foreach (var item in stockDispatchItems)
            {
                item.DispatchId = stockDispatchId;
                _dataContext.StockDispatchItems.Add(item);

                var stock = _dataContext.Stocks.FirstOrDefault(s => s.PBarCode == item.PBarCode && s.StockId == item.StockId);
                if (stock != null)
                {
                    stock.Quantity -= item.Quantity;
                }
            }

            _dataContext.SaveChanges();

            return stockDispatchDetails;
        }

        public List<StockDispatchDetails> GetAllStockDispatchDetails()
        {
            return _dataContext.StockDispatches
                .Select(dispatch => new StockDispatchDetails
                {
                    StockDispatch = dispatch,
                    StockDispatchItems = _dataContext.StockDispatchItems
                        .Where(item => item.DispatchId == dispatch.DispatchId)
                        .ToList()
                })
                .ToList();
        }

        public StockDispatchDetails GetStockDispatchBySDId(int stockDispatchID)
        {
            var stockDispatch =  _dataContext.StockDispatches
                .Where(dispatch => dispatch.DispatchId == stockDispatchID)
                .Select(dispatch => new StockDispatchDetails
                {
                    StockDispatch = dispatch,
                    StockDispatchItems = _dataContext.StockDispatchItems
                        .Where(item => item.DispatchId == dispatch.DispatchId)
                        .ToList()
                })
                .FirstOrDefault();

            if (stockDispatch == null)
            {
                return null;
            }

            return stockDispatch;
        }
    }
}
