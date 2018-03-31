define("module/Tank", ["dojo/_base/declare",
                       "module/Bullet"
], function(declare,bullet) {
	
    return declare('module.Tank', [bullet], {
    	
    	id: -1,
    	
    	canvasX: 0,
    	
    	canvasY: 0,
    	
    	screenX: 0,
    	
    	screenY: 0,
    	
    	speed: 10,
    	
    	isLive : true,
    	
    	event : 1,
    	
    	direction : 0,
    	
    	pictureId : 0,
    	
    	bullets : new Array(),
    	
    	constructor : function(canvasX,canvasY,screenX,screenY,speed){
    		this.canvasX = canvasX;
    		this.canvasY = canvasY;
    		this.screenX = screenX;
    		this.screenY = screenY;
    		this.speed = speed;
    		this.isLive = true;
    	},
    	
    	moveX: function(step){
    		this.screenX += step * this.speed;
    	},
    	
    	moveY: function(step){
    		this.screenY += step * this.speed;
    	},
   	    
   	    move : function(keyCode){
  			 switch(keyCode){
  			 //向上
  			 case 'w':
  				this.screenY += -1 * this.speed;
  				this.direction = 0;
  				break;
  		     //向下
 			 case 's':
 				this.screenY += 1 * this.speed;
 				this.direction = 2;
 				break;
 			 //向左
 			 case 'a':
 				this.screenX += -1 * this.speed;
 				this.direction = 3;
 				break;
 			 //向右
 			 case 'd':
 				this.screenX += 1 * this.speed;
 				this.direction = 1;
 				break;
  			 //console.log(this.screenX + ' ' + this.screenY); 
  		 }
   	    },
  		 
  		 shot : function(){
  			 bul = new bullet(this.canvasX,this.canvasY,this.screenX,this.screenY,5,this.direction);
  			 this.bullets.push(bul);
  			 //console.log(this.bullets);
  			 return {
  				 type : 'bullet',
  				 screenX : bul.screenX,
  				 screenY : bul.screenY,
  				 direction : bul.direction
  			 }
  		 }
  		 
  		 
  		 
    	
    });
});