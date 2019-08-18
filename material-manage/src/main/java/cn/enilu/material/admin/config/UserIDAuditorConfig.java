package cn.enilu.material.admin.config;

import cn.enilu.material.bean.core.ShiroUser;
import cn.enilu.material.shiro.ShiroKit;
import cn.enilu.material.utils.Constants;
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
        return Optional.of(Constants.SYSTEM_USER_ID);
    }
}
