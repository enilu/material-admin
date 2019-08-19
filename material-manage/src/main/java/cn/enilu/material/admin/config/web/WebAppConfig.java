package cn.enilu.material.admin.config.web;

import cn.enilu.material.admin.interceptor.WebInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * 系统配置<br>
 *  配置拦截器
 * @version 2018-07-24
 *
 * @author enilu
 */
@Configuration
public class WebAppConfig extends WebMvcConfigurerAdapter {

    /**
     * 注册自定义拦截器，添加拦截路径和排除拦截路径
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new WebInterceptor()).addPathPatterns("/**");

    }
}
