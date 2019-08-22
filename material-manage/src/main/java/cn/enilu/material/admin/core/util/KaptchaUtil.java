package cn.enilu.material.admin.core.util;

import cn.enilu.material.admin.config.properties.AppProperties;
import cn.enilu.material.bean.vo.SpringContextHolder;

/**
 * 验证码工具类
 */
public class KaptchaUtil {

    /**
     * 获取验证码开关
     *
     * @author enilu.cn
     * @Date 2017/5/23 22:34
     */
    public static Boolean getKaptchaOnOff() {
        return SpringContextHolder.getBean(AppProperties.class).getKaptchaOpen();
    }
}