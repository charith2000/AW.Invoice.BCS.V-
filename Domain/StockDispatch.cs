using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class StockDispatch
    {
        [Key]
        public int DispatchId { get; set; }
        public int Branch { get; set; }
        public string DeliveryDescription { get; set; } = string.Empty;
        public int Status { get; set; } = 1;
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
