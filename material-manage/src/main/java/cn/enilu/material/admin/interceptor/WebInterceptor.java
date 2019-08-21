package cn.enilu.material.admin.interceptor;

import cn.enilu.material.bean.enumeration.ConfigKeyEnum;
import cn.enilu.material.bean.vo.SpringContextHolder;
import cn.enilu.material.dao.cache.ConfigCache;
import cn.enilu.material.dao.cache.impl.ConfigCacheImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author ：enilu
 * @date ：Created in 2019/8/19 13:08
 */
@Component
public class WebInterceptor implements HandlerInterceptor {
    @Autowired
    private ConfigCache configCache;
    private Logger logger = LoggerFactory.getLogger(WebInterceptor.class);
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        String resoruceVersion = (String) SpringContextHolder.getBean(ConfigCacheImpl.class).get(ConfigKeyEnum.SYSTEM_RESOURCE_VERSION.getValue());
        request.setAttribute("version",resoruceVersion);
    }
}
