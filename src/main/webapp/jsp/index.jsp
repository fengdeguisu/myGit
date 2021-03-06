<!DOCTYPE html>
    <html class="no-js">

    <head>

        <meta charset="utf-8">
        <title>Fullscreen Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- CSS -->
        <link rel="stylesheet" href="../css/login/reset.css">
        <link rel="stylesheet" href="../css/login/supersized.css">
        <link rel="stylesheet" href="../css/login/style.css">
        <link rel="stylesheet" href="../css/login/background.css">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

    </head>

    <body oncontextmenu="return false">
        <section class="hidden-xs" name="background">
            <ul class="cb-slideshow">
                <li><span>page1</span></li>
                <li><span>page2</span></li>
                <li><span>page3</span></li>
                <li><span>page4</span></li>
                <li><span>page5</span></li>
                <li><span>page6</span></li>
            </ul>
        </section>
        <div id="overlay" class="magnify">
            <div class="large"></div>
            <img class="small" src="../img/login/blackBackground.png">
            <div class="pictureSelector">
                <h2>选择图片</h2>
                <ul class="pictures">
                    <li><img id="01" src="../img/icon/01.png" /></li>
				  	<li><img id="02" src="../img/icon/02.png" /></li>
				  	<li><img id="03" src="../img/icon/03.png" /></li>
				  	<li><img id="04" src="../img/icon/04.png" /></li>
				  	<li><img id="05" src="../img/icon/05.png" /></li>
				  	<li><img id="06" src="../img/icon/06.png" /></li>
				  	<li><img id="07" src="../img/icon/07.png" /></li>
                </ul>
                <p style="line-height:40px"><a class="btn">确定</a></p>
            </div>
        </div>
        <div class="page-container">
            <h1>Login</h1>
            <form action="" method="post">
                <div>
                    <input type="text" name="username" class="username" placeholder="Username" autocomplete="off" />
                </div>
                <button id="choosePicture" type="button">选择图片</button>
                <button id="submit" type="button">进入游戏</button>
            </form>
            <div class="connect">
                <p>If we can only encounter each other rather than stay with each other,then I wish we had never encountered.</p>
                <p style="margin-top:20px;">如果只是停留，不能遇见，那不如不见</p>
            </div>
        </div>
        <div class="alert" style="display:none">
            <h2>提示</h2>
            <div class="alert_con">
                <p id="ts"></p>
                <p style="line-height:70px"><a class="btn">确定</a></p>
            </div>
        </div>

        <!-- Javascript -->
        <script src="../js/jquery/jquery.js" type="text/javascript"></script>
        <!-- <script src="../js/business/login/supersized.3.2.7.min.js" ></script>
        <script src="../js/business/login/supersized-init.js" ></script> -->
        <script>
            $(".btn").click(function() {
                is_hide();
            })
            var user = $("input[name=username]");
            var psd = $("input[name=password]");
            $("#submit").on('click', function() {
                if (user.val() == '') {
                    $("#ts").html("用户名不能为空~");
                    is_show();
                    return false;
                } else if (typeof(pictureId) == "undefined") {
                    $("#ts").html("还未选择游戏图片");
                    is_show();
                    return false;
                }
                /* else{
                	var reg = /^[0-9A-Za-z]+$/;
                	if(!reg.exec(u.val()))
                	{
                		$("#ts").html("用户名错误");
                		is_show();
                		return false;
                	}
                } */
                $.ajax({
                    url: '../user/name',
                    type: 'POST', //GET
                    async: true, //或false,是否异步
                    data: {
                        name: encodeURI(user.val()),
                        pictureId: pictureId
                    },
                    timeout: 5000, //超时时间
                    /* dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                    beforeSend:function(xhr){
                        console.log(xhr)
                        console.log('发送前')
                    }, */
                    success: function(data, textStatus, jqXHR) {
                        window.location.href = '../websocket/';
                    },
                    error: function(xhr, textStatus) {

                        }
                        /* ,
                        			    complete:function(){
                        			        console.log('结束')
                        			    } */
                });
            });

            $('#overlay').on('click', function() {
                $('#overlay').css('display', 'none');
            });

            $('#choosePicture').on('click', function() {
                $('#overlay').css('display', 'block');
            });

            $('.pictures li').on('click', function(e) {
                tempPictureId = e.target.id;
                $('.pictures li').css('background', 'white');
                e.stopPropagation();
                e.currentTarget.style.backgroundColor = '#ee0221';

            });

            $('.pictureSelector .btn').on('click', function(e) {
                pictureId = tempPictureId;
            });

            window.onload = function() {
                $(".connect p").eq(0).animate({
                    "left": "0%"
                }, 600);
                $(".connect p").eq(1).animate({
                    "left": "0%"
                }, 400);
            }

            function is_hide() {
                $(".alert").animate({
                    "top": "-40%"
                }, 300)
            }

            function is_show() {
                $(".alert").show().animate({
                    "top": "45%"
                }, 300)
            }

            $(".magnify").mousemove(function(e) {
                var pageX = e.pageX;
                var pageY = e.pageY;
                if (pageX < $(this).width() && pageY < $(this).height() && pageX > 0 && pageY > 0) {
                    $(".large").fadeIn(100)
                } else {
                    $(".large").fadeOut(100)
                }
                if ($(".large").is(":visible")) {
                    var moveX = Math.round(pageX - $(".large").width() / 2) * -1;
                    var moveY = Math.round(pageY - $(".large").height() / 2) * -1;
                    var bgPosition = moveX + "px " + moveY + "px";
                    var largeX = pageX - $(".large").width() / 2;
                    var largeY = pageY - $(".large").height() / 2;
                    $(".large").css({
                        left: largeX,
                        top: largeY,
                        backgroundPosition: bgPosition
                    })
                }
            })
        </script>
    </body>

    </html>