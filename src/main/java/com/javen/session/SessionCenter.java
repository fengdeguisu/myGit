package com.javen.session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;
import com.javen.model.Room;

import java.util.LinkedList;

public class SessionCenter {

private static Map<String, Room> sessionCenter = new HashMap<String, Room>();
	
	public SessionCenter() {
		super();
	}
	
	/**
	 * @Description: 添加房间
	 */
	public void addRoom(String name, Room room){
		sessionCenter.put(name, room);
	}
	/**
	 * 获取所有Room列表
	 * @return
	 */
	public List<Room> getAllRooms(){
		List<Room> toReturn = new ArrayList<Room>();
		if(sessionCenter == null || sessionCenter.isEmpty()){
			return toReturn;
		}
		for (Map.Entry<String, Room> e : sessionCenter.entrySet()) {
			toReturn.add(e.getValue());
		}
		
		return toReturn;
	}
	public Map<String,Room> getRooms(){
		return  sessionCenter;
	}
	
	public Room removeRoom(String roomName){
		return this.sessionCenter.remove(roomName);
	}
	/**
	 * @Description: 获取房间
	 */
	public Room getRoom(String RoomName){
		return sessionCenter.get(RoomName);
	}
}
