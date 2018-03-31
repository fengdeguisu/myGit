package com.javen.service.impl;
import java.math.BigDecimal;

import javax.annotation.Resource;  

import org.springframework.stereotype.Service;  

import com.javen.dao.IUserDao;
import com.javen.model.User;
import com.javen.service.IUserService;
  
  
@Service("userService")  
public class UserServiceImpl implements IUserService {  
    @Resource  
    private IUserDao userDao;  
    
    public User getUserById(String userId) {  
        // TODO Auto-generated method stub  
        return this.userDao.selectByPrimaryKey(userId);  
    }  

	@Override
	public int insertUser(User user) {
		// TODO Auto-generated method stub
		return this.userDao.insert(user);
	}

	@Override
	public int updateUser(User user) {
		// TODO Auto-generated method stub
		return this.userDao.updateByPrimaryKey(user);
	}  
  
} 