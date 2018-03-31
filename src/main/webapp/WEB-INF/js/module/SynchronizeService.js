define("module/SynchronizeService", [
  "dojo/_base/declare",
  "module/Tank",
  "dojo/dom-construct",
  "module/PositionService"
], function(declare,Tank,domConstruct,positionService) {
	
    return {
    	//发送子弹或者坦克的信息到服务器
    	 synchronize : function(obj,ws){
    		 if(obj instanceof Array){
    			 obj.map(function(e){
    				 var serverPositon = positionService.changeToServerPosition(e.screenX,e.screenY);
    				 if(e.type){
    					 ws.send(
    					  JSON.stringify({
        	  				 type : 'bullet',
        	  				 serverX : serverPositon.serverX + '',
        	  				 serverY : serverPositon.serverY  + '',
        	  				 direction : e.direction + ''
        	  			 }));
    				 }else{
    					 ws.send(JSON.stringify({
        	  				 type : 'tank',
        	  				 serverX : serverPositon.serverX + '',
        	  				 serverY : serverPositon.serverY + ''
        	  			 }));
    				 }
    				  
    			 });
    		 }else if(obj !== null || obj !== undefined){
    			 var serverPositon = positionService.changeToServerPosition(obj.screenX,obj.screenY);
    			 if(obj.type == 'bullet'){
					 ws.send(JSON.stringify({
    	  				 type : 'bullet',
    	  				 serverX : serverPositon.serverX + '',
    	  				 serverY : serverPositon.serverY + '',
    	  				 direction : obj.direction + ''
    	  			 }));
				 }else if(obj.type == 'mouse'){
					 ws.send(JSON.stringify({
    	  				 type : 'mouse',
    	  				 serverX : serverPositon.serverX + '',
    	  				 serverY : serverPositon.serverY + ''
    	  			 }));
				 }else{
					 ws.send(JSON.stringify({
    	  				 type : 'tank',
    	  				 serverX : serverPositon.serverX + '',
    	  				 serverY : serverPositon.serverY + ''
    	  			 }));
				 }
  	  	     }
    		 
	  	  },
	  	  
	  	  synPictureId : function(pictureId,ws){
	  		ws.send(JSON.stringify({
 				 type : 'pictureId',
 				 pictureId : pictureId+''
 			 }));
	  	  },
	  	  
	  	  //接收到服务器推送的信息后，完成其他坦克的显示等同步工作
	  	  synEnemys : function(data,scope){
	  		  var data = JSON.parse(data);
	  		  if(data.type == 'id'){
	  			  scope.context.tank.id = data.tankId;
	  			  
	  		  }else{
	  			var enemySize = scope.enemys.length;
	  			
	  			data.tanks.forEach(function(tankInfo){
	  				var tankScreenPosition = positionService.changeToScreenPosition(tankInfo.serverX,tankInfo.serverY);
	  				tankInfo.screenX = tankScreenPosition.screenX;
	  				tankInfo.screenY = tankScreenPosition.screenY;
	  				var hasEnemy = false;
	  				scope.enemys.forEach(function(enemy){
	  					if(enemy.enemyId == tankInfo.id && scope.context.tank.id != tankInfo.id){
	  						hasEnemy = true;
	  					}else if(scope.context.tank.id == tankInfo.id){
	  						scope.context.tank.screenX = tankInfo.screenX;
	  						scope.context.tank.screenY = tankInfo.screenY;
	  					}
	  				});
	  				if(!hasEnemy){
	  					if(scope.context.tank.id != tankInfo.id){
			  				  //创建敌方坦克html元素
			  				  enemyId = tankInfo.id;
			  				  if(tankInfo.pictureId === undefined){
			  					  var img = domConstruct.create('img',{id:enemyId,src:"../img/heroUp.png"},
				  						  scope.context.document.getElementById("connect-container"));
			  				  }else{
			  					  var src = "../img/icon/"+tankInfo.pictureId+".png";
			  					  var img = domConstruct.create('img',{id:enemyId,src:src},
				  						  scope.context.document.getElementById("connect-container"));
			  				  }
			  				  
			  				positionService.updatePictureSize(img);
			  				  
			  				  scope.enemys.push({
			  					 img : img,
			  					 enemyId : enemyId,
			  					 tank : new Tank(0,0,0,0,10)
			  			      });
			  				  
			  			  }
	  				}
	  				
	  				scope.enemys.forEach(function(enemy){
	  					/*if(enemy.enemyId != tankInfo.id && scope.context.tank.id != tankInfo.id){
			  				  //创建敌方坦克html元素
			  				  enemyId = tankInfo.id;
			  				  var img = domConstruct.create('img',{id:enemyId,src:"../img/heroUp.png"},
			  						  scope.context.document.getElementById("connect-container"));
			  				  
			  				  scope.enemys.push({
			  					 img : img,
			  					 enemyId : enemyId,
			  					 tank : new Tank(0,0,0,0,10)
			  			      });
			  				  
			  			  }*/
	  					
	  					if(enemy.enemyId == tankInfo.id){
	  						enemy.tank.screenX = tankInfo.screenX;
	  						enemy.tank.screenY = tankInfo.screenY;
	  						
	  						var enemyCanvasPosition = positionService.changeToCanvasPosition(tankInfo.screenX,tankInfo.screenY,scope.context.tank);
	  						enemy.tank.canvasX = enemyCanvasPosition.canvasX;
	  						enemy.tank.canvasY = enemyCanvasPosition.canvasY;
	  					}
	  				});
	  			});
	  			//去掉不存在于服务器传回的坦克信息中的enemy
	  			scope.enemys.forEach(function(enemy,index,enemys){
	  				serverHasTank = false;
	  				data.tanks.forEach(function(tankInfo){
	  					if(tankInfo.id == enemy.enemyId){
	  						serverHasTank = true;
	  					}
	  				});
	  				if(!serverHasTank){
	  					enemys.splice(index,1);
	  				}
	  			});
	  		  }
	  	  }
    	
    };
});