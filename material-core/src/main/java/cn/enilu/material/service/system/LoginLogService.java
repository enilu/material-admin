package cn.enilu.material.service.system;


import cn.enilu.material.bean.entity.system.LoginLog;
import cn.enilu.material.dao.system.LoginLogRepository;
import cn.enilu.material.service.BaseService;
import org.springframework.stereotype.Service;

/**
 * Created  on 2018/3/26 0026.
 *
 * @author enilu
 */
@Service
public class LoginLogService extends BaseService<LoginLog,Long,LoginLogRepository> {
}
