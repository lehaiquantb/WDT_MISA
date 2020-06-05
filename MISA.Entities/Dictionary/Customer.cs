using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class Customer
    {
        public Guid CustomerID { get; set; }
        public string CustomerNo { get; set; }
        public string CustomerName { get; set; }
        public string CompanyName { get; set; }
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string CustomerPhone { get; set; }
        public string Email { get; set; }
        public string MemberCardCode { get; set; }
        public string CardClass { get; set; }
        public decimal MoneyInDebt { get; set; }
        public string Note { get; set; }
        public Boolean FiveFoodMember { get; set; }
        public Boolean StopWatching { get; set; }
        public string CustomerGroup { get; set; }
        public DateTime Birthday { get; set; }
    }
}
