package cn.enilu.material.admin.modular.lab.controller;

import cn.enilu.material.admin.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author ：enilu
 * @date ：Created in 2019/9/3 16:53
 */
@RequestMapping("/lab")
@Controller
public class LabController extends BaseController {
    @RequestMapping(value="/actuator",method = RequestMethod.GET)
    public String index(){
        return "/lab/actuator.html";
    }
    @RequestMapping(value="/gis",method = RequestMethod.GET)
    public String gis(){
        return "/lab/gis.html";
    }
}
