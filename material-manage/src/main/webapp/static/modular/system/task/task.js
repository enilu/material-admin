/**
 * 系统参数管理初始化
 */
var Task = {
    id: "TaskTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Task.initColumn = function () {
    return [
            {field: 'selectItem', checkbox: true},
            {title: 'ID', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '任务名', field: 'name', visible: true, align: 'center', valign: 'middle',formatter:function(data,row){
                return '<a href="javascript:;" onclick="Task.openTaskDetail('+row.id+')">'+data+'</a>';
            }},
            {title: '执行类', field: 'jobClass', visible: true, align: 'center', valign: 'middle'},
            {title: '定时规则', field: 'cron', visible: true, align: 'center', valign: 'middle'},
            {title: '任务说明', field: 'note', visible: true, align: 'center', valign: 'middle'},
            {title: '最近执行时间',field:'execAt',visible:true,align:'center',valign:'middle'},
            {title: '最近执行结果',field:'execResult',visible:true,align:'center',valign:'middle'},
            {title: '状态',field:'disabled',visible:true,align:'center',valign:'middle',formatter:function(data,row){
                var button = '';
                console.log(data);
                if(!data) {
                    button += '<div class="toggle-switch"> <input id="ts'+row.id+'" type="checkbox" hidden="hidden" checked="checked" onclick="Task.updateDisalbed('+row.id+','+!row.disabled+')"> <label for="ts'+row.id+'" class="ts-helper"></label> </div>';
                }else{
                    button += '<div class="toggle-switch"> <input id="ts'+row.id+'" type="checkbox" hidden="hidden" onclick="Task.updateDisalbed('+row.id+','+!row.disabled+')""> <label for="ts'+row.id+'" class="ts-helper"></label> </div>';
                }
                return button;
            }},

        {title: '操作', visible: true, align: 'center', valign: 'middle',
            formatter:function(data,row){
                var button = '';
                button += '<button type="button" class="btn bgm-lightgreen btn-icon waves-effect waves-circle" onclick="Task.viewLog('+row.id+')" title="查看日志"><span class="zmdi zmdi-menu"></span></button>';
                button += '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="Task.delete('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';
                return button
            }}
    ];
};

Task.enable = function(id){
    console.log(id);
    Task.updateDisalbed(id,false)
}
Task.disable = function(id){
    console.log(id);
    Task.updateDisalbed(id,true);
}
Task.updateDisalbed=function(id,disabled){
    var url = Feng.ctxPath;
    console.log(disabled);
    if(disabled){
        //禁用
        url += '/task/disable';
    }else{
        //启用
        url += '/task/enable';
    }
    var ajax = new $ax(url, function (data) {
        Feng.success(disabled?'禁用成功':'启用成功');
        Task.table.refresh();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set("taskId",id);
    ajax.start();
}

/**
 * 检查是否选中
 */
Task.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Task.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加系统参数
 */
Task.openAddTask = function () {
    var index = layer.open({
        type: 2,
        title: '添加系统参数',
        area: ['65%', '370px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/task/task_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看系统参数详情
 */
Task.openTaskDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '系统参数详情',
            area: ['65%', '400px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/task/task_update/' + id
        });
        this.layerIndex = index;
};

Task.viewLog = function (id) {
        var index = layer.open({
            type: 2,
            title: '查看任务日志',
            area: ['75%', '75%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/task/viewLog/' + id
        });
        this.layerIndex = index;

};
/**
 * 删除系统参数
 */
Task.delete = function (id) {
    var operation = function() {
        var ajax = new $ax(Feng.ctxPath + "/task/delete", function (data) {
            Feng.success("删除成功!");
            Task.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("taskId", id);
        ajax.start();
    };

    Feng.confirm("确认删除该记录?", operation);
};

/**
 * 查询系统参数列表
 */
Task.search = function () {
    var queryData = {};
    queryData['condition'] = $("#name").val();
    Task.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Task.initColumn();
    var table = new BSTable(Task.id, "/task/list", defaultColunms);
    table.setPaginationType("client");
    Task.table = table.init();
});
