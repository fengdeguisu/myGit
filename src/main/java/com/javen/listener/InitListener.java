package com.javen.listener;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import com.javen.service.RoomService;
import com.javen.thread.EnemysThread;
import com.javen.thread.MainThread;

public class InitListener implements ServletContextListener{

	public void contextInitialized(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		
		RoomService.initService();
		ExecutorService exec = Executors.newCachedThreadPool();
		exec.execute(new MainThread());
		/*MainThread mainThread = new MainThread();
		Thread t = new Thread(mainThread);
		t.start();*/
		for(int i=0;i<5;i++){
			exec.execute(new EnemysThread());
		}
	}

	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		
	}

}
