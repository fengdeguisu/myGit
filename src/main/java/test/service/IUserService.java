package test.service;

import java.math.BigDecimal;

import test.domain.User;

public interface IUserService {
	public User getUserById(BigDecimal userId);
}
