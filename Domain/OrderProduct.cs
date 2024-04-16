using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class OrderProduct
    {
        [Key]
        public int OPId { get; set; }
        public int OrderId { get; set; }
        public string PBarCode { get; set; }
        public int StockId { get; set; }
        public int Quantity { get; set; }
    }
}
