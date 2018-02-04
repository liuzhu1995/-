$(function(){
    var colorarr = ['#87cc23','#56d7a1','#3ad191','#fa7d49','#ffb748','#fa6844','#85d52c','#45d9f1','#23cc77',
        '#ffbd59','#c67ff6','#ffb139','#4bc3fb','#29ce7b','#53c6fc','#4bc3fb','#fa5f39','#ff9c04','#ff833b',
        '#cc8cf7','#28cd7a','#fa5f39','#ffb139','#25cb86'];
    var $v_show = $('.v_show');
    var $service_list_bar = $('.service_list_bar');
    var icons= $('.m_header_nav ').find('i');
    $v_show.find('li').width($(window).width());
    $v_show.width($v_show.find('li').length * $(window).width());
    $('.hot-place').width($(window).width());
    $('.search_content').height($(window).height()-50);
    $service_list_bar.find('li').width(Math.ceil($service_list_bar.width() * 0.22));
    $('.service_list').width($service_list_bar.find('li').width() * $service_list_bar.find('li').length);
    $('.m_header_nav').height($(window).height());
    var $products =  $('.products');
    var $style = $('.style');
    $style.find('li').width(Math.ceil($products.width() * 0.28));
    $style.width($style.find('li').width() * $style.find('li').length);
    var spans = $('#pagenavi').find('span');
    var $v_container =  $('.v_container');
    var page =1;
    var len = Math.floor($v_show.width() / $v_container.width());
    var time;
    $.each(icons,function(i){
        $(this).css('color',colorarr[i])
    });
    for(var i=0;i<spans.length;i++){
        spans[i].onclick = (function show(i){
            stop();
            return function(){
                page = i+1;
                if(!$v_show.is(":animated")){
                    spans.eq(i).addClass('current').siblings().removeClass('current');
                    $v_show.animate({left:'-' + $v_container.width() * i},'slow');
                }
            };
        })(i)
    }
    //轮播图
    function show(){
        if(page <len ){
            if(!$v_show.is(":animated")){
                page += 1;
                spans.eq(page-1).addClass('current').siblings().removeClass('current');
                $v_show.animate({left:'-=' + ($v_container.width())},'slow');
            }
        }else{
            spans.eq(0).addClass('current').siblings().removeClass('current');
            $v_show.animate({left:'0px'},'slow');
            page = 1;
        }
    }
    $('.exhibition').find('a').width($(window).width()/ 2 - 20 );
    //自动播放
    function play(){
        time = setTimeout(function(){
            show();
            play()
        },2000)
    }
    //清除定时器
    function stop(){
        clearTimeout(time);
    }
    play();
    $v_container.bind('touchstart',function(){
       stop()
    });
    $v_container.bind('touchend',function(){
        play()
    });
    //左右拖拽效果
   ani('v_container');
    function ani(element){
        var oDiv = document.getElementById(element);
        var oUl  = oDiv.children[0];
        var aLi  = oUl.children;
        var length  = aLi.length;
        oUl.addEventListener("touchstart",function(ev){
            //取消运动
            oUl.style.transition = "none";
            var disX = ev.targetTouches[0].pageX - oUl.offsetLeft;
            function fnMove(ev){
                oUl.style.left = ev.targetTouches[0].pageX - disX + "px";
            }
            function fnEnd(){
                oUl.removeEventListener("touchmove",fnMove,false);
                oUl.removeEventListener("touchend",fnEnd,false);
                //确定显示第几个
                var n = Math.round(-oUl.offsetLeft/aLi[0].offsetWidth);
                if(n < 0){
                    n = 0;
                } else if(n >= length){
                    n = length-1;
                }
                page = n+1;
                spans.eq(page-1).addClass('current').siblings().removeClass('current');
                //添加运动 transition:0.7s all ease;
                oUl.style.transition = "0.7s all ease";
                oUl.style.left = -n*aLi[0].offsetWidth + "px";
            }
            oUl.addEventListener("touchmove",fnMove,false);
            oUl.addEventListener("touchend",fnEnd,false);
            ev.preventDefault();
        },false);
    }

// 国内服务导航条
    mate('service_list_bar');
    mate('product_wrap');
    function mate(element){
        var oDiv = document.getElementById(element);
        var oUl  = oDiv.children[0];
        var aLi  = oUl.children;
        var length  = aLi.length;
        var num;
        oUl.addEventListener("touchstart",function(ev){
            oUl.style.transition = "none";
            var disX = ev.targetTouches[0].pageX - oUl.offsetLeft;
            function fnMove(ev){
                num = ev.targetTouches[0].pageX - disX;
                oUl.style.left = ev.targetTouches[0].pageX - disX + "px";
            }
            function fnEnd(){
                oUl.removeEventListener("touchmove",fnMove,false);
                oUl.removeEventListener("touchend",fnEnd,false);
                //确定显示第几个
                var n = Math.round(-oUl.offsetLeft/aLi[0].offsetWidth);
                var num = $(oUl).width() - $(window).width();
                if(n < 0){
                    n = 0;
                    oUl.style.left = '0px';
                } else if(n >=length/2){
                    oUl.style.left = (-num) + "px";
                }
                //添加运动 transition:0.7s all ease;
                oUl.style.transition = "0.7s all ease";
            }
            oUl.addEventListener("touchmove",fnMove,false);
            oUl.addEventListener("touchend",fnEnd,false);
            ev.preventDefault();
        },false)
    }


    //搜索
    $('.go_to_search').find('.fa-search').click(function(){
        $(this).parents('.m_header').siblings().hide();
        $('.m_header_search').show();
        $('.search_main').find('input').focus()
    });
    $('.search_cancel').click(function(){
        $(this).parents('.m_header').siblings().show();
       $('.m_header_search').hide()
    });
//导航
    $('.navigation').click(function(){
        $(this).find('i').toggleClass('up');
        $('.m_header_nav ').toggle();
        $('body').toggleClass('stop_roll');
    });

    var $hot_place = $('.domestic_hot_place');
    $hot_place.width($(window).width() -  30);
    var height = $(window).height();
   $(window).scroll(function(){
       if($(document).scrollTop()>=height){
           $('.return-top').show();
       }else{
           $('.return-top').hide();
       }
   });
//    返回顶部按钮
    $('.return-top').click(function(){
        $('body,html').animate({scrollTop:0},0);
    })


})