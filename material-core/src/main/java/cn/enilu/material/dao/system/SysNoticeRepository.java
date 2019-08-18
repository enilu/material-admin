package cn.enilu.material.dao.system;


import cn.enilu.material.bean.entity.system.Notice;
import cn.enilu.material.dao.BaseRepository;

import java.util.List;

/**
 * Created  on 2018/3/21 0021.
 *
 * @author enilu
 */
public interface SysNoticeRepository extends BaseRepository<Notice,Long> {
    List<Notice> findByTitleLike(String name);
}
