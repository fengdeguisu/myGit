define("module/PositionService", [
  "dojo/_base/declare",
  "module/Tank",
  "dojo/dom-construct"
], function(declare,Tank,domConstruct) {
	
    return {
    	 //服务器中显示的画板X轴比例
    	 canvasRatioOfX : 0,
    	 //头像显示的比例
    	 ratioOfPictureSize : 0,
    	 //画板显示内容的X轴长度在背景图中的像素长度，用于canvas截取
    	 canvasLengthOfX : 0,
    	//画板显示内容的Y轴长度在背景图中的像素长度，用于canvas截取
    	 canvasLengthOfY : 0,
    	//屏幕宽度
    	 windowsLengthOfX : $(document).width(),
    	//屏幕高度
    	 windowsLengthOfY : $(document).height(),
    	//可移动的画板宽度
    	 screenLengthOfX : 0,
    	//可移动的画板高度
    	 screenLengthOfY : 0,
    	//将服务器的位置转为屏幕的位置
    	 changeToScreenPosition : function(x,y){
    		 /*var screenHeight = this.screenLengthOfY;
    	     var screenWidth = this.screenLengthOfX;*/
    	     /*var screenX = x/100*(this.screenLengthOfX-this.canvasLengthOfX);
    	     var screenY = y/100*(this.screenLengthOfY-this.canvasLengthOfY);*/
    		 var screenX = x/100*(this.screenLengthOfX);
    	     var screenY = y/100*(this.screenLengthOfY);
    	     return {
    	    	 'screenX': screenX,
    	    	 'screenY': screenY
    	     };
    		 
	  	  },
	  	  
	  	  //将屏幕上的位置转为服务器的位置
	  	  changeToServerPosition : function(x,y){
	  		 /*var screenHeight = this.screenLengthOfY;
	   	     var screenWidth = this.screenLengthOfX;*/
	   	     /*var serverX = x/(this.screenLengthOfX-this.canvasLengthOfX)*100;
	   	     var serverY = y/(this.screenLengthOfY-this.canvasLengthOfY)*100;*/
	  		var serverX = x/(this.screenLengthOfX)*100;
	   	     var serverY = y/(this.screenLengthOfY)*100;
	   	     return {
	   	    	 'serverX': serverX,
	   	    	 'serverY': serverY
	   	     };
	  	  },
	  	  
	  	  //将屏幕的长度转为画板内的长度
	  	  changeScreenLengthToCanvasLength : function(length){
	  		  return 
	  	  },
	  	  
	  	//将服务器的长度转为画板内的长度
	  	  changeServerLengthToCanvasLength : function(length){
	  		  
	  	  },
	  	  
	  	  //获取画板显示的内容的左上角的坐标，用于显示背景图片的位置
	  	  getCanvasBackgroundPosition : function(screenX,screenY){
	  		  return {
	  			  canvasX : screenX-this.canvasLengthOfX/2,
	  			  canvasY : screenY-this.canvasLengthOfY/2,
	  		  };
	  	  },
	  	  
	  	  //将屏幕上的位置转为画板的位置,位置的获取是针对默认hero处于屏幕正中间位置，获取可视范围内的enermy位置
	  	  changeToCanvasPosition : function(screenX,screenY,hero){
	  		var heroScreenX = this.windowsLengthOfX/2;
	  		var heroScreenY = this.windowsLengthOfY/2;
	  		/*if(screenX > heroScreenX){
	  			var canvasX = screenX - this.screenLengthOfX * (hero.screenX-screenX)/this.canvasLengthOfX;
	  		}else{
	  			var canvasX = screenX + this.screenLengthOfX * (screenX-hero.screenX)/this.canvasLengthOfX;
	  		}
	  		if(screenY > heroScreenY){
	  			var canvasY = screenY - this.screenLengthOfY * (hero.screenY-screenY)/this.canvasLengthOfY;
	  		}else{
	  			var canvasY = screenY + this.screenLengthOfY * (screenY-hero.screenY)/this.canvasLengthOfY;
	  		}*/
	  		if(screenX < hero.screenX){
	  			var canvasX = heroScreenX - this.windowsLengthOfX * (hero.screenX-screenX)/this.canvasLengthOfX;
	  		}else{
	  			var canvasX = heroScreenX + this.windowsLengthOfX * (screenX-hero.screenX)/this.canvasLengthOfX;
	  		}
	  		if(screenY < hero.screenY){
	  			var canvasY = heroScreenY - this.windowsLengthOfY * (hero.screenY-screenY)/this.canvasLengthOfY;
	  		}else{
	  			var canvasY = heroScreenY + this.windowsLengthOfY * (screenY-hero.screenY)/this.canvasLengthOfY;
	  		}
	  		return {
	  			'canvasX' : canvasX,
	  			'canvasY' : canvasY
	  		};
	  	  },
	  	  
	  	updatePictureSize : function(heroIcon){
	  		/*heroIcon.width = 3/100*this.screenLengthOfX;
	  		heroIcon.height = 3/100*this.screenLengthOfY;*/
	  		heroIcon.width = this.ratioOfPictureSize/this.canvasRatioOfX*this.windowsLengthOfX;
	  		heroIcon.height = this.ratioOfPictureSize/this.canvasRatioOfX*this.windowsLengthOfX;
	  	},
	  	  
	  	 //初始化，设置画板显示的占比，根据传入的占比设置画板显示内容在背景图片上的像素长度
	  	  init : function(ratio,pictureSizeRaito,background){
	  		  this.canvasRatioOfX = ratio;
	  		  this.ratioOfPictureSize = pictureSizeRaito;
	  		  if(this.windowsLengthOfY/this.windowsLengthOfX >= background.height/background.width){
	  			this.canvasLengthOfX = background.height/((1+this.windowsLengthOfY/this.windowsLengthOfX*ratio)/ratio);
	  			this.canvasLengthOfY = this.windowsLengthOfY/this.windowsLengthOfX*this.canvasLengthOfX;
	  			this.screenLengthOfX = 1/ratio*this.canvasLengthOfX;
	  			this.screenLengthOfY = this.screenLengthOfX;
	  		  }else{
	  			this.canvasLengthOfX = background.width/((1+ratio)/ratio);
	  			this.canvasLengthOfY = this.windowsLengthOfY/this.windowsLengthOfX*this.canvasLengthOfX;
	  			this.screenLengthOfX = 1/ratio*this.canvasLengthOfX;
	  			this.screenLengthOfY = this.screenLengthOfX;
	  		  }
	  		  /*this.canvasLengthOfX = this.screenLengthOfX * ratio;
	  		  this.canvasLengthOfY = this.canvasLengthOfX/(this.screenLengthOfX/this.screenLengthOfY);*/
	  	  },
	  	  
	  	//根据enemy和hero的相对位置，确定是否在画板上显示enemy
	  	  isEnemyShow : function(enemy,hero){
	  		  if(Math.abs(enemy.screenX-hero.screenX)<=this.canvasLengthOfX/2 &&
	  				  Math.abs(enemy.screenY-hero.screenY)<=this.canvasLengthOfY/2 ){
	  			  return true;
	  		  }
	  		  return false;
	  	  },
	  	  
	  	/*//将画布上的鼠标位置转为屏幕的位置，这样才能计算出鼠标位置相对于屏幕上hero位置的相对位置
	  	  changeMousePositionToScreenPosition : function(canvasX,canvasY,mouseX,mouseY){
	  		
	  		return {
	  			'screenX' : mouseX/this.screenLengthOfX*this.canvasLengthOfX + canvasX,
	  			'screenY' : mouseY/this.screenLengthOfY*this.canvasLengthOfY + canvasY
	  		};
	  	  },*/
	  	//将画布上的鼠标位置转为屏幕的位置，这样才能计算出鼠标位置相对于屏幕上hero位置的相对位置
	  	  changeMousePositionToScreenPosition : function(tankX,tankY,mouseX,mouseY){
	  		if(mouseX < this.screenLengthOfX/2){
	  			var screenX = tankX - (0.5-mouseX/this.windowsLengthOfX)*this.canvasLengthOfX;
	  		}else{
	  			var screenX = tankX + (mouseX/this.windowsLengthOfX-0.5)*this.canvasLengthOfX;
	  		}
	  		if(mouseY < this.screenLengthOfY/2){
	  			var screenY = tankY - (0.5-mouseY/this.windowsLengthOfY)*this.canvasLengthOfY;
	  		}else{
	  			var screenY = tankY + (mouseY/this.windowsLengthOfY-0.5)*this.canvasLengthOfY;
	  		}
	  		return {
	  			'screenX' : screenX,
	  			'screenY' : screenY
	  		};
	  	  }
    	
    };
});