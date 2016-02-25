/*
    seamless_banner.js V1.0 special .@CopyRight2015 http://www.panweijie.com/
    {
        移动端 banner切换 无缝
        banner({bannerid:"bannerid",banner_img:"banner_img",time:"time",banner_sel_id:"banner_sel_id",banner_sel:"banner_sel",banner_sel_class:"banner_sel_class",direction:"direction"});
        bannerid: 装载banner图的容器 id、class、标签
        banner_img: banner图的标签 class、标签
        time: 自动切换的时间 以秒为单位
        banner_sel_id: 装载banner焦点图的容器 id、class、标签
        banner_sel: banner焦点图 class、标签
        banner_sel_class: 表示 banner焦点图 选中状态 class
        direction : 左右滑动、上下滑动  left、top
        注：
            需要配合 touch.js 类库来进行使用 由 panweijie.com提供
    }
 */
var pl_plug = (function(){
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
    return {
        banner : moblie_banner_wf
    }
})();