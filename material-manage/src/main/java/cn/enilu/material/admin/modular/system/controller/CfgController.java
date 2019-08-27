package cn.enilu.material.admin.modular.system.controller;

import cn.enilu.material.admin.core.base.controller.BaseController;
import cn.enilu.material.bean.constant.Const;
import cn.enilu.material.bean.core.BussinessLog;
import cn.enilu.material.bean.constant.factory.PageFactory;
import cn.enilu.material.bean.core.Permission;
import cn.enilu.material.bean.dictmap.CfgDict;
import cn.enilu.material.bean.entity.system.Cfg;
import cn.enilu.material.bean.vo.query.Page;
import cn.enilu.material.bean.vo.query.SearchFilter;
import cn.enilu.material.service.system.CfgService;
import cn.enilu.material.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * CfgController
 *
 * @author enilu
 * @version 2018/8/9 0009
 */

@Controller
@RequestMapping("/cfg")
public class CfgController extends BaseController {
    @Autowired
    private CfgService cfgService;
    private static String PREFIX = "/system/cfg/";
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

    /**
     * 跳转到修改参数
     */
    @RequestMapping(value = "/cfg_update/{cfgId}",method = RequestMethod.GET)
    public String update(@PathVariable Long cfgId, Model model) {
        Cfg cfg = cfgService.get(cfgId);
        model.addAttribute("item",cfg);
        return PREFIX + "cfg_edit.html";
    }

    /**
     * 修改参数
     */
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    @ResponseBody
    @BussinessLog(value = "编辑参数", key = "cfgName",dict = CfgDict.class)
    @Permission(Const.ADMIN_NAME)
    public Object update(@Valid  Cfg cfg) {
        cfgService.saveOrUpdate(cfg);
        return SUCCESS_TIP;
    }

    /**
     * 删除参数
     */
    @RequestMapping(value = "/delete",method = RequestMethod.DELETE)
    @ResponseBody
    @BussinessLog(value = "删除参数", key = "cfgId",dict = CfgDict.class)
    @Permission(Const.ADMIN_NAME)
    public Object delete(@RequestParam Long cfgId) {
        cfgService.delete(cfgId);
        return SUCCESS_TIP;
    }


}