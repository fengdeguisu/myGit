package com.javen.service;

import java.io.Reader;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import com.javen.model.Room;


public class RoomService {

	private static Room room;
	
	// 初始化
    public static void initService() {
        room = new Room();
    }
    
    public static Set<String> getKeySet(){
    	return room.getKeyset();
    }
    
    public static int getRoomSize(){
    	return room.getSize();
    }
    
    public static WebSocketSession getSession(String key){
    	return room.getSession(key);
    }
    
    public static WebSocketSession removeSession(String key){
    	return room.removeSession(key);
    }
    
    public static void addSession(String key,WebSocketSession session){
    	room.addSession(key, session);
    }
    
    public static boolean containSession(String key){
    	return room.containSession(key);
    }
}
