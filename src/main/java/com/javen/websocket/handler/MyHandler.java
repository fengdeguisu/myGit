package com.javen.websocket.handler;  
  
import java.util.HashMap;
import java.util.HashSet;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;  
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;
import org.springframework.web.socket.handler.TextWebSocketHandler;  

import com.google.gson.Gson;
import com.javen.service.PositionService;
import com.javen.service.RoomService;
  
public class MyHandler extends AbstractWebSocketHandler {  
  
    @Override  
    protected void handleTextMessage(WebSocketSession session,  
            TextMessage message) throws Exception {  
        //加入不存在的session
        if(!RoomService.containSession(session.getId())){
        	System.out.println("hehehe");
        	HashMap<String,String> tankId = new HashMap<String, String>();
        	tankId.put("tankId", session.getId().toString());
        	tankId.put("type", "id");
        	session.sendMessage(new TextMessage(new Gson().toJson(tankId)));
        	RoomService.addSession(session.getId(), session);
        }
        HashMap<String, String> obj = new Gson().fromJson(message.getPayload(), HashMap.class);
        obj.put("id", session.getId().toString());
        PositionService.updatePossition(session.getId().toString(), obj);
        //TextMessage returnMessage = new TextMessage(message.getPayload()+" "+session.getId()+" received at server");  
        //session.sendMessage(returnMessage);  
    }  
    
    @Override  
    protected void handleBinaryMessage(WebSocketSession session,  
    		BinaryMessage message) throws Exception {  
        //处理音频数据，向其他session转发音频
    	String senderId = session.getId();
    	for(String sessionId:RoomService.getKeySet()) {
    		if(!senderId.equals(sessionId)) {
    			RoomService.getSession(sessionId).sendMessage(message);
    		}
    	}
         
    } 
}  