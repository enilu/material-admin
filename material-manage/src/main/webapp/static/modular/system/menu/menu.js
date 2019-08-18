/**
 * 角色管理的单例
 */
var Menu = {
    id: "menuTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Menu.initColumn = function () {
    var columns = [
        {title: 'ID', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '17%',formatter:function(data,row){
            return '<a href="javascript:;" onclick="Menu.openChangeMenu('+row.id+')">'+row.name+'</a>';
        }},
        {title: '菜单编号', field: 'code', align: 'center', valign: 'middle', sortable: true, width: '12%'},
        {title: '菜单父编号', field: 'pcode', align: 'center', valign: 'middle', sortable: true},
        {title: '请求地址', field: 'url', align: 'center', valign: 'middle', sortable: true, width: '15%'},
        {title: '排序', field: 'num', align: 'center', valign: 'middle', sortable: true},
        {title: '层级', field: 'levels', align: 'center', valign: 'middle', sortable: true},
        {title: '是否是菜单', field: 'isMenuName', align: 'center', valign: 'middle', sortable: true},
        {title: '状态', field: 'statusName', align: 'center', valign: 'middle', sortable: true},
        {title: '操作',formatter:function(data,row){
            return   '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="Menu.delMenu('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
        ]
    return columns;
};


/**
 * 点击添加菜单
 */
Menu.openAddMenu = function () {
    var index = layer.open({
        type: 2,
        title: '添加菜单',
        area: ['850px', '380px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/menu/menu_add'
    });
    this.layerIndex = index;
};

/**
 * 点击修改
 */
Menu.openChangeMenu = function (id) {
        var index = layer.open({
            type: 2,
            title: '修改菜单',
            area: ['850px', '380px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/menu/menu_edit/' + id
        });
        this.layerIndex = index;
};

/**
 * 删除
 */
Menu.delMenu = function (id) {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/menu/remove", function (data) {
                Feng.success("删除成功!");
                Menu.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("menuId", id);
            ajax.start();
        };

        Feng.confirm("是否删除该记录?", operation);
};

/**
 * 搜索
 */
Menu.search = function () {
    var queryData = {};

    queryData['menuName'] = $("#menuName").val();
    queryData['level'] = $("#level").val();

    Menu.table.refresh({query: queryData});
}

$(function () {
    var defaultColunms = Menu.initColumn();
    var table = new BSTreeTable(Menu.id, "/menu/list", defaultColunms);
    table.setExpandColumn(2);
    table.setIdField("id");
    table.setCodeField("code");
    table.setParentCodeField("pcode");
    table.setExpandAll(false);
    table.init();
    Menu.table = table;
});
