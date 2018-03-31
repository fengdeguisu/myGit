package com.javen.initializer;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.javen.config.RootConfig;
import com.javen.config.WebConfig;

public class TankWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer{

	/*@Override
	protected Class<?>[] getRootConfigClasses() {
		// TODO Auto-generated method stub
		return new Class<?>[] {RootConfig.class};
	}*/

	@Override
	protected Class<?>[] getServletConfigClasses() {
		// TODO Auto-generated method stub
		return new Class<?>[] {WebConfig.class};
	}

	@Override
	protected String[] getServletMappings() {
		// TODO Auto-generated method stub
		return new String[] {"/*"};
	}

	@Override
	protected Class<?>[] getRootConfigClasses() {
		// TODO Auto-generated method stub
		return null;
	}

}
