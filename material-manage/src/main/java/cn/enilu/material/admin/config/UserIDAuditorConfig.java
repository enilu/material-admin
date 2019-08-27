package cn.enilu.material.admin.config;

import cn.enilu.material.bean.constant.Const;
import cn.enilu.material.bean.core.ShiroUser;
import cn.enilu.material.shiro.ShiroKit;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

/**
 * UserIDAuditorBean
 *
 * @author zt
 * @version 2019/1/8 0008
 */
@Configuration
public class UserIDAuditorConfig implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        ShiroUser shiroUser = ShiroKit.getUser();
        if(shiroUser!=null){
            return Optional.of(shiroUser.getId());
        }
        return Optional.of(Const.SYSTEM_USER_ID);
    }
}
