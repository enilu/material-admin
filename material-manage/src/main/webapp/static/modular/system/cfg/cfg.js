/**
 * 系统参数管理初始化
 */
var Cfg = {
    id: "CfgTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Cfg.initColumn = function () {
    return [
        {field: 'selectItem', checkbox: true},
        {title: 'ID', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '参数名', field: 'cfgName', visible: true, align: 'center', valign: 'middle',formatter:function(data,row){
            return '<a href="javascript:;" onclick="Cfg.openCfgDetail('+row.id+')">'+data+'</a>';
        }},
        {title: '参数值', field: 'cfgValue', visible: true, align: 'center', valign: 'middle'},
        {title: '参数描述', field: 'cfgDesc', visible: true, align: 'center', valign: 'middle'},
        {title: '操作',formatter:function(data,row){
            return '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="Cfg.delete('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
    ];
};


/**
 * 点击添加系统参数
 */
Cfg.openAddCfg = function () {
    var index = layer.open({
        type: 2,
        title: '添加系统参数',
        area: ['65%', '280px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/cfg/cfg_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看系统参数详情
 */
Cfg.openCfgDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '系统参数详情',
            area: ['65%', '280px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/cfg/cfg_update/' + id
        });
        this.layerIndex = index;

};

/**
 * 删除系统参数
 */
Cfg.delete = function (id) {
    var operation = function() {
        var ajax = new $ax(Feng.ctxPath + "/cfg/delete", function (data) {
            Feng.success("删除成功!");
            Cfg.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("cfgId", id);
        ajax.start();
    };

    Feng.confirm("确认删除该记录?", operation);

};

/**
 * 查询系统参数列表
 */
Cfg.search = function () {
    var queryData = {};
    queryData['cfgName'] = $("#cfgName").val();
    queryData['cfgValue'] = $("#cfgValue").val();
    Cfg.table.refresh({query: queryData});
};

Cfg.reset = function () {
    $("#cfgName").val("");
    $("#cfgValue").val("");
    this.search();
};
$(function () {
    var defaultColunms = Cfg.initColumn();
    var table = new BSTable(Cfg.id, "/cfg/list", defaultColunms);
    table.setPaginationType("server");
    Cfg.table = table.init();
});
