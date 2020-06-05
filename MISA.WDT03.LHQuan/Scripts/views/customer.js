$(document).ready(function () {
    $('.dialog').hide();
    $('.validate').hide();
});

class Customer extends Base {
    constructor() {
        super();
        this.loadData();
        this.InitEvents();
        this.holdEvent();
    }

    /**
     * Hàm xử lí các sự kiện
     * Người tạo: LHQuan 27/08/2019
     * */
    InitEvents() {
        $(document).on('click', 'button.reload,.refresh-page', this.loadData.bind(this));
        $(document).on('keyup', 'input.page-index', this.enterKeyUp.bind(this));
        $(document).on('click', 'button.first-page', this.firstPage.bind(this));
        $(document).on('click', 'button.prev-page', this.prevPage.bind(this));
        $(document).on('click', 'button.next-page', this.nextPage.bind(this));
        $(document).on('click', 'button.last-page', this.lastPage.bind(this));
        $(document).on('change', '.select-page-size', this.selectPage.bind(this));
        $(document).on('click', '.main-table tbody tr', '1', this.tickRow);
        $(document).on('click', 'button.delete', this.noticeDelete.bind(this));
        $(document).on('click', 'button.del-yes', this.delYes.bind(this));
        $(document).on('click', 'button.del-no', function () {
            $('.dialog-del-customer').dialog('close');
            $('.main-table tbody tr').removeClass('selected');
        });
        $(document).on('click', 'button.edit', this.showDialogEdit.bind(this));
        $(document).on('click', 'button.add-new', this.showDialogAdd.bind(this));
        $(document).on('click', '.dialog-edit .btn-save', { "jsObject": "PUT" }, this.saveCustomer.bind(this));
        $(document).on('click', '.dialog-add .btn-save', { "jsObject": "POST" }, this.saveCustomer.bind(this));
        $(document).on('click', '.dialog-add .btn-save-add', { "jsObject": "POST", "add": "add" }, this.saveCustomer.bind(this));
        $(document).on('click', '.dialog-edit .btn-save-add', { "jsObject": "PUT", "add": "add" }, this.saveCustomer.bind(this));
        $(document).on('click', 'button.btn-cancel', function () {
            $('.dialog-customer').dialog('close');
            $('.main-table tbody tr').removeClass('selected');
        });
    }


    /**
     * Các hàm thực hiện validate dữ liệu
     * Người tạo: LHQuan 27/08/2019
     * */
    validatePageIndex(x) {
        if (!Number.isInteger(x)) {
            alert("Bạn phải nhập chỉ số trang muốn chuyển đến!");
            return false;
        } else {
            return true;
        }
    }

    /**
     * Hàm validate dữ liệu input
     * @param {any} email
     */
    //validateInput(email) {
    //    IsValidEmail(email)
    //    {
    //        try {
    //            var addr = new System.Net.Mail.MailAddress(email);
    //            return addr.Address == email;
    //        }
    //        catch {
    //            return false;
    //        }
    //    }
    //}

    /**
     * Các hàm thực hiện chuyển tiếp trang
     * Người tạo: LHQuan 27/08/2019
     * */
    enterKeyUp() {
        var me = this;
        var x = $('input.page-index').val();
        x = Number(x);
        if (event.keyCode == 13) {
            if (me.validatePageIndex(x)) {
                me.loadData();
            }
        }
    }

    //Chọn kích cỡ trang
    selectPage() {
        this.loadData();
    }

    //Trang đầu
    firstPage() {
        $('input.page-index').val(1);
        this.loadData();
    }

    //Trang trước
    prevPage() {
        var x = $('input.page-index').val();
        x = Number(x) - 1;
        $('input.page-index').val(x);
        this.loadData();
    }

    //Trang tiếp theo
    nextPage() {
        var x = $('input.page-index').val();
        x = Number(x) + 1;
        $('input.page-index').val(x);
        this.loadData();
    }

    //Trang cuối
    lastPage() {
        var me = this;
        var lastPage = me.getTotalPage();
        $('input.page-index').val(lastPage);
        me.loadData();
    }

    /**
     * Hàm xử lí sự kiện khi click vào 1 hàng trong bảng
     * Người tạo: LHQuan 27/08/2019
     * */
    tickRow() {
        $('.main-table tbody tr').removeClass('selected');
        $(this).addClass('selected');
        $('button.edit,button.delete,button.duplicate').removeAttr('disabled');
    }

    tickMulRow() {
        $('.main-table tbody tr').on('click', function () {
            $(this).addClass('selected');
        });
    }

    /**
     * Hàm lấy danh sách ID các hàng đã chọn
     * Người tạo: LHQuan 27/08/2019
     * */
    getListCustomerID() {
        var listCustomerID = [];
        var listRow = $('.selected');
        $.each(listRow, function (index, item) {
            var customerID = $(item).data('recordID');
            listCustomerID.push(customerID);
        });
        return listCustomerID;
    }

