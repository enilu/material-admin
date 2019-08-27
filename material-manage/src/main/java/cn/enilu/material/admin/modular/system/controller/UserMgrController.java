package cn.enilu.material.admin.modular.system.controller;

import cn.enilu.material.admin.config.properties.AppProperties;
import cn.enilu.material.admin.core.base.controller.BaseController;
import cn.enilu.material.admin.core.base.tips.Tip;
import cn.enilu.material.bean.constant.Const;
import cn.enilu.material.bean.constant.state.ManagerStatus;
import cn.enilu.material.bean.core.BussinessLog;
import cn.enilu.material.bean.core.Permission;
import cn.enilu.material.bean.core.ShiroUser;
import cn.enilu.material.bean.dictmap.UserDict;
import cn.enilu.material.bean.dto.UserDto;
import cn.enilu.material.bean.entity.system.User;
import cn.enilu.material.bean.enumeration.BizExceptionEnum;
import cn.enilu.material.bean.exception.ApplicationException;
import cn.enilu.material.factory.UserFactory;
import cn.enilu.material.service.system.LogObjectHolder;
import cn.enilu.material.service.system.UserService;
import cn.enilu.material.service.system.impl.ConstantFactory;
import cn.enilu.material.shiro.ShiroKit;
import cn.enilu.material.utils.BeanUtil;
import cn.enilu.material.utils.MD5;
import cn.enilu.material.utils.ToolUtil;
import cn.enilu.material.warpper.UserWarpper;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.naming.NoPermissionException;
import javax.validation.Valid;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 系统管理员控制器
 *
 * @author fengshuonan
 * @Date 2017年1月11日 下午1:08:17
 */
@Controller
@RequestMapping("/mgr")
public class UserMgrController extends BaseController {

    private static String PREFIX = "/system/user/";

    @Resource
    private AppProperties appProperties;

    @Autowired
    private UserService userService;

    /**
     * 跳转到查看管理员列表的页面
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "user.html";
    }

    /**
     * 跳转到查看管理员列表的页面
     */
    @RequestMapping("/user_add")
    public String addView() {
        return PREFIX + "user_add.html";
    }

