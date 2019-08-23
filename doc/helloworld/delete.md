# delete

## 针对要删除的数据点击行尾的删除按钮即弹出删除确认空，确认删除

_cfg.js_
```javascript
 {title: '操作',formatter:function(data,row){
            return '<button type="button" class="btn btn-info btn-icon waves-effect waves-circle" onclick="Cfg.delete('+row.id+')" title="删除"><span class="zmdi zmdi-delete"></span></button>';

        }}
        
        
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
        ajax.setType('delete');
        ajax.start();
    };
    Feng.confirm("确认删除该记录?", operation);
};        
```
 

## 后台逻辑

```java
/**
 * 删除参数
 */
@RequestMapping(value = "/delete",method = RequestMethod.DELETE)
@ResponseBody
@BussinessLog(value = "删除参数", key = "cfgId",dict = CfgDict.class)
public Object delete(@RequestParam Long cfgId) {
    cfgService.delete(cfgId);
    return SUCCESS_TIP;
}    
```