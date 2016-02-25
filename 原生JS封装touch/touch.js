/*
	使用方法
	touch({
		banner:'banner',
		rotate:'left',
		leftFn:left,
		rightFn:right
	});
	function left(){
		$("#banner").find(".one").fadeOut().siblings('.two').fadeIn();
	}
	function right(){
		$("#banner").find(".two").fadeOut().siblings('.one').fadeIn();
	}
*/
;(function(){
	var touch = function (opts){
		var startX,startY,x,y,startTime,endTime;
		var banner = document.getElementById(opts.banner);
		init();
		function init(){
			banner.addEventListener("touchstart",touchstart,false);
			banner.addEventListener("touchmove", touchmover, false);
			banner.addEventListener("touchend", touchend, false);
		}
		/*开始触屏*/
		function touchstart (event){
			event.preventDefault();
			if(!event.touches.length)return;
			var touch = event.touches[0];
			startX = touch.pageX;
			startY = touch.pageY;
			startTime = new Date()*1;
			//event.stopPropagation();
		};
		/*触屏移动*/
		function touchmover (event){
			if(!event.touches.length)return;
			var touch = event.touches[0];
			x = touch.pageX - startX;
			y = touch.pageY - startY;
		};
		function touchend (event){
			endTime = new Date()*1;
			if(Math.abs(x) > Math.abs(y)){
				/*根据滑动时间来进行判断，是否为快速滑动*/
				if((endTime - startTime) <= 200){
					if(x >= 50){
						if(opts.rightFn)opts.rightFn();
					}
					if(x <= -50){
						if(opts.leftFn)opts.leftFn();
					}
				} else {
					if(x >= 200){
						if(opts.rightFn)opts.rightFn();
					}
					if(x <= -200){
						if(opts.leftFn)opts.leftFn();
					}
				}
			}
		}
	};
	window['touch'] = touch;
})();