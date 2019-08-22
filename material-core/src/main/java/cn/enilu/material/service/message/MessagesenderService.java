package cn.enilu.material.service.message;


import cn.enilu.material.bean.entity.message.MessageSender;
import cn.enilu.material.bean.entity.message.MessageTemplate;
import cn.enilu.material.bean.enumeration.BizExceptionEnum;
import cn.enilu.material.bean.exception.ApplicationException;
import cn.enilu.material.dao.message.MessagesenderRepository;
import cn.enilu.material.dao.message.MessagetemplateRepository;
import cn.enilu.material.service.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * MessagesenderService
 *
 * @author enilu
 * @version 2019/05/17 0017
 */
@Service
public class MessagesenderService extends BaseService<MessageSender,Long, MessagesenderRepository> {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private MessagesenderRepository messageSenderRepository;
    @Autowired
    private MessagetemplateRepository messagetemplateRepository;

    public void save(MessageSender messageSender){
        messageSenderRepository.save(messageSender);
    }
    @Override
    public void  delete(Long id) throws ApplicationException {
        List<MessageTemplate> templateList = messagetemplateRepository.findByIdMessageSender(id);
        if(templateList.isEmpty()) {
            messageSenderRepository.deleteById(id);
        }else{
            throw  new ApplicationException(BizExceptionEnum.CAN_NOT_DELETE);
        }
    }

}

