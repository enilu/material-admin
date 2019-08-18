/**
 * 日志管理初始化
 */
var OptLog = {
    id: "OptLogTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
OptLog.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '日志名称', field: 'logname', align: 'center', valign: 'middle', sortable: true,formatter:function(data,row){
            return '<a href="javascript:;" onclick="OptLog.detail('+row.id+')">'+row.logname+'</a>';
        }},
        {title: '日志类型', field: 'logtype', align: 'center', valign: 'middle', sortable: true},
        {title: '用户名称', field: 'userName', align: 'center', valign: 'middle'},
        {title: '类名', field: 'classname', align: 'center', valign: 'middle', sortable: true},
        {title: '方法名', field: 'method', align: 'center', valign: 'middle', sortable: true},
        {title: '时间', field: 'createTime', align: 'center', valign: 'middle', sortable: true}
        ]
};

/**
 * 查看日志详情
 */
OptLog.detail = function (id) {
        var ajax = new $ax(Feng.ctxPath + "/log/detail/" + id, function (data) {
            Feng.infoDetail("日志详情", data.regularMessage);
        }, function (data) {
            Feng.error("获取详情失败!");
        });
        ajax.start();
};


/**
 * 清空日志
 */
OptLog.delLog = function () {
    Feng.confirm("是否清空所有日志?",function(){
        var ajax = Feng.baseAjax("/log/delLog","清空日志");
        ajax.start();
        OptLog.table.refresh();
    });
}

/**
 * 查询表单提交参数对象
 * @returns {{}}
 */
OptLog.formParams = function() {
    var queryData = {};

    queryData['logName'] = $("#logName").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['logType'] = $("#logType").val();

    return queryData;
}

/**
 * 查询日志列表
 */
OptLog.search = function () {

    OptLog.table.refresh({query: OptLog.formParams()});
};
OptLog.reset = function () {
     $("#logName").val('');
     $("#beginTime").val('');
     $("#endTime").val('');
     $("#logType").val('0');
     this.search();

};
$(window).load(function(){
    var defaultColunms = OptLog.initColumn();
    var table = new BSTable(OptLog.id, "/log/list", defaultColunms);
    table.setPaginationType("server");
    table.setQueryParams(OptLog.formParams());
    OptLog.table = table.init();
});
