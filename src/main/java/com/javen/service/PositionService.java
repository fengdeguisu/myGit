package com.javen.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.javen.model.Bullet;
import com.javen.model.Tank;

public class PositionService {

	private static Map<String,Tank> tanks = new ConcurrentHashMap<String, Tank>();
	private static Map<String,Bullet> bullets = new ConcurrentHashMap<String, Bullet>();
	private static double speed = 0.25;
	private static double distance = 2.5;
	
	public static void updatePossition(String sessionId,HashMap<String, String> attributes){
		//PositionService.tanks = RoomService.
		if(null != attributes.get("type")){
			if(attributes.get("type").equals("tank")){
				tanks.put(sessionId, new Tank().setServerX(attributes.get("serverX")).setServerY(
						attributes.get("serverY")).setSpeed(attributes.get("speed")).setId(sessionId));
			}else if(attributes.get("type").equals("bullet")){
				bullets.put(sessionId, new Bullet().setServerX(attributes.get("serverX")).setServerY(
						attributes.get("serverY")).setSpeed(attributes.get("speed")).setDirection(
								attributes.get("direction")).setId(sessionId));
			}else if(attributes.get("type").equals("mouse")){
				if(tanks.containsKey(sessionId)) {
					PositionService.updateTankPosition(tanks.get(sessionId),attributes.get("serverX"),attributes.get("serverY"));
				}else {
					String newTankServerX = String.valueOf(Math.round(Math.random()*10000+1)/100);
					String newTankServerY = String.valueOf(Math.round(Math.random()*10000+1)/100);
					tanks.put(sessionId, new Tank().setServerX(newTankServerX).setServerY(newTankServerY).setId(sessionId).setSpeed(String.valueOf(PositionService.speed)));
					PositionService.updateTankPosition(tanks.get(sessionId),attributes.get("serverX"),attributes.get("serverY"));
				}
			}else if(attributes.get("type").equals("pictureId")){
				if(tanks.containsKey(sessionId)) {
					tanks.get(sessionId).setPictureId(attributes.get("pictureId"));
				}else {
					String newTankServerX = String.valueOf(Math.round(Math.random()*10000+1)/100);
					String newTankServerY = String.valueOf(Math.round(Math.random()*10000+1)/100);
					tanks.put(sessionId, new Tank().setServerX(newTankServerX).setServerY(newTankServerY).setId(sessionId).setSpeed(String.valueOf(PositionService.speed)));
					tanks.get(sessionId).setPictureId(attributes.get("pictureId"));;
				}
			}
		}
		
	}
	
	public static void updateTankPosition(Tank tank,String mouseX,String mouseY){
		double currenX = Double.parseDouble(tank.getServerX());
		double currenY = Double.parseDouble(tank.getServerY());
		double serverX = Double.parseDouble(mouseX);
		double serverY = Double.parseDouble(mouseY);
		double newX = currenX;
		double newY = currenY;
		double speed = Double.parseDouble(tank.getSpeed());
		double lengthBetweenMouseAndTank = Math.sqrt((serverX-currenX)*(serverX-currenX)
				+(serverY-currenY)*(serverY-currenY)) ;
		if(serverX>currenX && speed/lengthBetweenMouseAndTank*(serverX-currenX)+currenX <= 100 
				&& speed/lengthBetweenMouseAndTank*(serverX-currenX)+currenX >= 0) {
			//tank.setServerX(String.valueOf(speed/lengthBetweenMouseAndTank*(serverX-currenX)+currenX));
			newX = speed/lengthBetweenMouseAndTank*(serverX-currenX)+currenX;
		}else if(serverX<=currenX && currenX-speed/lengthBetweenMouseAndTank*(currenX-serverX) <= 100
				&& currenX-speed/lengthBetweenMouseAndTank*(currenX-serverX) >= 0){
			//tank.setServerX(String.valueOf(currenX-speed/lengthBetweenMouseAndTank*(currenX-serverX)));
			newX = currenX-speed/lengthBetweenMouseAndTank*(currenX-serverX);
		}
		
		if(serverY>currenY && speed/lengthBetweenMouseAndTank*(serverY-currenY)+currenY <= 100
				&& speed/lengthBetweenMouseAndTank*(serverY-currenY)+currenY >= 0) {
			//tank.setServerY(String.valueOf(speed/lengthBetweenMouseAndTank*(serverY-currenY)+currenY));
			newY = speed/lengthBetweenMouseAndTank*(serverY-currenY)+currenY;
		}else if(serverY<=currenY && currenY-speed/lengthBetweenMouseAndTank*(currenY-serverY) <= 100
				&& currenY-speed/lengthBetweenMouseAndTank*(currenY-serverY) >= 0){
			//tank.setServerY(String.valueOf(currenY-speed/lengthBetweenMouseAndTank*(currenY-serverY)));
			newY = currenY-speed/lengthBetweenMouseAndTank*(currenY-serverY);
		}
		for(Tank otherTank:tanks.values()) {
			if(Math.pow(Double.parseDouble(otherTank.getServerX())-newX,2) + 
					Math.pow(Double.parseDouble(otherTank.getServerY())-newY,2) <= distance*distance
					&& !otherTank.getId().equals(tank.getId())) {
				return;
			}
		}
		tank.setServerY(String.valueOf(newY)).setServerX(String.valueOf(newX));
	}
	
	public static void updatePossition(String sessionId,Tank tank){
		//PositionService.tanks = RoomService.
		tanks.put(sessionId, tank);
		
	}
	
	public static ArrayList<Tank> getTanks(){
		ArrayList<Tank> al = new ArrayList<Tank>();
		al.addAll(tanks.values());
		return al;
	}
	
	public static ArrayList<Bullet> getBullets(){
		ArrayList<Bullet> al = new ArrayList<Bullet>();
		al.addAll(bullets.values());
		return al;
	}
	
	public static Tank removeTank(String sessionId){
		return tanks.remove(sessionId);
		
	}
	
}
