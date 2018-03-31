package com.javen.controller;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.javen.model.User;
import com.javen.service.IUserService;

@Controller
@RequestMapping("/websocket")
public class WebSocketController {
	private static Logger log=LoggerFactory.getLogger(WebSocketController.class);
	@Resource  
    private IUserService userService;   
	
	@RequestMapping(value="/",method=RequestMethod.GET)  
    public String test(HttpServletRequest request,Model model){  
        
        return "mainFrame";  
    }  

}
