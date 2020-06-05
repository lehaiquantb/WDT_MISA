using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DL;
using MISA.Entities;

namespace MISA.BL
{
    public class CustomerBL
    {
        private CustomerDL _customerDL = new CustomerDL();
        public IEnumerable<Customer> GetDataPaging(int _pageIndex, int _pageSize)
        {
            var _customerBL = _customerDL.GetAllData();
            _customerBL = _customerBL.OrderBy(p => p.CustomerNo)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _customerBL;
        }
    }
}