    /**
     * Hàm xác nhận có khi xóa
     * Người tạo: LHQuan 27/08/2019
     * */
    delYes() {
        var me = this;
        var listCustomerID = me.getListCustomerID();
        me.deleteMulCustomers(listCustomerID, me);
        $('.dialog-del-customer').dialog('close');
    }

    /**
     * Hàm thông báo khi xóa 1 hay nhiều bản ghi
     * Người tạo: LHQuan 27/08/2019
     */
    noticeDelete() {
        var me = this;
        var listCustomerID = me.getListCustomerID();
        if (listCustomerID.length == 1) {
            var customerNo = $('.selected .{0}'.format('CustomerNo')).text();
            var customerName = $('.selected .{0}'.format('CustomerName')).text();
            $('.notice-del-text').empty();
            $('.notice-del-text').append('Bạn có chắc chắn muốn xóa khách hàng&nbsp;(' + customerNo + '&nbsp;-&nbsp;' + customerName + ')&nbsp;không?');
            $(".dialog-del-customer").dialog({
                title: 'CUKCUK - Quản lý nhà hàng',
                height: 125,
                width: 400,
                modal: true,
                resizable: false,
            });
        }
    }


    /**
     * Hàm thực hiện xóa nhiều bản ghi khách hàng
     * Người tạo: LHQuan 27/08/2019
     * */
    deleteMulCustomers(listCustomerID, me) {
        $.ajax({
            method: 'DELETE',
            url: '/customers',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listCustomerID),
            success: function (res) {
                me.loadData();
            },
            error: function (res) {
                alert("Chức năng xóa đang bị lỗi! Vui lòng liên hệ MISA")
            }
        });
    }

    /**
     * Hàm xử lí sự kiện dữ phím Ctrl-left
     * Người tạo: LHQuan 27/08/2019
     * */
    holdEvent() {
        var me = this;
        document.addEventListener('keydown', (event) => {
            if (event.repeat && event.code == "ControlLeft") {
                return true
            } else {
                return false;
            }
        });
    }

    /**
     * Các hàm thực hiện show dialog
     * Người tạo: LHQuan 27/08/2019
     * */
    openDialogCustomer() {
        var cls = arguments[0];
        var title = arguments[1];
        $(".dialog-customer").dialog({
            height: 330,
            width: 675,
            modal: true,
            resizable: false,
            dialogClass: cls,
            title: title,
        });

        $(function () {
            $("input[fieldName=Birthday]").datepicker({
                altFormat: false,
                showOn: "button",
                buttonImageOnly: true,
                dateFormat: 'dd/mm/yy'
            });
        });
    }

    showDialogEdit() {
        var me = this;
        me.openDialogCustomer("dialog-edit", "Sửa khách hàng");
        me.BindingDataDialog();
    }

    showDialogAdd() {
        var me = this;
        me.openDialogCustomer("dialog-add", "Thêm khách hàng");
        $('.dialog-customer input').val("");
    }

    /**
     * Hàm thực hiện lấy id của hàng đã chọn
     * Người tạo: LHQuan 27/08/2019
     * */
    GetRowID() {
        var id = $('.selected').data('recordID');
        return id;
    }

    /**
     * Hàm thực hiện in thông tin khách hàng ra dialoog
     * Người tạo: LHQuan 27/08/2019
     * */
    BindingDataDialog() {
        var id = this.GetRowID();
        $.ajax({
            method: 'Get',
            url: '/customers/{0}'.format(id),
            success: function (res) {
                if (res.Success) {
                    var fields = $('.dialog-customer input[fieldName]');
                    debugger
                    $.each(fields, function (index, item) {
                        var fieldName = item.getAttribute('fieldName');
                        $(this).val(res.Data[fieldName]);
                    });
                }
                else {
                    alert(res.Message);
                };
            },
            error: function () {
                alert("Hệ thống lỗi! Vui lòng liên hệ MISA");
            }
        });
    }

    /**
     * Hàm thực hiện lưu dữ liệu
     * Người tạo: LHQuan 27/08/2019
     * @param {any} event
     */
    saveCustomer(event) {
        var method = event.data["jsObject"];
        var me = this;
        var inputs = $('.dialog-customer input');
        var object = {};
        $.each(inputs, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var fieldValue = $(this).val();
            object[fieldName] = fieldValue;
        });
        if (method === "PUT") {
            object["CustomerID"] = me.GetRowID();
        }
        $.ajax({
            method: method,
            url: '/customers',
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('.dialog-customer').dialog('close');
                me.loadData();
                setTimeout(function () {
                    if (event.data["add"] == "add") {
                        me.showDialogAdd();
                    }
                }, 1000);
            },
            error: function () {
                alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
            }
        });
    }
}


var customerJS = new Customer(); 