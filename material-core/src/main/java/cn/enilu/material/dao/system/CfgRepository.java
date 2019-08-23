
package cn.enilu.material.dao.system;

import cn.enilu.material.bean.entity.system.Cfg;
import cn.enilu.material.dao.BaseRepository;

public interface CfgRepository extends BaseRepository<Cfg,Long> {
    Cfg findByCfgName(String cfgName);
}
