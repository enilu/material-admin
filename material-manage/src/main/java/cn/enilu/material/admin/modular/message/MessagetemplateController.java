package cn.enilu.material.admin.modular.message;


import cn.enilu.material.admin.core.base.controller.BaseController;
import cn.enilu.material.bean.core.BussinessLog;
import cn.enilu.material.bean.constant.factory.PageFactory;
import cn.enilu.material.bean.dictmap.CommonDict;
import cn.enilu.material.bean.entity.message.MessageSender;
import cn.enilu.material.bean.entity.message.MessageTemplate;
import cn.enilu.material.bean.enumeration.BizExceptionEnum;
import cn.enilu.material.bean.exception.ApplicationException;
import cn.enilu.material.bean.vo.query.Page;
import cn.enilu.material.service.message.MessagesenderService;
import cn.enilu.material.service.message.MessagetemplateService;
import cn.enilu.material.utils.ToolUtil;
import org.nutz.json.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/message/template")
public class MessagetemplateController extends BaseController {

    private static String PREFIX = "/message/template/";
    @Autowired
    private MessagetemplateService messagetemplateService;
    @Autowired
    private MessagesenderService messagesenderService;
    /**
     * 跳转到首页
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    public String index() {
        return PREFIX + "template.html";
    }

    /**
     * 跳转到添加模板
     */
    @RequestMapping("/add")
    public String add(Model model) {
        List<MessageSender> messageSenderList = messagesenderService.queryAll();
        model.addAttribute("messageSenderList",messageSenderList);
        return PREFIX + "template_add.html";
    }

    /**
     * 跳转到修改模板
     */
    @RequestMapping("/update/{id}")
    public String update(@PathVariable Long id, Model model) {
        MessageTemplate template = messagetemplateService.get(id);
        model.addAttribute("item",template);
        List<MessageSender> messageSenderList = messagesenderService.queryAll();
        model.addAttribute("messageSenderList",messageSenderList);
        return PREFIX + "template_edit.html";
    }
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public Object list() {
        Page<MessageTemplate> page = new PageFactory<MessageTemplate>().defaultPage();
        page = messagetemplateService.queryPage(page);
        page.setRecords(page.getRecords());
        System.out.println(Json.toJson(page));
        return packForBT(page);
    }

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑消息模板", key = "name", dict = CommonDict.class)
    @ResponseBody
    public Object save(@ModelAttribute @Valid MessageTemplate messageTemplate) {
        if(messageTemplate.getId()==null) {
            messagetemplateService.insert(messageTemplate);
        }else{
            messagetemplateService.update(messageTemplate);
        }
        return SUCCESS_TIP;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除消息模板", key = "id", dict = CommonDict.class)
    @ResponseBody
    public Object remove(Long id) {
        if (ToolUtil.isEmpty(id)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        messagetemplateService.delete(id);
        return SUCCESS_TIP;
    }
}