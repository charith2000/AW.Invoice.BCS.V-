using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Stock
    {
        [Key]
        public int StockId { get; set; }        
        public int Quantity { get; set; }
        public string PBarCode { get; set; }
        public int SupplierId { get; set; } = 0;
        public int Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
