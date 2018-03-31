package com.javen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan("com.javen.controller")
public class WebConfig extends WebMvcConfigurerAdapter{

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/js/**").addResourceLocations("/js/**");
        registry.addResourceHandler("/img/**").addResourceLocations("/img/**");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/**").setCachePeriod(31556926);
        //registry.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
    }
	
	@Bean
	public ViewResolver viewResolver(){
		InternalResourceViewResolver resolver = 
				new InternalResourceViewResolver();
		resolver.setPrefix("/jsp/");
		resolver.setSuffix(".jsp");
		resolver.setExposeContextBeansAsAttributes(true);
		return resolver;
		
	}
	
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer){
		configurer.enable();
	}
}
