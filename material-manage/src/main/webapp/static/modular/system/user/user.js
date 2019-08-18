/**
 * 系统管理--用户管理的单例对象
 */
var MgrUser = {
    id: "managerTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    deptid:0
};

/**
 * 初始化表格的列
 */
MgrUser.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true},
        {title: 'ID', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '账号', field: 'account', align: 'center', valign: 'middle', sortable: true,formatter:function(data,row){
            return '<a href="javascript:;" onclick="MgrUser.openChangeUser('+row.id+')">'+row.account+'</a>';
        }},
        {title: '姓名', field: 'name', align: 'center', valign: 'middle', sortable: true},
        {title: '性别', field: 'sexName', align: 'center', valign: 'middle', sortable: true},
        {title: '角色', field: 'roleName', align: 'center', valign: 'middle', sortable: true,formatter:function(data,row){
            if(data.length>5){
                return '<i class="zmdi zmdi-more zmdi-hc-fw" title="'+data+'"></i>';
            }
            return data;
        }},
        {title: '部门', field: 'deptName', align: 'center', valign: 'middle', sortable: true},
        {title: '邮箱', field: 'email', align: 'center', valign: 'middle', sortable: true},
        {title: '电话', field: 'phone', align: 'center', valign: 'middle', sortable: true},
        {title: '创建时间', field: 'createtime', align: 'center', valign: 'middle', sortable: true},
        {title: '状态',field:'status',visible:true,align:'center',valign:'middle',formatter:function(data,row){

            if(data == 3){
                return '已删除';
            }
            if(data == 1) {
                return '<div class="toggle-switch"> <input id="ts'+row.id+'" type="checkbox" hidden="hidden" checked="checked" onclick="MgrUser.freezeAccount('+row.id+')"> <label for="ts'+row.id+'" class="ts-helper"></label> </div>';
            }
            if(data == 2){
                return   '<div class="toggle-switch"> <input id="ts'+row.id+'" type="checkbox" hidden="hidden" onclick="MgrUser.unfreeze('+row.id+')""> <label for="ts'+row.id+'" class="ts-helper"></label> </div>';
            }
        }},
        {title: '操作',formatter:function(data,row){
            return '<button type="button" class="btn bgm-lightblue btn-icon waves-effect waves-circle" onclick="MgrUser.resetPwd('+row.id+')" title="重置密码"><span class="zmdi zmdi-lock-open"></span></button>'
                +  '<button type="button" class="btn bgm-lightgreen btn-icon waves-effect waves-circle" onclick="MgrUser.roleAssign('+row.id+')" title="分配角色"><span class="zmdi zmdi-assignment-account"></span></button>'
            + '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="MgrUser.delMgrUser('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
    ];
    return columns;
};

/**
 * 检查是否选中
 */
MgrUser.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        MgrUser.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加管理员
 */
MgrUser.openAddMgr = function () {
    var index = layer.open({
        type: 2,
        title: '添加管理员',
        area: ['800px', '440px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/mgr/user_add'
    });
    this.layerIndex = index;
};

/**
 * 点击修改按钮时
 * @param userId 管理员id
 */
MgrUser.openChangeUser = function (id) {
        var index = layer.open({
            type: 2,
            title: '编辑管理员',
            area: ['800px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/mgr/user_edit/' + id
        });
        this.layerIndex = index;
};

/**
 * 点击角色分配
 * @param
 */
MgrUser.roleAssign = function (id) {
        var index = layer.open({
            type: 2,
            title: '角色分配',
            area: ['300px', '400px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/mgr/role_assign/' + id
        });
        this.layerIndex = index;
};

/**
 * 删除用户
 */
MgrUser.delMgrUser = function (id) {
    var operation = function(){
        var userId = MgrUser.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/mgr/delete", function () {
            Feng.success("删除成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", id);
        ajax.start();
    };

    Feng.confirm("是否删除该账户?",operation,"删除后该用户将无法恢复，请谨慎操作");

};

/**
 * 冻结用户账户
 * @param userId
 */
MgrUser.freezeAccount = function (id) {
    console.log(id)
        var ajax = new $ax(Feng.ctxPath + "/mgr/freeze", function (data) {
            Feng.success("冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("冻结失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", id);
        ajax.start();
};

/**
 * 解除冻结用户账户
 * @param userId
 */
MgrUser.unfreeze = function (id) {

    console.log(id)
        var ajax = new $ax(Feng.ctxPath + "/mgr/unfreeze", function (data) {
            Feng.success("解除冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("解除冻结失败!");
        });
        ajax.set("userId", id);
        ajax.start();
}

/**
 * 重置密码
 */
MgrUser.resetPwd = function (id) {
        Feng.confirm('是否重置密码为111111？', function () {
            var ajax = new $ax(Feng.ctxPath + "/mgr/reset", function (data) {
                Feng.success("重置密码成功!");
            }, function (data) {
                Feng.error("重置密码失败!");
            });
            ajax.set("userId", id);
            ajax.start();
        });
};

MgrUser.resetSearch = function () {
    $("#name").val("");
    $("#beginTime").val("");
    $("#endTime").val("");
    MgrUser.search();
}

MgrUser.search = function () {
    var queryData = {};

    queryData['deptid'] = MgrUser.deptid;
    queryData['name'] = $("#name").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();

    MgrUser.table.refresh({query: queryData});
}

MgrUser.onClickDept = function (e, treeId, treeNode) {
    MgrUser.deptid = treeNode.id;
    MgrUser.search();
};

$(function () {
    var defaultColunms = MgrUser.initColumn();
    var table = new BSTable("managerTable", "/mgr/list", defaultColunms);
    table.setPaginationType("client");
    MgrUser.table = table.init();
    var ztree = new $ZTree("deptTree", "/dept/tree");
    ztree.bindOnClick(MgrUser.onClickDept);
    ztree.init();
});
