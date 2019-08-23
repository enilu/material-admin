# list

## 列表页面
列表页面包含分页（根据指定条件）查询数据列表，添加，修改，删除按钮
列表页面针对：添加按钮做了权限控制，具体逻辑在下文再详细描述

```html
@layout("/common/layout.html"){
<div class="block-header">
    <h2>参数管理</h2>
</div>
<div class="card">
    <div class="card-body card-padding">
        <div class="row row-lg">
            <div class="col-sm-12">
                <div class="hidden-xs" id="CfgTableToolbar" role="group">
                    <div class="col-sm-3">
                        <#NameCon id="cfgName" placeholder="参数名" />
                    </div>
                    <div class="col-sm-3">
                        <#NameCon id="cfgValue" placeholder="参数值" />
                    </div>
                    <#button name="搜索" icon="fa-search" clickFun="Cfg.search()"/>
                    <#button name="重置" icon="fa-refresh" clickFun="Cfg.reset()" btnCss="info" space="true"/>
                    @if(shiro.hasPermission("/cfg/add")){
                        <#button name="添加" icon="fa-plus" clickFun="Cfg.openAddCfg()" space="true"/>
                    @}
                </div>
                <#table id="CfgTable"/>
            </div>
        </div>
    </div>
</div>
<script src="${ctxPath}/static/modular/system/cfg/cfg.js"></script>
@}
```

## 查询列表数据的js代码:

```javascript
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


```

## 后台代码
**CfgController**
```java

/**
 * 跳转到参数首页
 */
@RequestMapping(value = "",method = RequestMethod.GET)
public String index() {
    return PREFIX + "cfg.html";
}
/**
 * 分页查询系统参数
 */
@RequestMapping(value = "/list",method = RequestMethod.POST)
@ResponseBody
public Object list(@RequestParam(required = false) String cfgName, @RequestParam(required = false) String cfgValue) {
    Page<Cfg> page = new PageFactory<Cfg>().defaultPage();
    if(StringUtils.isNotEmpty(cfgName)){
        page.addFilter(SearchFilter.build("cfgName", SearchFilter.Operator.LIKE, cfgName));
    }
    if(StringUtils.isNotEmpty(cfgValue)){
        page.addFilter(SearchFilter.build("cfgValue", SearchFilter.Operator.LIKE, cfgValue));
    }
    page = cfgService.queryPage(page);
    return packForBT(page);
}
```