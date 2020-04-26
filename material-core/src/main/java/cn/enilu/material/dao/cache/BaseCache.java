package cn.enilu.material.dao.cache;


import cn.enilu.material.bean.vo.SpringContextHolder;
import cn.enilu.material.service.system.impl.ConstantFactory;

/**
 * @author ：enilu
 * @date ：Created in 2020/4/26 19:07
 */
public abstract  class BaseCache implements Cache {
    @Override
    public void cache() {
        SpringContextHolder.getBean(ConstantFactory.class).cleanLocalCache();
    }
}
