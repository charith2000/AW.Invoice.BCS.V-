using Domain;
using Domain.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.StockDispatchRepo
{
    public interface IStockDispatchRepository
    {
        StockDispatchDetails CreateStockDispatch(StockDispatchDetails stockDispatchDetails);

        List<StockDispatchDetails> GetAllStockDispatchDetails();

        StockDispatchDetails GetStockDispatchBySDId(int stockDispatchID);

    }
}
