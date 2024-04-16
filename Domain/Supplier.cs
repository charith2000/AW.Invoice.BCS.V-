using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Supplier
    {
        [Key]
        public int SupplierIDd { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string TelephoneNo { get; set; }
        public string Email { get; set; }
        public int Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