    /**
     * 跳转到角色分配页面
     */
    @Permission
    @RequestMapping("/role_assign/{userId}")
    public String roleAssign(@PathVariable Long userId, Model model) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }

        User user = userService.get(userId);
        model.addAttribute("userId", userId);
        model.addAttribute("userAccount", user.getAccount());
        return PREFIX + "user_roleassign.html";
    }

    /**
     * 跳转到编辑管理员页面
     */
    @Permission
    @RequestMapping("/user_edit/{userId}")
    public String userEdit(@PathVariable Long userId, Model model) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        assertAuth(userId);
        User user = userService.get(userId);
        model.addAttribute(user);
        model.addAttribute("roleName", ConstantFactory.me().getRoleName(user.getRoleid()));
        model.addAttribute("deptName", ConstantFactory.me().getDeptName(user.getDeptid()));

        LogObjectHolder.me().set(user);
        return PREFIX + "user_edit.html";
    }

    /**
     * 跳转到查看用户详情页面
     */
    @RequestMapping("/user_info")
    public String userInfo(Model model) {
        Long userId = ShiroKit.getUser().getId();
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        User user = userService.get(userId);
        model.addAttribute(user);
        model.addAttribute("roleName", ConstantFactory.me().getRoleName(user.getRoleid()));
        model.addAttribute("deptName", ConstantFactory.me().getDeptName(user.getDeptid()));
        LogObjectHolder.me().set(user);
        return PREFIX + "user_view.html";
    }

    /**
     * 跳转到修改密码界面
     */
    @RequestMapping("/user_chpwd")
    public String chPwd() {
        return PREFIX + "user_chpwd.html";
    }

    /**
     * 修改当前用户的密码
     */
    @RequestMapping("/changePwd")
    @ResponseBody
    public Object changePwd(@RequestParam String oldPwd, @RequestParam String newPwd, @RequestParam String rePwd) {
        if (!newPwd.equals(rePwd)) {
            throw new ApplicationException(BizExceptionEnum.TWO_PWD_NOT_MATCH);
        }
        Long userId = ShiroKit.getUser().getId();
        User user = userService.get(userId);
        String oldMd5 = MD5.md5(oldPwd, user.getSalt());
        if (user.getPassword().equals(oldMd5)) {
            String newMd5 = MD5.md5(newPwd, user.getSalt());
            user.setPassword(newMd5);
            userService.saveOrUpdate(user);
            return SUCCESS_TIP;
        } else {
            throw new ApplicationException(BizExceptionEnum.OLD_PWD_NOT_RIGHT);
        }
    }

    /**
     * 查询管理员列表
     */
    @RequestMapping("/list")
    @Permission
    @ResponseBody
    public Object list(@RequestParam(required = false) String name, @RequestParam(required = false) String beginTime, @RequestParam(required = false) String endTime, @RequestParam(required = false) Integer deptid) {
        Map<String, Object> params = new HashMap<>();
        params.put("name", name);
        params.put("beginTime", beginTime);
        params.put("endTime", endTime);
        if (deptid != null && deptid != 0) {
            params.put("deptid", deptid);
        }
        if (!Strings.isNullOrEmpty(name)) {
            params.put("name","%"+ name+"%");
        }
        List<User> users = userService.findAll(params);

        return new UserWarpper(BeanUtil.objectsToMaps(users)).warp();

    }

    /**
     * 添加管理员
     */
    @RequestMapping("/add")
    @BussinessLog(value = "添加管理员", key = "account", dict = UserDict.class)
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Tip add(@Valid UserDto user, BindingResult result) {
        if (result.hasErrors()) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }

        // 判断账号是否重复
        User theUser = userService.findByAccount(user.getAccount());
        if (theUser != null) {
            throw new ApplicationException(BizExceptionEnum.USER_ALREADY_REG);
        }

        // 完善账号信息
        user.setSalt(ToolUtil.getRandomString(5));
        user.setPassword(MD5.md5(user.getPassword(), user.getSalt()));
        user.setStatus(ManagerStatus.OK.getCode());

        this.userService.insert(UserFactory.createUser(user, new User()));
        return SUCCESS_TIP;
    }

    /**
     * 修改管理员
     *
     * @throws NoPermissionException
     */
    @RequestMapping("/edit")
    @BussinessLog(value = "修改管理员", key = "account", dict = UserDict.class)
    @ResponseBody
    @Permission(Const.ADMIN_NAME)
    public Tip edit(@Valid UserDto user, BindingResult result) throws NoPermissionException {
        if (result.hasErrors()) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        User oldUser = userService.get(user.getId());
        if (ShiroKit.hasRole(Const.ADMIN_NAME)) {
            userService.update(UserFactory.updateUser(user, oldUser));
            return SUCCESS_TIP;
        } else {
            assertAuth(user.getId());
            ShiroUser shiroUser = ShiroKit.getUser();
            if (shiroUser.getId().equals(user.getId())) {
                userService.update(UserFactory.updateUser(user, oldUser));
                return SUCCESS_TIP;
            } else {
                throw new ApplicationException(BizExceptionEnum.NO_PERMITION);
            }
        }
    }

    /**
     * 删除管理员（逻辑删除）
     */
    @RequestMapping("/delete")
    @BussinessLog(value = "删除管理员", key = "userId", dict = UserDict.class)
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Tip delete(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        //不能删除超级管理员
        if (userId.intValue() == Const.ADMIN_ID) {
            throw new ApplicationException(BizExceptionEnum.CANT_DELETE_ADMIN);
        }
        assertAuth(userId);
        User user = userService.get(userId);
        user.setStatus(ManagerStatus.DELETED.getCode());
        userService.update(user);
        return SUCCESS_TIP;
    }

    /**
     * 查看管理员详情
     */
    @RequestMapping("/view/{userId}")
    @ResponseBody
    public User view(@PathVariable Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        assertAuth(userId);
        return userService.get(userId);
    }

    /**
     * 重置管理员的密码
     */
    @RequestMapping("/reset")
    @BussinessLog(value = "重置管理员密码", key = "userId", dict = UserDict.class)
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Tip reset(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        if (userId.intValue() == Const.ADMIN_ID) {
            throw new ApplicationException(BizExceptionEnum.CANT_CHANGE_ADMIN);
        }
        assertAuth(userId);
        User user = userService.get(userId);
        user.setSalt(ToolUtil.getRandomString(5));
        user.setPassword(MD5.md5(Const.DEFAULT_PWD, user.getSalt()));
        userService.update(user);
        return SUCCESS_TIP;
    }

    /**
     * 冻结用户
     */
    @RequestMapping("/freeze")
    @BussinessLog(value = "冻结用户", key = "userId", dict = UserDict.class)
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Tip freeze(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        //不能冻结超级管理员
        if (userId.intValue() == Const.ADMIN_ID) {
            throw new ApplicationException(BizExceptionEnum.CANT_FREEZE_ADMIN);
        }
        assertAuth(userId);
        User user = userService.get(userId);
        user.setStatus(ManagerStatus.FREEZED.getCode());
        userService.update(user);
        return SUCCESS_TIP;
    }

    /**
     * 解除冻结用户
     */
    @RequestMapping("/unfreeze")
    @BussinessLog(value = "解除冻结用户", key = "userId", dict = UserDict.class)
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Tip unfreeze(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        assertAuth(userId);
        User user = userService.get(userId);
        user.setStatus(ManagerStatus.OK.getCode());
        userService.update(user);
        return SUCCESS_TIP;
    }

    /**
     * 分配角色
     */
    @RequestMapping("/setRole")
    @BussinessLog(value = "分配角色", key = "userId", dict = UserDict.class)
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Tip setRole(@RequestParam("userId") Long userId, @RequestParam("roleIds") String roleIds) {
        if (ToolUtil.isOneEmpty(userId, roleIds)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        //不能修改超级管理员
        if (userId.intValue() == Const.ADMIN_ID) {
            throw new ApplicationException(BizExceptionEnum.CANT_CHANGE_ADMIN);
        }
        assertAuth(userId);
        User user = userService.get(userId);
        user.setRoleid(roleIds);
        userService.update(user);
        return SUCCESS_TIP;
    }

    /**
     * 上传图片(上传到项目的webapp/static/img)
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload")
    @ResponseBody
    public String upload(@RequestPart("file") MultipartFile picture) {
        String pictureName = UUID.randomUUID().toString() + ".jpg";
        try {
            String fileSavePath = appProperties.getFileUploadPath();
            picture.transferTo(new File(fileSavePath + pictureName));
        } catch (Exception e) {
            throw new ApplicationException(BizExceptionEnum.UPLOAD_ERROR);
        }
        return pictureName;
    }

    /**
     * 判断当前登录的用户是否有操作这个用户的权限
     */
    private void assertAuth(Long userId) {
        if (ShiroKit.isAdmin()) {
            return;
        }
        List<Long> deptDataScope = ShiroKit.getDeptDataScope();
        User user = userService.get(userId);
        Long deptid = user.getDeptid();
        if (deptDataScope.contains(deptid)) {
            return;
        } else {
            throw new ApplicationException(BizExceptionEnum.NO_PERMITION);
        }

    }
}
