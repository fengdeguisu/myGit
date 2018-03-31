package com.javen.thread;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.Gson;
import com.javen.service.PositionService;
import com.javen.service.RoomService;

public class MainThread implements Runnable{

	public void run() {
		// TODO Auto-generated method stub
		HashMap<String,ArrayList> positionInfo = new HashMap<String, ArrayList>();
		WebSocketSession session;
		while(true){
			try {
				if(RoomService.getRoomSize()<1){
					Thread.currentThread().sleep(30);
				}else{
					positionInfo.put("tanks", PositionService.getTanks());
					positionInfo.put("bullets", PositionService.getBullets());
					String result = new Gson().toJson(positionInfo);
					for(String sessionId :RoomService.getKeySet()){
						session = RoomService.getSession(sessionId);
						TextMessage returnMessage = new TextMessage(result);  
						try {
							if(session.isOpen()){
								try{
								    session.sendMessage(returnMessage);
									//System.out.println(1);
								}catch (Exception e){
									System.out.println("error closing");
								}
							}else{
								System.out.println(sessionId);
							    RoomService.removeSession(sessionId);
							    PositionService.removeTank(sessionId);
							}
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					//10ms推送一次数据
					Thread.currentThread().sleep(25);
				}
				
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
	}
}
