using Domain;
using Domain.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.StockDispatchRepo
{
    public class StockDispatchService : IStockDispatchService
    {
        private readonly IStockDispatchRepository _stockDispatchRepository;

        public StockDispatchService(IStockDispatchRepository stockDispatchRepository)
        {
            _stockDispatchRepository = stockDispatchRepository;
        }

        public StockDispatchDetails CreateStockDispatch(StockDispatchDetails stockDispatchDetails)
        {
            return _stockDispatchRepository.CreateStockDispatch(stockDispatchDetails);
        }

        public StockDispatchDetails GetStockDispatchBySDId(int stockDispatchID)
        {
            var stockDispatches = _stockDispatchRepository.GetStockDispatchBySDId(stockDispatchID);
            return stockDispatches; ;
        }

        public List<StockDispatchDetails> GetAllStockDispatchDetails()
        {
            var stockDispatches = _stockDispatchRepository.GetAllStockDispatchDetails();
            return stockDispatches;
        }
    }
}
