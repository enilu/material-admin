package cn.enilu.material.dao.message;



import cn.enilu.material.bean.entity.message.MessageTemplate;
import cn.enilu.material.dao.BaseRepository;

import java.util.List;


public interface MessagetemplateRepository extends BaseRepository<MessageTemplate,Long> {
    MessageTemplate findByCode(String code);

    List<MessageTemplate> findByIdMessageSender(Long idMessageSender);
}

