using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Custom
{
    public class ProductStockDetails
    {
        public string BarCode { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public decimal UnitPrice { get; set; }
        public int ProductStatus { get; set; }
        public int StockId { get; set; }
        public int Quantity { get; set; }
        //public int SupplierId { get; set; } = 0;
        public int StockStatus { get; set; }
    }
}
