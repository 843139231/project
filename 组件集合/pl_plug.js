/*
	pl_plug V1.0 special .@CopyRight2015 http://www.panweijie.com/
	{
		对话框框 弹窗
		pl_plug.dialog({title:"点击我消失，或者1秒后自动消失",con:"1",addClass:"addClass",removeClass:"removeClass"});
		title:对话框 标题
		con:对话框内容
		addClass: 进入特效
			不加引号：my_animateIn()随机
			加引号："animate bounce"
					"animate tada"
					"animate swing"
					"animate wobble"
					"animate flip"
					"animate flipInX"
					"animate flipInY"
					"animate fadeIn"
					"animate fadeInUp"
					"animate fadeInDown"
					"animate fadeInLeft"
					"animate fadeInRight"
					"animate fadeInUpBig"
					"animate fadeInDownBig"
					"animate fadeInLeftBig"
					"animate fadeInRightBig"
					"animated bounceIn"
					"animated bounceInUp"
					"animated bounceInDown"
					"animated bounceInLeft"
					"animated bounceInRight"
					"animated rotateIn"
					"animated rotateInUpLeft"
					"animated rotateInDownLeft"
					"animated rotateInUpRight"
					"animated rotateInDownRight"
					"animated rollIn"
		removeClass：消失特效
			不加引号：my_animateOut()随机
			加引号："animated fadeOut"
					"animated fadeOutUp"
					"animated fadeOutDown"
					"animated fadeOutLeft"
					"animated fadeOutRight"
					"animated fadeOutUpBig"
					"animated fadeOutDownBig"
					"animated fadeOutLeftBig"
					"animated fadeOutRightBig"
					"animated bounceOut"
					"animated bounceOutUp"
					"animated bounceOutDown"
					"animated bounceOutLeft"
					"animated bounceOutRight"
					"animated rotateOut"
					"animated rotateOutUpLeft"
					"animated rotateOutDownLeft"
					"animated rotateOutDownRight"
					"animated rollOut"
		可扩展：
			点击确定按钮
				$(".sure").click(function{});
			点击取消按钮
				$(".cancel").click(function{});
	}
	{
		消息框弹窗
		pl_plug.loading({conter:"点击我消失，或者1秒后自动消失",timeout:1,addClass:"addClass",removeClass:"removeClass"});
		conter:消息框内容
		timeout:消失时间  以秒为单位
		addClass: 进入特效
			不加引号：my_animateIn()随机
			加引号："animate bounce"
					"animate tada"
					"animate swing"
					"animate wobble"
					"animate flip"
					"animate flipInX"
					"animate flipInY"
					"animate fadeIn"
					"animate fadeInUp"
					"animate fadeInDown"
					"animate fadeInLeft"
					"animate fadeInRight"
					"animate fadeInUpBig"
					"animate fadeInDownBig"
					"animate fadeInLeftBig"
					"animate fadeInRightBig"
					"animated bounceIn"
					"animated bounceInUp"
					"animated bounceInDown"
					"animated bounceInLeft"
					"animated bounceInRight"
					"animated rotateIn"
					"animated rotateInUpLeft"
					"animated rotateInDownLeft"
					"animated rotateInUpRight"
					"animated rotateInDownRight"
					"animated rollIn"
		removeClass：消失特效
			不加引号：my_animateOut()随机
			加引号："animated fadeOut"
					"animated fadeOutUp"
					"animated fadeOutDown"
					"animated fadeOutLeft"
					"animated fadeOutRight"
					"animated fadeOutUpBig"
					"animated fadeOutDownBig"
					"animated fadeOutLeftBig"
					"animated fadeOutRightBig"
					"animated bounceOut"
					"animated bounceOutUp"
					"animated bounceOutDown"
					"animated bounceOutLeft"
					"animated bounceOutRight"
					"animated rotateOut"
					"animated rotateOutUpLeft"
					"animated rotateOutDownLeft"
					"animated rotateOutDownRight"
					"animated rollOut"
	}
	{
		禁止横屏 安卓
		pl_plug.hengshuping();
	}
	{
		进度条动画
		pl_plug.yy(src:"+publicurl+'/Uploads/icon/505.gif");
		src: 进度条动画图片的地址
	}
	{
		图片按比例自适应
		pl_plug.img_height({imgbox:"imgbox",proportion:0.35});
		imgbox:装载图片的盒子
		proportion:图片的宽高比
		注：这个 图片 宽高随着 装载图片的盒子的宽高而变化
	}
	{
		普通banner图切换
		computer_banner_pt({banner_id:"#banner_id",banner:"banner",banner_sel_id:"#banner_sel_id",banner_sel:"banner_sel",banner_sel_class:"banner_sel_class",time:"time"});
		banner_id:装载banner的容器，可以用id、class、标签名
		banner:需要切换的banner  可以用class、标签名，不能用ID
		banner_sel_id:装载 banner 焦点图的容器，可以用 id、class、标签名
		banner_sel: banenr焦点图  可以用class、标签名，不能用ID
		banner_sel_class: 被选中的焦点图的名字，class
		time: banner图自动切换的时间  以秒为单位
	}
	{
		手风琴 banner图切换
		computer_banner_sfq({banner_id:"banner_id",banner:"banner",up_width:"up_width",down_width:"down_widths",time:"time",banner_img:"banner_img",banner_img_sel:"banner_img_sel"});
		banner_id:装载banner的容器，可以用id、class、标签名
		banner:需要切换的banner  可以用class、标签名，不能用ID
		up_width:展开后的 宽度
		down_width:缩小的 宽度
		time:动画时间
		banner_img:banner切换的图片，可以是  标签明、class，不能用id
		banner_img_sel: 选中的  banner切换的图片 的名字 class
	}
	{
		移动端 banner切换
		moblie_banner({bannerid:"bannerid",banner:"banner",banner_sel_id:"banner_sel_id",banner_sel:"banner_sel".time:"time"});
	    bannerid:装载banner的容器，可以用id、class、标签名
	    banner:banner 可以是class、标签名，不能是id
	    banner_sel_id: 装载 banner 焦点图的容器，可以用id、class、标签名
	    banner_sel: 选中的 banner焦点图 的类名，class
	    time: 自动切换下一张banner 的时间
	}
    {
    	移动端 banner切换 无缝
    	moblie_banner_wf({bannerid:"bannerid",banner_img:"banner_img",time:"time",banner_sel_id:"banner_sel_id",banner_sel:"banner_sel",banner_sel_class:"banner_sel_class",direction:"direction"});
    	bannerid: 装载banner图的容器 id、class、标签
    	banner_img: banner图的标签 class、标签
    	time: 自动切换的时间 以秒为单位
    	banner_sel_id: 装载banner焦点图的容器 id、class、标签
    	banner_sel: banner焦点图 class、标签
    	banner_sel_class: 表示 banner焦点图 选中状态 class
    	direction : 左右滑动、上下滑动  left、top
    	注：
    		需要配合 jquery.mobile-1.4.5.min.js 类库来进行使用
    }
    {
    	倒计时
		pl_plug.backtime(年,月,日,"需要放置的位置(id)",刷新时间);
    }
*/
var pl_plug = (function(){
	// 图片按照比例  自适应
	function img_height (opts){
		var width =  $(window).width();
		var imgheight = width * opts.proportion;
		$(opts.imgbox).css("height",imgheight);
	};
	// 对话框的弹窗
	function Dialog (opts){
		//初始化 如果插件存在，则删除
		$(".my_dialog").remove();
		//创建模板
		var $dialog = $("<div class='my_dialog"+opts.addClass+"'>"+
				"<div class='title' id='tit'>"+
					"<h3 class='t_h3'>"+opts.title+"</h3>"+
				"</div>"+
				"<div class='content'>"+
					"<div class='c_message'>"+
						"<span class='c_con'>"+opts.con+"</span>"+
						"<div style='clear:both'></div>"+
					"</div>"+
					"<div class='c_btn'>"+
						"<input type='button' value='确定' class='sure'/>"+
						"<input type='button' value='取消' class='cancel'/>"+
					"</div>"+
				"</div>"+
			"</div>");
		//追加模板
		$("body").append($dialog).append("<div class='my_yy'></div>");
		//调用 动态居中的算法
		center($dialog);
		//调用 浏览器窗口改变时居中
		inintEvent($dialog,opts,1);
	}
	// my_loading 弹窗
	function loading(opts){
		//初始化 如果插件存在，则删除
		$("#my_loading").remove();
		//创建插件模板
		var $loading = $("<div id='my_loading' class='my_loading"+opts.addClass+"'>"+opts.conter+"</div>");
		//追加模板
		$("body").append($loading);
		//居中定位插件
		center($loading);
		//浏览器窗口改变的时候居中定位
		inintEvent($loading,opts,2);
	}
	// 禁止横屏 安卓
	function hengshuping() {
        if (window.orientation == 90 || window.orientation == -90) {
           //横屏
          if(window.orientation == 90){
           	$("body").css({transform:rotate('-90deg')});
          } else {
           	$("body").css({transform:rotate('90deg')});
          }
        } else {
            //竖屏
            if(window.orientation == 180){
            	$("body").css({transform:rotate('-180deg')});
            } else {
            	$("body").css({transform:rotate('0deg')});
            }
        }
    }
    // 读取进度条
    function yy(opts){
		var html = 	'<div id="my_yy">'+
				'<img src='+opts.src+' width="32" height="32">'+
			'</div>';
		$('#body').append(html);
		var yy = $("#my_yy").find("img")
		var yh = $("#my_yy").find("img").height();
		var yw = $("#my_yy").find("img").width();
		var ww = $(window).width();
		var wh = $(window).height();
		var width = (ww - yw)/2;
		var height = (wh - yh)/2;
		$("#my_yy").find("img").css({"top":height,"left":width});
    }
    // 普通banner图切换
    function computer_banner_pt(opts){
    	//焦点图切换
		var index = 0;//索引
		var timer = null;//动画对象
		var length=$(opts.banner_id).find(opts.banner).length;//总数
		var playTime = opts.time*1000;//轮播时间
		//轮展图焦点切换
		$(opts.banner_sel_id).find(opts.banner_sel).mouseover(function(){
			if(timer)clearInterval(timer);
			var _index = $(this).index();//获取当前选中的 索引
			index = _index
			tm_banner_mian(index);
			
		}).mouseout(function(){
			tm_play_banner();
		});
		//初始化自动轮播；
		tm_paly_banner();

		//自动播放
		function tm_paly_banner(){
			timer = setInterval(function(){
				index++;
				if(index >= length){index = 0;}
				tm_banner_mian(index);
			},playTime);
		};
		//总控制方法
		function tm_banner_mian(index){
			//联动小按钮
			$(opts.banner_sel_id).find(opts.banner_sel).eq(index).addClass(opts.banner_sel_class).siblings().removeClass(opts.banner_sel_class);
			//联动背景
			$(opts.banner_id).find(opts.banner).eq(index).fadeIn("slow").siblings().hide();
		};
    }
    // 手风琴 banner图切换
    function computer_banner_sfq(opts){
		$(opts.banner_id).find(opts.banner).mouseenter(function(){
			$(this).stop().animate({width:opts.up_width},opts.time).siblings(opts.banner).stop().animate({width:opts.down_width},opts.time);
			$(this).find(opts.banner_img).addClass(opts.banner_img_sel).parents(opts.banner).siblings().find(opts.banner_img).removeClass(opts.banner_img_sel);
		});
		$(opts.banner).find(opts.banner).mouseleave(function(){
			$(this).stop().animate({width:opts.up_width},opts.time);
			$(this).find(opts.banner_img).addClass(opts.banner_img_sel).parents(opts.banner).siblings().find(opts.banner_img).removeClass(opts.banner_img_sel);
		});
    }
    // 移动端 banner切换
    function moblie_banner(opts){
    	// 定时时间
		var time = opts.time*1000;
		var $banner = $("#"+opts.bannerid).find(opts.banner);
		// banner 图下标
		var $index = $banner.index();
		// banner图长度
		var length = $banner.length;
		// 焦点下标
		var sel_index = $(opts.banner_sel_id).find(opts.banner_sel).index();
		// 手势动作 往左滑切换banner
		touch({
            "banner":opts.bannerid,
            "leftFn":leftFn
        });
		function left(){
			$index++;
			if($index >= length){
				$index = 0;
			}
			banenr_sel($banner,$index);
		}
		// 手势动作 往右滑切换banner
		touch({
            "banner":opts.bannerid,
            "rightFn":rightFn
        });
		function right(){
			$banner--;
			if($index < 0){
				$index = length -1;
			}
			banenr_sel($banner,$index);
		}
		// 自动切换下一张banner
		setInterval(function(){
			sel_index++;
			if(sel_index >= length){
				sel_index = 0;
			}
			banenr_sel($banner,sel_index);
		},time);
    }
    // 移动端 banner切换 无缝
    function moblie_banner_wf(opts){
		/*缓存banner对象*/
        var banner = $("#"+opts.bannerid);
        var img = opts.banner_img;
        var length = banner.find(img).length;
        // 当前展示的下标
        var index = 0;
        // 图片的宽度
        var img_width = banner.find(img).width();
        var img_height = banner.find(img).height();
        // 距离左边距离
        var banner_left = "";
        // 自动切换对象
        var timer = null;
        // 自动切换时间
        var time = opts.time;
        var li_html = banner.html();
        var sel_index = 0;
        var n_len = length+1;
        var box_width,box_height;
        // 动态设置 宽高
        if(opts.direction == "left"){
            box_width = img_width * 2 * length
            banner.find(img).parent().css({width:box_width});
        } else if(opts.direction == "top"){
            box_height = img_height * 2 * length
            banner.find(img).parent().css({height:box_height});
        }
        // 下一页
        touch({
            "banner":opts.bannerid,
            "leftFn":leftFn
        });
        function leftFn(){
            if(timer){clearInterval(timer)}
            index++;
            sel_index++;
            if(sel_index > length-1){
                sel_index = 0;
                $("#"+opts.bannerid).append(li_html);
            }
            banner_play(index,sel_index,length);
            if(time){
                banner_time();
            }
        }
        // 上一页
        touch({
            "banner":opts.bannerid,
            "rightFn":rightFn
        });
        function rightFn(){
            if(timer){clearInterval(timer)}
            if(opts.direction == 'left'){
                if(index == 0){
                    $("#"+opts.bannerid).prepend(li_html);
                    $("#"+opts.bannerid).css({left:-length*img_width});
                    index = length;
                }
            } else if(opts.direction == 'top'){
                if(index == 0){
                    $("#"+opts.bannerid).prepend(li_html);
                    $("#"+opts.bannerid).css({top:-length*img_height});
                    index = length;
                }
            }
            index--;
            sel_index--;
            if(sel_index < 0){
                sel_index = length-1;
            }
            if(index == 0){
                $("#"+opts.bannerid).find(opts.banner_img+":nth-child(n+"+n_len+")").remove();
            }
            banner_play(index,sel_index,length);
            if(time){
                banner_time();
            }
        }
        if(time){
            banner_time();
        }
        // 自动切换
        function banner_time(){
            timer = setInterval(function(){
                index++;
                sel_index++;
                if(sel_index > length-1){
                    sel_index = 0;
                    banner.append(li_html);
                }
                banner_play(index,sel_index,length);
            },time*1000);
        }
        // banner切换控制方法
        function banner_play($index,sel_index,length){
            if(opts.direction == 'left'){
                banner_left = $index * img_width *-1;
                banner.animate({left:banner_left},500,function(){
                    if($index == length){
                        banner.find(img+":nth-child(n+"+n_len+")").remove();
                        banner.css({left:0});
                        index =  0;
                    }
                });
            } else if(opts.direction == 'top'){
                banner_left = $index * img_height *-1;
                banner.animate({top:banner_left},500,function(){
                    if($index == length){
                        banner.find(img+":nth-child(n+"+n_len+")").remove();
                        banner.css({top:0});
                        index =  0;
                    }
                });
            } else {
                confirm("您没有选择切换方式");
            }
            $(opts.banner_sel_id).find(opts.banner_sel).eq(sel_index).addClass(opts.banner_sel_class).siblings().removeClass(opts.banner_sel_class);
        }
    }
	function backtime(year,month,day1,id,time){
		function datetime(year,month,day1,id){
			var now = new Date();
			var end = new Date(year,month-1,day1);
			var time = end.getTime() - now.getTime();
			var set = time / 1000;
			var hour = set / 3600;
			var min = set / 60;
			var day = Math.floor(set / (60 *60 *24));
			var lhour = Math.floor(hour % 24);
			var lmin = Math.floor(min % 60);
			var lsec = Math.floor(set % 60);
			var html = "<span style='color:red'>"+day+"</span>"+"天"+"<span style='color:red'>"+lhour+"</span>"+"小时"+"<span style='color:red'>"+lmin+"</span>"+"分钟"+"<span style='color:red'>"+lsec+"</span>"+"秒钟";
			$(id).html(html);
		}
		setInterval(function(){
			datetime(year,month,day1,id);
		},time*1000);
	}
    /*
		方法特效
    */
	//设置动态居中的算法
	function center($dialog){
		var width = $dialog.width();//计算loading的宽度
		var height = $dialog.height();//计算loading的高度
		var ww = $(window).width();//浏览器的可见宽度
		var wh = $(window).height();//浏览器的可见高度 
		var left = (ww - width) / 2;//计算距离左边的宽度 浏览器的宽度 - div的宽度 / 2 供绝对定位使用
		var top = (wh - height) / 2;//计算距离顶部的高度 浏览器的高度 - div的高度 / 2 供绝对定位使用
		$dialog.css({top:top,left:left});//设置坐标位置
	}
	// 浏览器窗口改变时居中
	function inintEvent($dialog,opts,number){
		//alert($dialog);
		$(window).resize(function(){
			center($dialog);
		});
		if(number == 2){
			// 点击弹出层，消失
			$dialog.click("click",function(){
				$(this).removeClass().addClass("my_loading");
				$(this).toggleClass(opts.removeClass);
			});
			//定时关闭
			if(opts.timeout){
				timer = setTimeout(function(){
					$dialog.trigger("click");
					$dialog.hide();
				},opts.timeout*1000);
			};
		} else {
			// 确定按钮
			$dialog.find("#sure").click(function(){
				var animateOut = opts.removeClass;
				$dialog.removeClass("animated").addClass(animateOut);
				$dialog.next().remove();
				$dialog.fadeOut(500,function(){
					$(this).remove();
				});
				// if(opts.callback){
				// 	opts.callback(true);
				// }
			});
			//取消按钮
			$dialog.find("#cancel").click(function(){
				var animateOut = opts.removeClass;
				$dialog.removeClass("animated").addClass(animateOut);
				$dialog.next().remove();
				$dialog.fadeOut(500,function(){
					$(this).remove();
				});
				// if(opts.callback){
				// 	opts.callback(false);
				// }
			});
		}
	}
    // 页面加载完成时，动画效果（随机出现）
	function my_animateIn(index){
		var animateIn = [];
		animateIn.push("animate bounce");//0
		animateIn.push("animate tada");//1
		animateIn.push("animate swing");//2
		animateIn.push("animate wobble");//3
		animateIn.push("animate flip");//4
		animateIn.push("animate flipInX");//5
		animateIn.push("animate flipInY");//6
		animateIn.push("animate fadeIn");//7
		animateIn.push("animate fadeInUp");//8
		animateIn.push("animate fadeInDown");//9
		animateIn.push("animate fadeInLeft");//10
		animateIn.push("animate fadeInRight");//11
		animateIn.push("animate fadeInUpBig");//12
		animateIn.push("animate fadeInDownBig");//13
		animateIn.push("animate fadeInLeftBig");//14
		animateIn.push("animate fadeInRightBig");//15
		animateIn.push("animated bounceIn");//16
		animateIn.push("animated bounceInUp");//17
		animateIn.push("animated bounceInDown");//18
		animateIn.push("animated bounceInLeft");//19
		animateIn.push("animated bounceInRight");//20
		animateIn.push("animated rotateIn");//21
		animateIn.push("animated rotateInUpLeft");//22
		animateIn.push("animated rotateInDownLeft");//23
		animateIn.push("animated rotateInUpRight");//24
		animateIn.push("animated rotateInDownRight");//25
		animateIn.push("animated rollIn");//26

		if(!index){
			var len = animateIn.length;
			var random = Math.floor(Math.random()*(len-1)+1);
			return animateIn[random];
		} else {
			return animateIn[index];
		}
	};
	//动画消失效果
	function my_animateOut(index){
		var animateOut = [];
		animateOut.push("animated fadeOut");//2
		animateOut.push("animated fadeOutUp");//3
		animateOut.push("animated fadeOutDown");//4
		animateOut.push("animated fadeOutLeft");//5
		animateOut.push("animated fadeOutRight");//6
		animateOut.push("animated fadeOutUpBig");//7
		animateOut.push("animated fadeOutDownBig");//8
		animateOut.push("animated fadeOutLeftBig");//9
		animateOut.push("animated fadeOutRightBig");//10
		animateOut.push("animated bounceOut");//11
		animateOut.push("animated bounceOutUp");//12
		animateOut.push("animated bounceOutDown");//13
		animateOut.push("animated bounceOutLeft");//14
		animateOut.push("animated bounceOutRight");//15
		animateOut.push("animated rotateOut");//16
		animateOut.push("animated rotateOutUpLeft");//17
		animateOut.push("animated rotateOutDownLeft");//18
		animateOut.push("animated rotateOutDownRight");//19
		animateOut.push("animated rollOut");//21

		if(!index){
			var len = animateOut.length;
			var r = Math.floor(Math.random()*(len-1)+1);
			return animateOut[r];
		}else{
			return animateOut[index];
		}
	};
	return {
		img_height : img_height,
		dialog : Dialog,
		loading : loading,
		hengshuping : hengshuping,
		yy : yy,
		computer_banner_sfq : computer_banner_sfq,
		computer_banner_pt : computer_banner_pt,
		moblie_banner : moblie_banner,
		moblie_banner_wf : moblie_banner_wf,
		backtime : backtime
	}
})();
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", my_plug.hengshuping, false);