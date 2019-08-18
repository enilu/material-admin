package cn.enilu.material.admin.modular.system.controller;

import cn.enilu.material.admin.core.base.controller.BaseController;
import cn.enilu.material.dao.system.SysNoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * 总览信息
 *
 * @author fengshuonan
 * @Date 2017年3月4日23:05:54
 */
@Controller
@RequestMapping("/blackboard")
public class BlackboardController extends BaseController {

    @Autowired
    SysNoticeRepository sysNoticeRepository;

    /**
     * 跳转到黑板
     */
    @RequestMapping("")
    public String blackboard(Model model) {
        List notices = (List) sysNoticeRepository.findAll();
        model.addAttribute("noticeList",notices);
        return "/blackboard.html";
    }
}
