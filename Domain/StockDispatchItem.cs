using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class StockDispatchItem
    {
        public int Id { get; set; }
        public int DispatchId { get; set; }
        public string PBarCode{ get; set; }
        public int Quantity { get; set; }
        public int StockId { get; set; }
    }
}
