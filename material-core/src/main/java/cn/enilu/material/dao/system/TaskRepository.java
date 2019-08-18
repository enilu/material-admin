
package cn.enilu.material.dao.system;


import cn.enilu.material.bean.entity.system.Task;
import cn.enilu.material.dao.BaseRepository;

import java.util.List;

public interface TaskRepository extends BaseRepository<Task, Long> {

    long countByNameLike(String name);

    List<Task> findByNameLike(String name);
    List<Task> findAllByDisabled(boolean disable);
}
