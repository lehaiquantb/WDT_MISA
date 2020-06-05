class Base {
    constructor() {

    }
    /**
     * Hàm thực hiện lấy dữ liệu từ database có phân trang
     * Người tạo: LHQuan
     * Ngày tạo: 26/08/2019
     * */
    loadData() {
        var me = this;
        var fakeData = [];
        var pageIndex = $('.page-index').val();
        var totalPage = me.getTotalPage();

        if (pageIndex >= totalPage) {
            pageIndex = totalPage;
            $('input.page-index').val(pageIndex);
            $('button.next-page').attr('disabled', true);
            $('button.last-page').attr('disabled', true);
        }
        else if (pageIndex == 1) {
            $('button.first-page').attr('disabled', true);
            $('button.prev-page').attr('disabled', true);
        }
        else if (pageIndex > 1 && pageIndex < totalPage) {
            $('button.first-page').removeAttr('disabled');
            $('button.prev-page').removeAttr('disabled');
            $('button.last-page').removeAttr('disabled');
            $('button.next-page').removeAttr('disabled');
        }

        var pageSize = $('.select-page-size option:selected').val();
        $.ajax({
            method: 'GET',
            url: '/customers/{0}/{1}'.format(pageIndex, pageSize),
            beforeSend: function () {
                $('#loading').show();
                $('.main-table tbody').empty();
            },
            success: function (res) {
                if (res.Success) {
                    $('#loading').hide();
                    fakeData = res.Data;
                    me.bindPagingData(fakeData);
                    me.bindInfo(me);
                    me.getTotalPage();
                }
                else {
                    alert(res.Message);
                };
            },
            error: function (res) {
                alert("Lấy dữ liệu bị lỗi, vui lòng liên hệ MISA");
            }
        });
    }


    /**
     * Hàm binding dữ liệu khách hàng ra table
     * Người tạo: LHQuan 26/08/2019
     * @param {any} fakeData
     */
    bindPagingData(fakeData) {
        var fields = $('.main-table th[fieldName]');
        $.each(fakeData, function (index, itemData) {
            var rowHTML = $('<tr></tr>').data('recordID', itemData['CustomerID']);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = itemData[fieldName];
                var cls = 'text-left';
                if (fieldName == 'MoneyInDebt') {
                    fieldValue = fieldValue.formatMoney();
                    cls = 'text-right';
                }
                if (fieldName == 'FiveFoodMember') {
                    cls = 'text-center';
                    rowHTML.append('<td class = "{1} {2}"><input type="checkbox" {0}/></td>'.format('checked', cls, fieldName));
                }
                else if (fieldName == 'StopWatching') {
                    cls = 'text-center';
                    rowHTML.append('<td class = "{0} {1}"><input type="checkbox"/></td>'.format(cls, fieldName));
                }
                else {
                    rowHTML.append('<td class="{0} {2}">{1}</td>'.format(cls, fieldValue, fieldName));
                }
            });
            $('.main-table tbody').append(rowHTML);
        });
    }

    /**
     * Hàm thực hiện thông tin "hiển thị từ ? đến ? trên ? kết quả"
     * */
    bindInfo(event) {
        $('.show-amount').empty();
        var totalRecord = event.getTotalRecord();
        var pageIndex = $('.page-index').val();
        var pageSize = $('.select-page-size option:selected').val();
        pageSize = Number(pageSize);
        pageIndex = Number(pageIndex);
        var beginRecord = (pageIndex - 1) * pageSize + 1;
        var lastRecord = beginRecord + pageSize - 1;
        $('.show-amount').append('Hiển thị&nbsp;' + beginRecord + '&nbsp;-&nbsp;' + lastRecord + '&nbsp;trên&nbsp;' + totalRecord + '&nbsp;kết quả');
    }

    /**
     * Hàm thực hiện lấy tổng số bản ghi khách hàng
     * Người tạo: LHQuan 27/08/2019
     * */
    getTotalRecord() {
        var totalRecord;
        $.ajax({
            method: 'GET',
            url: '/customers',
            async: false,
            success: function (res) {
                if (res.Success) {
                    totalRecord = res.Data.length;
                    totalRecord = Number(totalRecord);
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
                alert("Hệ thống đang lỗi. Vui lòng liên hệ MISA");
            }
        });
        return totalRecord;
    }

    /**
     * Hàm thực hiện lấy tổng số trang có được và ỉn ra màn hình
     * Người tạo: LHQuan 27/08/2019
     * */
    getTotalPage() {
        $('.page-total').empty();
        var totalPage;
        var totalRecord = this.getTotalRecord();
        var pageSize = $('.select-page-size option:selected').val();
        pageSize = Number(pageSize);
        totalPage = totalRecord / pageSize;
        totalPage = Math.ceil(totalPage);
        $('.page-total').append(totalPage);
        return totalPage;
    }
}