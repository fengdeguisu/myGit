package com.javen.service;  

import java.math.BigDecimal;

import com.javen.model.User;
  
  
public interface IUserService {  
    public User getUserById(String userId);  
    public int insertUser(User user);
    public int updateUser(User user);
}  