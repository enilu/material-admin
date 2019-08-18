package cn.enilu.material.bean.core;

import cn.enilu.material.bean.entity.system.User;
import cn.enilu.material.bean.vo.node.MenuNode;

import java.io.Serializable;
import java.util.List;

/**
 * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息
 *
 * @author fengshuonan
 * @date 2016年12月5日 上午10:26:43
 */
public class ShiroUser implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;          // 主键ID
    private String account;      // 账号
    private String name;         // 姓名
    private Long deptId;      // 部门id
    private List<Long> roleList; // 角色集
    private String deptName;        // 部门名称
    private List<String> roleNames; // 角色名称集
    private List<String> roleCodes;//角色编码
    private User profile;//用户详细资料
    private List<MenuNode> titles;//用户可用菜单资源

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public List<Long> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Long> roleList) {
        this.roleList = roleList;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public List<String> getRoleNames() {
        return roleNames;
    }

    public void setRoleNames(List<String> roleNames) {
        this.roleNames = roleNames;
    }

    public List<String> getRoleCodes() {
        return roleCodes;
    }

    public void setRoleCodes(List<String> roleCodes) {
        this.roleCodes = roleCodes;
    }

    public User getProfile() {
        return profile;
    }

    public void setProfile(User profile) {
        this.profile = profile;
    }

    public List<MenuNode> getTitles() {
        return titles;
    }

    public void setTitles(List<MenuNode> titles) {
        this.titles = titles;
    }
}
