require(["module/Tank",
         "module/SynchronizeService",
         "module/SRecorder",
         "module/PositionService",
         "dojo/cookie"
         ], function(Tank,synService,SRecorder,positionService,cookie){
           /*require(["dijit/form/Button", "dojo/_base/window"], function(Button, win){
                ready(function(){
                      new Button({}).placeAt(win.body());
                });
           });*/
	
	     //console.log($('#radio1'));
	     //初始化音频
		 navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		 
		 var gRecorder = null;
		 var audio = document.querySelector('audio');
		 audio.autoplay=true;
		 var door = false;
		 
		 
		 SRecorder.get = function (callback) {
			    if (callback) {
			        if (navigator.getUserMedia) {
			            navigator.getUserMedia(
			                { audio: true },
			                function (stream) {
			                    var rec = SRecorder.record(stream);
			                    callback(rec);
			                },
			                function(){})
			        }
			    }
		 };
		 SRecorder.get(function (rec) {
		        gRecorder = rec;
		    });
			
	     //获取屏幕的高度和宽度来设置画板的宽高
	     var hero=$("#hero").get(0);
	     var screenHeight = $(document).height();
	     var screenWidth = $(document).width();
	     hero.width = screenWidth;
	     hero.height = screenHeight;
	     this.backGround=$("#backGround").get(0);
	     
	     /*this.loadBackgroundSuccess = false;
	     this.backGround.onload = function() {
	    	this.loadBackgroundSuccess = true;
	     }
	     sleep()*/
	     //根据屏幕的宽高来设置背景的宽高，保证图片的比例不变
	     //updateBackgroundSize(screenWidth,screenHeight,this.backGround);
	     
	     //初始化位置服务，设置画板展示的内容占背景图片的比例等
	     var pictureSizeRaito = 0.025;
	     var ratio = 0.3;
	     positionService.init(ratio,pictureSizeRaito,this.backGround);
	     
	     var bullet=$("#bullet").get(0);
	     var ctx=hero.getContext("2d");
	     var heroIcon=$("#heroIcon").get(0);
	     var picture_id = cookie('pi');
         heroIcon.setAttribute("src","../img/icon/"+picture_id+".png");
         //根据比例更新头像的大小
	     positionService.updatePictureSize(heroIcon);
         
    	 this.tank = new Tank(0,0,0,0,10);
    	 this.tank.pictureId = picture_id;
    	 document.onkeydown  = function(e){
    		 //tank.event = e.key;
    		 keyCode = e.key;
    		 if(keyCode == 'p'){
    	            if(!door) {
    	                gRecorder.start();
    	                door = true;
    	            }
    	     }else if(keyCode == 'j'){
    			 bulletObj = tank.shot();
    			 synService.synchronize(bulletObj,ws);
    		 }else{
    		 flag = true;
    		 setTimeout(function(){
    		     tank.move(keyCode);
    		     synService.synchronize(tank,ws);
    			 setTimeout(function(){
    				 if(flag){
    				 arguments.callee;
    				 }},30);

    			 },10);
    		 }
    	 };
    	 document.onkeyup = function(e){
    		 keyCode = e.key;
    		 if(keyCode == 'p') {
    	            if(door) {
    	                ws.send(gRecorder.getBlob());
    	                gRecorder.clear();
    	                gRecorder.stop();
    	                door = false;
    	            }
    	        };
    		 flag = false;
         };
 		 var context = this;
 		 
 		var myApp = angular.module("myApp", []);
 	    myApp.controller("tankControl", function($scope){
 	    	$scope.context = context;
 	    	$scope.enemys = [];
 	        $scope.x = tank.screenX;
 	        $scope.y = tank.screenY;
 	        $scope.mouseX = 1;
 	        $scope.mouseY = 1;
 	        $scope.id = tank.id;
 	        $scope.hero = tank;
 	        $scope.screenHeight = $(document).height();
 	        $scope.screenWidth = $(document).width();
 	        $scope.ws = null;
 	        setInterval(function(){
 	        	/*var canvasPosition = positionService.getCanvasBackgroundPosition(tank.screenX,tank.screenY);
 	        	if (canvasPosition.canvasX > this.backGround.width){
 	        		canvasPosition.canvasX = this.backGround.width;
 	        	}else if(canvasPosition.canvasX < 0){
 	        		canvasPosition.canvasX = 0;
 	        	}
 	        	if (canvasPosition.canvasY > this.backGround.height){
 	        		canvasPosition.canvasY = this.backGround.height;
 	        	}else if(canvasPosition.canvasY < 0){
 	        		canvasPosition.canvasY = 0;
 	        	}
 	        	ctx.drawImage(this.backGround,canvasPosition.canvasX,canvasPosition.canvasY,positionService.canvasLengthOfX,
 	        			positionService.canvasLengthOfY,0,0,this.backGround.width,this.backGround.height);*/
 	        	
 	        	ctx.drawImage(this.backGround,tank.screenX,tank.screenY,positionService.canvasLengthOfX,
 	        			positionService.canvasLengthOfY,0,0,$scope.screenWidth,$scope.screenHeight);
 	        	ctx.drawImage(heroIcon,$scope.screenWidth/2-heroIcon.width/2,$scope.screenHeight/2-heroIcon.height/2,
 	        			heroIcon.width,heroIcon.height);
 	        	
 	        	
 	        	/*var mouseScreenPosition = positionService.changeMousePositionToScreenPosition(canvasPosition.canvasX,canvasPosition.canvasY,
 	        			$scope.mouseX,$scope.mouseY);*/
 	        	var mouseScreenPosition = positionService.changeMousePositionToScreenPosition(tank.screenX,tank.screenY,
 	        			$scope.mouseX,$scope.mouseY);
 	        	var mouse = {
 	        		'type' : 'mouse',
 	        		'screenX' : mouseScreenPosition.screenX,
 	        		'screenY' : mouseScreenPosition.screenY
 	        	};
 	        	synService.synchronize(mouse,ws);
 	        	$scope.enemys.forEach(function(enemy,index,enemyArray){
 	        		/*if(enemy.tank.isLive){
 	        			ctx.drawImage(enemy.img,enemy.tank.screenX,enemy.tank.screenY);
 	        		}else{
 	        			ctx.drawImage(enemy.img,-30,-30);
 	        			enemyArray.pop(index);
 	        		}*/
 	        		/*if(positionService.isEnemyShow(enemy.tank,$scope.hero)){
 	        			ctx.drawImage(enemy.img,enemy.tank.canvasX,enemy.tank.canvasY);
 	        		}*/
 	        		ctx.drawImage(enemy.img,enemy.tank.canvasX-enemy.img.width/2,enemy.tank.canvasY-enemy.img.height/2,
 	        				enemy.img.width,enemy.img.height);
 	        		
 	        	});
 	        	if(tank.bullets.length>0){
	 	        	tank.bullets.forEach(function(e){
	 	        		e.move();
	 	        		ctx.drawImage(bullet,e.canvasX,e.canvasY);
	 	        	});
 	            }  
 	        	
 	        },25);
 	        
 	      
 	       //$scope.connect = function() {   
 	            url = 'ws://127.0.0.1/myHandler';
 	            ws = (url.indexOf('sockjs') != -1) ?   
 	                new SockJS(url, undefined, {protocols_whitelist: transports}) : new WebSocket(url);  
 	  
 	            ws.onopen = function () {  
 	            	console.log('succeed');
 	            	//ws.send('I am the client and I\'m listening!'); 
 	            	synService.synPictureId(tank.pictureId,ws);
 	            };  
 	            ws.onmessage = function (event) { 
 	            	if(event.data instanceof Blob){
 	            		$scope.receive(event.data);
 	            	}else{
 	            		synService.synEnemys(event.data,$scope);
 	            	}
 	            	//console.log(event.data);
 	            };  
 	            ws.onclose = function (event) {  
 	            	console.log('close');
 	            };  
 	            ws.onerror = function(event) {
 	            	console.log('WebSocketError!');
 	            };
 	            
 	        //};
 	        $scope.myKeyup = function(e){
 	            var keycode = window.event?e.keyCode:e.which;
 	            if(keycode==13){
 	                $scope.myClass = 'green';
 	                $scope.myClick();
 	            }
 	        };
 	        $scope.myClick = function(){
 	            $scope.isClick = 'Yes!';
 	        };
 	        $scope.receive = function(e) {
 	    	    //audio.attr('src', window.URL.createObjectURL(e));
 	        	audio.src = window.URL.createObjectURL(e);
 	    	}
 	       $scope.getBlob2 = function(data,len){
 	    	    var buffer = new ArrayBuffer(len);
 	    	    var dataview = new DataView(buffer);
 	    	    writeUint8Array(dataview,0,data,len);
 	    	    return new Blob([dataview], { type: 'audio/wav' });

 	    	}
 	       $scope.mouseMove = function(){
 	    	  $scope.mouseX = event.clientX;
 	    	  $scope.mouseY = event.clientY;
 	 	   } 
 	    });
 	    
 	    function updateBackgroundSize(screenWidth,screenHeight,background){
 	    	var backgroundWidth = background.width;
 	    	var backgroundHeight = background.height;
 	    	if(screenWidth/screenHeight > backgroundWidth/backgroundHeight){
 	    		background.width = screenWidth;
 	    		background.height = screenWidth/(backgroundWidth/backgroundHeight);
 	    	}else if(screenWidth/screenHeight < backgroundWidth/backgroundHeight){
 	    		background.height = screenHeight;
 	    		background.width = screenHeight*(backgroundWidth/backgroundHeight);
 	    	}
 	    }
 	    
 	   window.onresize = function(){
 		  var screenHeight = $(document).height();
 		  var screenWidth = $(document).width();
 		  hero.width = screenWidth;
	      hero.height = screenHeight;
 		  //根据屏幕的宽高来设置背景的宽高，保证图片的比例不变
 		  updateBackgroundSize(screenWidth,screenHeight,this.backGround);
 	   }
 	   
 	  function m(){
 		 console.log(event.clientX , event.clientY);
 	  } 
});