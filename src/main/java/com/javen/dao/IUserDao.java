package com.javen.dao;

import com.javen.model.User;
import java.math.BigDecimal;

public interface IUserDao {
	int deleteByPrimaryKey(String id);

	int insert(User record);

	int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}