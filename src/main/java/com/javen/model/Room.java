package com.javen.model;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.WebSocketSession;

public class Room {

	private Map<String, WebSocketSession> room = new ConcurrentHashMap<String, WebSocketSession>();
	
	public Room(){
		
	}
	
	public void addSession(String key,WebSocketSession session){
		if(!this.room.containsKey(key)){
			this.room.put(key, session);
		}
		
	}
	
	public WebSocketSession removeSession(String key){
		return this.room.remove(key);
	}
	
	public WebSocketSession getSession(String key){
		return this.room.get(key);
	}
	
	public int getSize(){
		return this.room.size();
	}
	
	public boolean containSession(String key){
		return this.room.containsKey(key);
	}
	
	public Set<String> getKeyset(){
		return this.room.keySet();
	}
}
