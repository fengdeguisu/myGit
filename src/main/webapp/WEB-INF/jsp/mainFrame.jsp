<!DOCTYPE html>
<html>  
<head>  
    <title>Tank</title>
    <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
        <script src="../js/dojo/dojo.js" charset="utf-8"
		data-dojo-config="parseOnLoad: true, async:false"></script>  
	
	<!-- <script type="text/javascript"  charset="utf-8"
    src="../js/dojo/dojo.js"
    data-dojo-config="async: true, packages: [  
    { name: 'jquery', location: '/js/jquery',   
      main: 'jquery' }  
    ]">  
   </script>  -->
	<script src="../js/angular/base/angular.js" charset="utf-8"></script>
	<script src="../js/jquery/jquery.js"></script>
    <style type="text/css">  
    	#backGround{
		    position: absolute;
		    top: -20000px;
		  	left: -20000px;
    	}
    	
    	#heroIcon, #heroDown,#heroLeft,#heroRight,#bullet{
    	    position: absolute;
		    top: -20000px;
		  	left: -20000px;
    	}
        #hero {  
            width: 100%;
		    height: 100%;
		  	position: absolute;
		  	top: 0px;
		  	left: 0px;
		  	background-repeat: none;
		  	cursor: url("../img/mouse1.cur"), url(../img/mouse1.cur), auto;
        } 
        
        #connect-container {  
            width: 100%;
		    height: 100%;
		  	top: 0px;
		  	left: 0px;
		  	background-position: 50% 50%;
		  	background-repeat: none
        }  
  
        #connect-container div {  
            padding: 5px;  
        }  
  
        #console-container {  
            float: left;  
            margin-left: 15px;  
            width: 400px;  
        }  
  
        #console {  
            border: 1px solid #CCCCCC;  
            border-right-color: #999999;  
            border-bottom-color: #999999;  
            height: 170px;  
            overflow-y: scroll;  
            padding: 5px;  
            width: 100%;  
        }  
  
        #console p {  
            padding: 0;  
            margin: 0;  
        } 
    </style>  
</head>  
<body ng-app="myApp">  
<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websockets   
    rely on Javascript being enabled. Please enable  
    Javascript and reload this page!</h2></noscript>  
<div>  
    <div id="connect-container" ng-controller="tankControl" ng-mousemove="mouseMove()">  
        <!-- <input id="radio1" type="radio" name="group1" onclick="updateUrl('/websocket');">  
            <label for="radio1">W3C WebSocket</label>  
        <br>  
        <input id="radio2" type="radio" name="group1" onclick="updateUrl('/websocket');">  
            <label for="radio2">SockJS</label>  
        <input ng-model="name" type="text" placeholder="Your name">
        <input id="connect" type="button" value='连接' name="group1" ng-click="connect()"> 
  		<h1 id='hero1'>Hello {{id}}</h1>  --> 
  		<canvas id="hero" width="1500px" height="900px" x={{x}} y={{y}} ></canvas>
  		<img id="heroIcon" alt="The Tulip" />
  		<img id="backGround" src="../img/background.jpg" alt="The Tulip" />
  		<img id="bullet" src="../img/bullet.jpg" alt="The Tulip" />
  		<audio id="audio" ></audio> 
    </div>
</div>  
</body>
<script src="../js/business/frame/frame.js" charset="utf-8"  defer></script>    
</html>  