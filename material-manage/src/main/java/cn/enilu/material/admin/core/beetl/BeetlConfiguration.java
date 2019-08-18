package cn.enilu.material.admin.core.beetl;

import cn.enilu.material.admin.core.util.KaptchaUtil;
import cn.enilu.material.service.system.impl.ConstantFactory;
import cn.enilu.material.utils.ToolUtil;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;

public class BeetlConfiguration extends BeetlGroupUtilConfiguration {

    @Override
    public void initOther() {

        groupTemplate.registerFunctionPackage("shiro", new ShiroExt());
        groupTemplate.registerFunctionPackage("tool", new ToolUtil());
        groupTemplate.registerFunctionPackage("kaptcha", new KaptchaUtil());
        groupTemplate.registerFunctionPackage("constant",ConstantFactory.me());

    }

}
