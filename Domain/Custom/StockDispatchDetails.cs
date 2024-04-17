using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Custom
{
    public class StockDispatchDetails
    {
        public StockDispatch StockDispatch { get; set; }
        public List<StockDispatchItem> StockDispatchItems { get; set;} = new List<StockDispatchItem>();
    }
}
