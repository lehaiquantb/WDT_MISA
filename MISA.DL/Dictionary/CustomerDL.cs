using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;

namespace MISA.DL
{
    public class CustomerDL
    {
        private MISAWDT03LHQuanContext db = new MISAWDT03LHQuanContext();

        //Hàm thực hiện lấy tất cả dữ liệu khách hàng
        //Người tạo: LHQuan 26/08/2019
        public IEnumerable<Customer> GetAllData()
        {
            return db.Customers;
        }

        //Hàm thực hiện xóa nhiều bản ghi khách hàng
        //Người tạo: LHQuan 27/08/2019
        public void DelMulCustomer(List<Guid> customerids)
        {
            foreach (var customerid in customerids)
            {
                var customerItem = db.Customers.Where(p => p.CustomerID == customerid).FirstOrDefault();
                db.Customers.Remove(customerItem);
            }
            db.SaveChanges();
        }

        //Hàm thực hiện sửa thông tin khách hàng
        //Người tạo: LHQuan 27/08/2019
        public void UpdateCustomer(Customer _customer)
        {
            var customerFind = db.Customers.Where(p => p.CustomerID == _customer.CustomerID).SingleOrDefault();
            customerFind.CustomerNo = _customer.CustomerNo;
            customerFind.CustomerName = _customer.CustomerName;
            customerFind.CustomerGroup = _customer.CustomerGroup;
            customerFind.CustomerPhone = _customer.CustomerPhone;
            customerFind.Birthday = _customer.Birthday;
            customerFind.CompanyName = _customer.CompanyName;
            customerFind.TaxCode = _customer.TaxCode;
            customerFind.Email = _customer.Email;
            customerFind.Address = _customer.Address;
            customerFind.Note = _customer.Note;
            customerFind.StopWatching = _customer.StopWatching;
            db.SaveChanges();
        }

        //Hàm thực hiện thêm mới khách hàng
        //Người tạo: LHQuan 27/08/2019
        public void AddCustomer(Customer _customer)
        {
            _customer.CustomerID = Guid.NewGuid();
            db.Customers.Add(_customer);
            db.SaveChanges();
        }

        //Hàm thực hiện lấy thông tin khách hàng theo ID
        //Người tạo: LHQuan 27/08/2019
        public Customer GetCustomerByID(Guid customerid)
        {
            var customerItem = db.Customers.Where(p => p.CustomerID == customerid).SingleOrDefault();
            return customerItem;
        }
    }
}
