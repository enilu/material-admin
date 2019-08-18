package cn.enilu.material.dao.message;


import cn.enilu.material.bean.entity.message.Message;
import cn.enilu.material.dao.BaseRepository;

import java.util.ArrayList;


public interface MessageRepository extends BaseRepository<Message,Long> {
    void deleteAllByIdIn(ArrayList<String> list);
}

