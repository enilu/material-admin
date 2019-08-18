/**
 * 消息发送器管理初始化
 */
var MessageSender = {
    id: "MessageSenderTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
MessageSender.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'ID', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '名称', field: 'name', visible: true, align: 'center', valign: 'middle',formatter:function(data,row){
            return '<a href="javascript:;" onclick="MessageSender.openDetail('+row.id+')">'+data+'</a>';
        }},
        {title: '发送类', field: 'className', visible: true, align: 'center', valign: 'middle'},
        {title: '运营商短信模板编号', field: 'tplCode', visible: true, align: 'center', valign: 'middle'},
        {title: '操作',formatter:function(data,row){
            return   '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="MessageSender.delete('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
            
    ];
};


/**
 * 点击添加发送器
 */
MessageSender.openAdd = function () {
    var index = layer.open({
        type: 2,
        title: '添加发送器',
        area: ['60%', '45%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/message/sender/add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看发送器详情
 */
MessageSender.openDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '发送器详情',
            area: ['60%', '50%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/message/sender/update/' + id
        });
        this.layerIndex = index;
};

/**
 * 删除发送器
 */
MessageSender.delete = function (id) {
       var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/message/sender", function (data) {
                Feng.success("删除成功!");
                MessageSender.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id",id);
            ajax.setType("delete");
            ajax.start();
        };
        Feng.confirm("是否删除消息发送器？",operation);
};


$(function () {
    var defaultColunms = MessageSender.initColumn();
    var table = new BSTable(MessageSender.id, "/message/sender/list", defaultColunms);
    table.setPaginationType("server");
    MessageSender.table = table.init();
});
