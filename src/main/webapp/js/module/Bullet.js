define("module/Bullet", ["dojo/_base/declare"
], function(declare) {
	
    return declare('module.Bullet', [], {
    	
    	id : -1,
    	
    	isLive : true,
    	
    	canvasX: 0,
    	
        canvasY: 0,
    	
    	screenX: 0,
    	
    	screenY: 0,
    	
    	speed: 10,
    	
    	//0上 1右 2下 3左
    	direction: 0,
    	
    	constructor : function(canvasX,canvasY,screenX,screenY,speed,direction){
    		this.canvasX = canvasX;
    		this.canvasY = canvasY;
    		this.screenX = screenX;
    		this.screenY = screenY;
    		this.speed = speed;
    		this.direction = direction;
    	},
    	
    	move: function(){
    		switch(this.direction){
 			 //向上
 			 case 0:
 				this.screenY += -1 * this.speed;break;
 		     //向下
			 case 2:
				this.screenY += 1 * this.speed;break;
			 //向左
			 case 3:
				this.screenX += -1 * this.speed;break;
			 //向右
			 case 1:
				this.screenX += 1 * this.speed;break;
    	    }
    	}
    	
    });
});