package cn.enilu.material.admin.modular.system.controller;

import cn.enilu.material.admin.core.base.controller.BaseController;
import cn.enilu.material.admin.core.base.tips.ErrorTip;
import cn.enilu.material.admin.core.base.tips.Tip;
import cn.enilu.material.admin.core.support.BeanKit;
import cn.enilu.material.bean.core.BussinessLog;
import cn.enilu.material.bean.core.Permission;
import cn.enilu.material.bean.constant.Const;
import cn.enilu.material.bean.constant.state.MenuStatus;
import cn.enilu.material.bean.dictmap.MenuDict;
import cn.enilu.material.bean.entity.system.Menu;
import cn.enilu.material.bean.enumeration.BizExceptionEnum;
import cn.enilu.material.bean.exception.ApplicationException;
import cn.enilu.material.bean.exception.ExceptionEnum;
import cn.enilu.material.bean.vo.node.ZTreeNode;
import cn.enilu.material.service.system.LogObjectHolder;
import cn.enilu.material.service.system.MenuService;
import cn.enilu.material.service.system.impl.ConstantFactory;
import cn.enilu.material.utils.BeanUtil;
import cn.enilu.material.utils.ToolUtil;
import cn.enilu.material.warpper.MenuWarpper;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * 菜单控制器
 *
 * @author fengshuonan
 * @Date 2017年2月12日21:59:14
 */
@Controller
@RequestMapping("/menu")
public class MenuController extends BaseController {

    private static String PREFIX = "/system/menu/";


    @Autowired
    MenuService menuService;

    /**
     * 跳转到菜单列表列表页面
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "menu.html";
    }

    /**
     * 跳转到菜单列表列表页面
     */
    @RequestMapping(value = "/menu_add")
    public String menuAdd() {
        return PREFIX + "menu_add.html";
    }

    /**
     * 跳转到菜单详情列表页面
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/menu_edit/{menuId}")
    public String menuEdit(@PathVariable Long menuId, Model model) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        Menu menu = menuService.get(menuId);

        //获取父级菜单的id
        Menu pMenu = menuService.findByCode(menu.getPcode());

        //如果父级是顶级菜单
        if (pMenu == null) {
            menu.setPcode("0");
        }
        Map<String, Object> menuMap = BeanKit.beanToMap(menu);
        menuMap.put("pcodeName", ConstantFactory.me().getMenuNameByCode(menu.getPcode()));
        model.addAttribute("menu", menuMap);
        LogObjectHolder.me().set(menu);
        return PREFIX + "menu_edit.html";
    }

    /**
     * 修该菜单
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/edit")
    @BussinessLog(value = "修改菜单", key = "name", dict = MenuDict.class)
    @ResponseBody
    public Tip edit(@Valid Menu menu, BindingResult result) {
        if(1==1){
            throw new ApplicationException(ExceptionEnum.TEST_NOT_ALLOWED);
        }
        //设置父级菜单编号
        menuService.menuSetPcode(menu);
        menu.setStatus(MenuStatus.ENABLE.getCode());
        this.menuService.saveOrUpdate(menu);
        return SUCCESS_TIP;
    }

    /**
     * 获取菜单列表
     */
    @Permission
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String menuName, @RequestParam(required = false) String level) {
        List<Menu> menus = null;
        if(Strings.isNullOrEmpty(menuName)&&Strings.isNullOrEmpty(level)) {
            menus = (List<Menu>) this.menuService.queryAll();
        }
        if(!Strings.isNullOrEmpty(menuName)&&!Strings.isNullOrEmpty(level)) {
            menus = this.menuService.findByNameLikeAndLevels("%"+menuName+"%", Integer.valueOf(level));
        }
        if(!Strings.isNullOrEmpty(menuName)&&Strings.isNullOrEmpty(level)) {
            menus = this.menuService.findByNameLike("%"+menuName+"%");
        }
        if(Strings.isNullOrEmpty(menuName)&&!Strings.isNullOrEmpty(level)) {
            menus = this.menuService.findByLevels(Integer.valueOf(level));
        }

        return super.warpObject(new MenuWarpper(BeanUtil.objectsToMaps(menus)));
    }

    /**
     * 新增菜单
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/add")
    @BussinessLog(value = "菜单新增", key = "name", dict = MenuDict.class)
    @ResponseBody
    public Tip add(@Valid Menu menu, BindingResult result) {
        if (result.hasErrors()) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }

        //判断是否存在该编号
        String existedMenuName = ConstantFactory.me().getMenuNameByCode(menu.getCode());
        if (ToolUtil.isNotEmpty(existedMenuName)) {
            throw new ApplicationException(BizExceptionEnum.EXISTED_THE_MENU);
        }

        //设置父级菜单编号
        menuService.menuSetPcode(menu);
        menu.setStatus(MenuStatus.ENABLE.getCode());
        this.menuService.saveOrUpdate(menu);
        return SUCCESS_TIP;
    }

    /**
     * 删除菜单
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/remove")
    @BussinessLog(value = "删除菜单", key = "menuId", dict = MenuDict.class)
    @ResponseBody
    public Tip remove(@RequestParam Long menuId) {
        if(1==1){
            throw new ApplicationException(ExceptionEnum.TEST_NOT_ALLOWED);
        }
        if (ToolUtil.isEmpty(menuId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }

        //缓存菜单的名称
        LogObjectHolder.me().set(ConstantFactory.me().getMenuName(menuId));

        this.menuService.delMenuContainSubMenus(menuId);
        return SUCCESS_TIP;
    }

    /**
     * 查看菜单
     */
    @RequestMapping(value = "/view/{menuId}")
    @ResponseBody
    public Tip view(@PathVariable Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        menuService.get(menuId);
        return SUCCESS_TIP;
    }

    /**
     * 获取菜单列表(首页用)
     */
    @RequestMapping(value = "/menuTreeList")
    @ResponseBody
    public List<ZTreeNode> menuTreeList() {
        List<ZTreeNode> roleTreeList = this.menuService.menuTreeList();
        return roleTreeList;
    }

    /**
     * 获取菜单列表(选择父级菜单用)
     */
    @RequestMapping(value = "/selectMenuTreeList")
    @ResponseBody
    public List<ZTreeNode> selectMenuTreeList() {
        List<ZTreeNode> roleTreeList = this.menuService.menuTreeList();
        roleTreeList.add(ZTreeNode.createParent());
        return roleTreeList;

    }

    /**
     * 获取角色列表
     */
    @RequestMapping(value = "/menuTreeListByRoleId/{roleId}")
    @ResponseBody
    public List<ZTreeNode> menuTreeListByRoleId(@PathVariable Integer roleId) {
        List<Long> menuIds = this.menuService.getMenuIdsByRoleId(roleId);
        if (ToolUtil.isEmpty(menuIds)) {
            List<ZTreeNode> roleTreeList = this.menuService.menuTreeList();
            return roleTreeList;
        } else {
            List<ZTreeNode> roleTreeListByUserId = this.menuService.menuTreeListByMenuIds(menuIds);
            return roleTreeListByUserId;
        }
    }


}
