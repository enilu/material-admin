/**
 * 部门管理初始化
 */
var Dept = {
    id: "DeptTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Dept.initColumn = function () {
    return [
        {title: 'id', field: 'id', align: 'center', valign: 'middle',width:'50px'},
        {title: '部门简称', field: 'simplename', align: 'center', valign: 'middle', sortable: true,formatter:function(data,row){
            return '<a href="javascript:;" onclick="Dept.openDeptDetail('+row.id+')">'+row.simplename+'</a>';
        }},
        {title: '部门全称', field: 'fullname', align: 'center', valign: 'middle', sortable: true},
        {title: '排序', field: 'num', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'tips', align: 'center', valign: 'middle', sortable: true},
        {title: '操作',formatter:function(data,row){
            return '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="Dept.delete('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
    ];
};

/**
 * 点击添加部门
 */
Dept.openAddDept = function () {
    var index = layer.open({
        type: 2,
        title: '添加部门',
        area: ['800px', '320px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/dept/dept_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看部门详情
 */
Dept.openDeptDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '部门详情',
            area: ['800px', '320px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/dept/dept_update/' + id
        });
        this.layerIndex = index;

};

/**
 * 删除部门
 */
Dept.delete = function (id) {
        var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/dept/delete", function () {
                Feng.success("删除成功!");
                Dept.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("deptId",id);
            ajax.start();
        };

        Feng.confirm("是否刪除该部门?", operation);

};

/**
 * 查询部门列表
 */
Dept.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Dept.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Dept.initColumn();
    var table = new BSTreeTable(Dept.id, "/dept/list", defaultColunms);
    table.setExpandColumn(2);
    table.setIdField("id");
    table.setCodeField("id");
    table.setParentCodeField("pid");
    table.setExpandAll(true);
    table.init();
    Dept.table = table;
});
