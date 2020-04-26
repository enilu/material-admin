# Change Log
## latest
- Fix 业务日志中如果获取不到字段值对应的中文名称则返回字段名本身，代替之前的null
- Issue IN查询增加使用数组作为参数
- Change 调整按钮样式
- Issue BaseService增加缓存支持
- Issue BaseService添加count方法
- Issue 添加实现性质功能：使用leaflet提供gis服务
- Issue 添加实验性质功能：使用actuator对应用进行监控
- Issue 针对ajax-object.js返回的异常信息统一处理
- Issue 代码生成功能针对列表页面生成根据字段排序功能
- Issue service层封装根据sql和条件查询数据列表功能

## Fixes
- Fix 更新缓存的时候连带更新常量工具类中使用的本地(TimeCacheMap)缓存
