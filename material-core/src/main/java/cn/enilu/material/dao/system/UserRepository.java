package cn.enilu.material.dao.system;


import cn.enilu.material.bean.entity.system.User;
import cn.enilu.material.dao.BaseRepository;

import java.util.List;

/**
 * Created  on 2018/3/21 0021.
 *
 * @author enilu
 */
public interface UserRepository extends BaseRepository<User,Long> {
    User findByAccount(String account);

    List<User> findByRoleid(String idRole);
}
