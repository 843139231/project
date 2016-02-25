# project 个人封装的组件集 pl_plug

目前集成了  对话框 dialog、消息框 loading、种种banner切换、禁止安卓横屏、进度条动画、图片按比例自适应 插件
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

持续不断更新