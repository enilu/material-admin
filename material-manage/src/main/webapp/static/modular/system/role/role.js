/**
 * 角色管理的单例
 */
var Role = {
    id: "roleTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Role.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true },
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '名称', field: 'name', align: 'center', valign: 'middle', sortable: true,formatter:function(data,row){
            return '<a href="javascript:;" onclick="Role.openChangeRole('+row.id+')">'+data+'</a>';
        }},
        {title: '上级角色', field: 'pName', align: 'center', valign: 'middle', sortable: true},
        {title: '所在部门', field: 'deptName', align: 'center', valign: 'middle', sortable: true},
        {title: '别名', field: 'tips', align: 'center', valign: 'middle', sortable: true},
        {title: '操作',formatter:function(data,row){
            return '<button type="button" class="btn btn-icon   waves-effect waves-circle" onclick="Role.assign('+row.id+')" title="分配权限"><span class="zmdi zmdi-assignment-check"></span></button>'
                +
                '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="Role.delRole('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
    ]
    return columns;
};

/**
 * 点击添加管理员
 */
Role.openAddRole = function () {
    var index = layer.open({
        type: 2,
        title: '添加角色',
        area: ['800px', '330px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/role/role_add'
    });
    this.layerIndex = index;
};

/**
 * 点击修改按钮时
 */
Role.openChangeRole = function (id) {
        var index = layer.open({
            type: 2,
            title: '修改角色',
            area: ['800px', '330px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/role/role_edit/' + id
        });
        this.layerIndex = index;
};

/**
 * 删除角色
 */
Role.delRole = function (id) {
        var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/role/remove", function () {
                Feng.success("删除成功!");
                Role.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("roleId", id);
            ajax.start();
        };
        Feng.confirm("确认删除该角色?",operation);

};

/**
 * 权限配置
 */
Role.assign = function (id) {
        var index = layer.open({
            type: 2,
            title: '权限配置',
            area: ['300px', '550px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/role/role_assign/' +id
        });
        this.layerIndex = index;
};

/**
 * 搜索角色
 */
Role.search = function () {
    var queryData = {};
    queryData['roleName'] = $("#roleName").val();
    Role.table.refresh({query: queryData});
}

$(function () {
    var defaultColunms = Role.initColumn();
    var table = new BSTable(Role.id, "/role/list", defaultColunms);
    table.setPaginationType("client");
    table.init();
    Role.table = table;
});
