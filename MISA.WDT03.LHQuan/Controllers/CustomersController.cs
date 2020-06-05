using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.Entities;
using MISA.DL;
using MISA.BL;
using System.Threading.Tasks;
using MISA.WDT03.LHQuan.Properties;

namespace MISA.WDT03.LHQuan.Controllers
{
    public class CustomersController : ApiController
    {
        private CustomerBL _CustomerBL = new CustomerBL();
        private CustomerDL _CustomerDL = new CustomerDL();

        /// <summary>
        /// Service thực hiện lấy dữ liệu khách hàng có phân trang
        /// Người tạo: LHQuan 26/08/2019
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [Route("customers/{pageIndex}/{pageSize}")]
        [HttpGet]
        public async Task<AjaxResult> GetCustomerPaging([FromUri] int pageIndex, int pageSize)
        {
            await Task.Delay(500);
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _CustomerBL.GetDataPaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.errorVN;
            }
            return ajaxResult;
        }

        /// <summary>
        /// Service thực hiện lấy tất cả bản ghi khách hàng
        /// Người tạo: LHQuan 27/08/2019
        /// </summary>
        /// <returns></returns>
        [Route("customers")]
        [HttpGet]
        public AjaxResult GetCustomers()
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _CustomerDL.GetAllData();
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorVN;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Service thực hiện xóa nhiều bản ghi khách hàng
        /// Người tạo: LHQuan 27/08/2019
        /// </summary>
        /// <param name="customerids"></param>
        /// <returns></returns>
        [Route("customers")]
        [HttpDelete]
        public AjaxResult DelMulCustomers([FromBody]List<Guid> customerids)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _CustomerDL.DelMulCustomer(customerids);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorVN;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Service thực hiện sửa thông tin khách hàng
        /// Người tạo: LHQuan 27/08/2019
        /// </summary>
        /// <param name="_customer"></param>
        /// <returns></returns>
        [Route("customers")]
        [HttpPut]
        public AjaxResult ChangeRef([FromBody]Customer _customer)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _CustomerDL.UpdateCustomer(_customer);
            }
            catch (Exception ex)
            {
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Success = false;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Service thực hiện thêm mới khách hàng
        /// Người tạo: LHQuan 27/08/2019
        /// </summary>
        /// <param name="customerItem"></param>
        /// <returns></returns>
        [Route("customers")]
        [HttpPost]
        public AjaxResult Post([FromBody]Customer customerItem)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _CustomerDL.AddCustomer(customerItem);
            }
            catch (Exception ex)
            {
                _ajaxResult.Data = ex;
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Service thực hiện lấy thông tin khách hàng theo ID
        /// Người tạo: LHQuan 27/08/2019
        /// </summary>
        /// <param name="customerid"></param>
        /// <returns></returns>
        [Route("customers/{customerid}")]
        [HttpGet]
        public AjaxResult GetCustomerByID([FromUri]Guid customerid)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _CustomerDL.GetCustomerByID(customerid);
            }
            catch (Exception ex)
            {
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Success = false;
            }
            return _ajaxResult;
        }
    }
}