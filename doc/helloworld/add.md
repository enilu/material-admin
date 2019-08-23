# add

## 添加参数

添加参数功能为点击“添加”按钮后调用对应的js代码逻辑弹出添加页面，在添加页面输入相关信息提交保存，保存成功后关闭弹窗，并刷新参数列表数据.

### 添加按钮注册点击函数:

```html
 @if(shiro.hasPermission("/cfg/add")){
     <#button name="添加" icon="fa-plus" clickFun="Cfg.openAddCfg()" space="true"/>
 @}
```
### 添加 按钮点击逻辑：

```javascript
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
```
### 添加页面代码

```html
@layout("/common/include.html"){
<div class="card">
    <div class="card-body card-padding">
        <div class="form-horizontal">
            <input type="hidden" id="id" value="">
            <div class="row">
                <div class="col-sm-6 b-r">
                            <#input id="cfgName" name="参数名"/>
                            <#input id="cfgValue" name="参数值" underline="true"/>
                </div>
                <div class="col-sm-6">
                            <#input id="cfgDesc" name="参数描述" underline="true"/>
                </div>
            </div>
            <div class="row btn-group-m-t">
                <div class="col-sm-10">
                    <#button btnCss="info" name="提交" id="ensure" icon="fa-check" clickFun="CfgInfoDlg.addSubmit()"/>
                    <#button btnCss="danger" name="取消" id="cancel" icon="fa-eraser" clickFun="CfgInfoDlg.close()"/>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="${ctxPath}/static/modular/system/cfg/cfg_info.js"></script>
@}
```

### 点击“提交”按钮提交参数保存逻辑：
_cfg_info.js_:

```javascript
/**
 * 提交添加
 */
CfgInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/cfg/add", function(data){
        Feng.success("添加成功!");
        window.parent.Cfg.table.refresh();
        CfgInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.cfgInfoData);
    ajax.start();
}

```


## 后台保存逻辑

```java
/**
 * 跳转到添加参数页面
 */
@RequestMapping(value = "/cfg_add",method = RequestMethod.GET)
public String add() {
    return PREFIX + "cfg_add.html";
}

/**
 * 新增参数
 */
@RequestMapping(value = "/add",method = RequestMethod.POST)
@ResponseBody
@BussinessLog(value = "添加参数", key = "cfgName",dict = CfgDict.class)
public Object add(@Valid Cfg cfg) {
    cfgService.saveOrUpdate(cfg);
    return SUCCESS_TIP;
}
```