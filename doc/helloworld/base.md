# 基础代码

## 实体Entity

```java
package cn.enilu.material.bean.entity.system;

import cn.enilu.material.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.validation.constraints.NotBlank;

@Entity(name="t_sys_cfg")
@Table(appliesTo = "t_sys_cfg",comment = "系统参数")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Cfg  extends BaseEntity {
    @Column(name = "cfg_name",columnDefinition = "VARCHAR(256) COMMENT '参数名'")
    @NotBlank(message = "参数名不能为空")
    private String cfgName;
    @Column(name = "cfg_value",columnDefinition = "VARCHAR(512) COMMENT '参数值'")
    @NotBlank(message = "参数值不能为空")
    private String cfgValue;
    @Column(name = "cfg_desc",columnDefinition = "TEXT COMMENT '备注'")
    private String cfgDesc;

}
```

## 数据库操作Repository

```java
public interface CfgRepository extends BaseRepository<Cfg,Long> {
    
}

```
## service
```java
@Service
public class CfgService extends BaseService<Cfg,Long,CfgRepository> {

}    
```
## controller

```java

@Controller
@RequestMapping("/cfg")
public class CfgController extends BaseController {
    @Autowired
    private CfgService cfgService;
    private static String PREFIX = "/system/cfg/";
    /**
     * 跳转到参数首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "cfg.html";
    }

    /**
     * 跳转到添加参数
     */
    @RequestMapping("/cfg_add")
    public String add() {
        return PREFIX + "cfg_add.html";
    }

    /**
     * 跳转到修改参数
     */
    @RequestMapping("/cfg_update/{cfgId}")
    public String update(@PathVariable Long cfgId, Model model) {
        Cfg cfg = cfgService.get(cfgId);
        model.addAttribute("item",cfg);
        return PREFIX + "cfg_edit.html";
    }

    /**
     * 获取参数列表
     */
    @RequestMapping(value = "/list")
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

    /**
     * 新增参数
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    @BussinessLog(value = "添加参数", key = "cfgName",dict = CfgDict.class)
    public Object add(@Valid Cfg cfg) {
       cfgService.saveOrUpdate(cfg);
        return SUCCESS_TIP;
    }

    /**
     * 删除参数
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    @BussinessLog(value = "删除参数", key = "cfgId",dict = CfgDict.class)
    public Object delete(@RequestParam Long cfgId) {
        cfgService.delete(cfgId);
        return SUCCESS_TIP;
    }

    /**
     * 修改参数
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    @BussinessLog(value = "编辑参数", key = "cfgName",dict = CfgDict.class)
    public Object update(@Valid  Cfg cfg) {
       cfgService.update(cfg);
        return SUCCESS_TIP;
    }

    /**
     * 参数详情
     */
    @RequestMapping(value = "/detail/{cfgId}")
    @ResponseBody
    public Object detail(@PathVariable("cfgId") Long cfgId) {
        return cfgService.get(cfgId);
    }

```
 