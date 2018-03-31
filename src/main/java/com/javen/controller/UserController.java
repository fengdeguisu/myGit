package com.javen.controller;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;  
import org.springframework.ui.Model;  
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.javen.model.User;
import com.javen.service.IUserService;
  
  
@Controller  
@RequestMapping("/user")  
// /user/**
public class UserController {  
    private static Logger log=LoggerFactory.getLogger(UserController.class);
     @Resource  
     private IUserService userService;   
     private final static String USER_ID = "uk";
     private final static String PICTURE_ID = "pi";
    
    // /user/id
    @RequestMapping(value="/picture",method=RequestMethod.GET)  
    @ResponseBody
    public String id(HttpServletRequest request,HttpServletResponse response){  
        String ip = request.getRemoteAddr();
        User user = this.userService.getUserById(ip);
        String pictureId = user.getPictureId(); 
        HashMap<String,String> map = new HashMap<String, String>();
        map.put("picture_id", pictureId);
        String jsonString = JSON.toJSONString(map);
        return jsonString;  
    }  
    
    // /user/name
    @RequestMapping(value="/name",method=RequestMethod.POST)  
    public void name(HttpServletResponse response,HttpServletRequest request){ 
    	String ip = request.getRemoteAddr();
    	String userName = "";
		try {
			userName = URLDecoder.decode(request.getParameter("name"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        String pictureId = request.getParameter("pictureId");
    	if(null == ip) {
    		return;
    	}else {
    		User user = this.userService.getUserById(ip);
    		if(null != user) {
    			user.setUserName(userName);
    			user.setPictureId(pictureId);
    			this.userService.updateUser(user);
    		}else {
    			user = new User();
    			user.setId(ip);
    			user.setUserName(userName);
    			user.setPictureId(pictureId);
    			this.userService.insertUser(user);
    		}
    	}
        Cookie cookieName;
		try {
			cookieName = new Cookie(USER_ID, URLEncoder.encode(userName, "utf-8"));
			cookieName.setMaxAge(30 * 60);// 设置为30min   
	        cookieName.setDomain("97.64.18.235");
	        cookieName.setPath("/websocket/");
	        response.addCookie(cookieName);  
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        
        Cookie cookiePictureId = new Cookie(PICTURE_ID, pictureId);  
        cookiePictureId.setMaxAge(30 * 60);// 设置为30min  
        cookiePictureId.setDomain("97.64.18.235");
        cookiePictureId.setPath("/websocket/");
        response.addCookie(cookiePictureId);
        //return "index";  
    }  
    
    
    // /user/showUser?id=1
    @RequestMapping(value="/showUser",method=RequestMethod.GET)  
    public String toIndex(HttpServletRequest request,Model model){  
        int userId = Integer.parseInt(request.getParameter("id"));  
        System.out.println("userId:"+userId);
        User user = this.userService.getUserById(String.valueOf(userId));  
        log.debug(user.toString());
        model.addAttribute("user", user);  
        return "showUser";  
    }  
    
 // /user/showUser2?id=1
    @RequestMapping(value="/showUser2",method=RequestMethod.GET)  
    public String toIndex2(@RequestParam("id") String id,Model model){  
        int userId = Integer.parseInt(id);  
        System.out.println("userId:"+userId);
        User user = this.userService.getUserById(String.valueOf(userId));  
        log.debug(user.toString());
        model.addAttribute("user", user);  
        return "showUser";  
    }  
    
    
    // /user/showUser3/{id}
    @RequestMapping(value="/showUser3/{id}",method=RequestMethod.GET)  
    public String toIndex3(@PathVariable("id")String id,HttpServletRequest request,Map<String, Object> model){  
        User user = this.userService.getUserById(String.valueOf(request.getRemoteAddr()));  
        log.debug(user.toString());
        model.put("user", user);  
        return "showUser";  
    }  
    
 // /user/{id}
    @RequestMapping(value="/{id}",method=RequestMethod.GET)  
    public @ResponseBody User getUserInJson(@PathVariable String id,Map<String, Object> model){  
        int userId = Integer.parseInt(id);  
        System.out.println("userId:"+userId);
        User user = this.userService.getUserById(String.valueOf(userId));  
        log.info(user.toString());
        return user;  
    }  
    
    // /user/{id}
    @RequestMapping(value="/jsontype/{id}",method=RequestMethod.GET)  
    public ResponseEntity<User>  getUserInJson2(@PathVariable String id,Map<String, Object> model){  
        int userId = Integer.parseInt(id);  
        System.out.println("userId:"+userId);
        User user = this.userService.getUserById(String.valueOf(userId));  
        log.info(user.toString());
        return new ResponseEntity<User>(user,HttpStatus.OK);  
    } 
    
    //文件上传、
    @RequestMapping(value="/upload")
    public String showUploadPage(){
        return "user_admin/file";
    }
    
    @RequestMapping(value="/doUpload",method=RequestMethod.POST)
    public String doUploadFile(@RequestParam("file")MultipartFile file) throws IOException{
        if (!file.isEmpty()) {
            log.info("Process file:{}",file.getOriginalFilename());
        }
        FileUtils.copyInputStreamToFile(file.getInputStream(), new File("E:\\",System.currentTimeMillis()+file.getOriginalFilename()));
        return "succes";
    }
}