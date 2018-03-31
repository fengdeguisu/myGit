package com.javen.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class LoginFilter extends OncePerRequestFilter{  
	  
    @Override  
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response, FilterChain filterChain)  
            throws ServletException, IOException {  
              
    	    boolean hasCookie = false;
    	    Cookie[] cookies = request.getCookies();
    	    if(null!=cookies) {
    	    	for(Cookie cookie:cookies) {
                	if(cookie.getName().equals("uk")) {
                		hasCookie = true;
                	}
                }
                if( hasCookie){  
                	filterChain.doFilter(request, response);
                	return;
                }else{  
                    response.sendRedirect("/login");
                } 
    	    }else {
    	    	response.sendRedirect("/login");
    	    }
             
    }  
  
}  
