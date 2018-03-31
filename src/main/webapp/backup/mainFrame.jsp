<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
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
        #connect-container {  
            float: left;  
            width: 400px  
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
  
    
  
    <script type="text/javascript">  
        var ws = null;  
        var url = null;  
        var transports = [];  
        console.log('this log');
  
        function setConnected(connected) {  
            document.getElementById('connect').disabled = connected;  
            document.getElementById('disconnect').disabled = !connected;  
            document.getElementById('echo').disabled = !connected;  
        }  
  
        /* function connect() {   
            if (!url) {  
                alert('Select whether to use W3C WebSocket or SockJS');  
                return;  
            }  
  
            ws = (url.indexOf('sockjs') != -1) ?   
                new SockJS(url, undefined, {protocols_whitelist: transports}) : new WebSocket(url);  
  
            ws.onopen = function () {  
                setConnected(true);  
                log('Info: connection opened.');  
            };  
            ws.onmessage = function (event) {  
                log('Received: ' + event.data);  
            };  
            ws.onclose = function (event) {  
                setConnected(false);  
                log('Info: connection closed.');  
                log(event);  
            };  
        }  */ 
  
        function disconnect() {  
            if (ws != null) {  
                ws.close();  
                ws = null;  
            }  
            setConnected(false);  
        }  
  
        function echo() {  
            if (ws != null) {  
                var message = document.getElementById('message').value;  
                log('Sent: ' + message);  
                ws.send(message);  
            } else {  
                alert('connection not established, please connect.');  
            }  
        }  
  
        function updateUrl(urlPath) {  
            if (urlPath.indexOf('sockjs') != -1) {  
                url = urlPath;  
                document.getElementById('sockJsTransportSelect').style.visibility = 'visible';  
            }  
            else {  
              if (window.location.protocol == 'http:') {  
                  url = 'ws://' + window.location.host + urlPath;  
              } else {  
                  url = 'wss://' + window.location.host + urlPath;  
              }  
              document.getElementById('sockJsTransportSelect').style.visibility = 'hidden';  
            }  
        }  
  
        function updateTransport(transport) {  
            alert(transport);  
          transports = (transport == 'all') ?  [] : [transport];  
        }  
          
        function log(message) {  
            var console = document.getElementById('console');  
            var p = document.createElement('p');  
            p.style.wordWrap = 'break-word';  
            p.appendChild(document.createTextNode(message));  
            console.appendChild(p);  
            while (console.childNodes.length > 25) {  
                console.removeChild(console.firstChild);  
            }  
            console.scrollTop = console.scrollHeight;  
        }  
    </script>  
</head>  
<body ng-app="myApp">  
<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websockets   
    rely on Javascript being enabled. Please enable  
    Javascript and reload this page!</h2></noscript>  
<div>  
    <div id="connect-container" ng-controller="tankControl">  
        <!-- <input id="radio1" type="radio" name="group1" onclick="updateUrl('/websocket');">  
            <label for="radio1">W3C WebSocket</label>  
        <br>  
        <input id="radio2" type="radio" name="group1" onclick="updateUrl('/websocket');">  
            <label for="radio2">SockJS</label>  
        <input ng-model="name" type="text" placeholder="Your name">
        <input id="connect" type="button" value='连接' name="group1" ng-click="connect()"> 
  		<h1 id='hero1'>Hello {{id}}</h1>  --> 
  		<canvas id="hero" width="1000" height="600" x={{x}} y={{y}} ></canvas>
  		<img id="heroUp" src="../img/heroUp.png" alt="The Tulip" />
  		<img id="heroDown" src="../img/heroUp.png" alt="The Tulip" />
  		<img id="heroLeft" src="../img/heroLeft.png" alt="The Tulip" />
  		<img id="heroRight" src="../img/heroRight.png" alt="The Tulip" />
  		<img id="backGround" src="../img/backGround.png" alt="The Tulip" />
  		<img id="bullet" src="../img/bullet.jpg" alt="The Tulip" />
    </div>
</div>  
</body>
<script src="../js/business/frame/frame.js" charset="utf-8"></script>    
</html>  