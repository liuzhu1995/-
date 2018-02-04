$(function(){
    var $coupon = $('.coupon');
    var $lis =  $coupon.find('li');
    var len = Math.floor($coupon.width() / ($lis.width()+5));
    $lis.slice(len-1,8).hide();
    var $more = $('.more');
    len<8?$more.show():$more.hide();
    var $time_bar = $('.time_bar');
    var $tb_i = $time_bar.find('i');
    var top_num = ($time_bar.height() - $tb_i.height()) / 2;
    $tb_i.css('top',top_num);
    var $position_bar = $('.position_bar');
    var  $journey_nav = $('.journey_nav');
    $(window).scroll(function(){
        var st = $(this).scrollTop();
        st>=$journey_nav.offset().top + $journey_nav.height()?$position_bar.addClass('fixed'):$position_bar.removeClass('fixed');
    });
    var $jaH = $('.journey_arrange'),
        $proH = $('.product_char'),
        $cdH = $('.cost_detailed'),
        $rnH = $(".reserve_notice");
    $position_bar.find('li').eq(0).click(function(){
       $('body,html').animate({scrollTop:$jaH.offset().top - $journey_nav.height() },0);
     });
    $position_bar.find('li').eq(1).click(function(){
        $('body,html').animate({scrollTop:$proH.offset().top - $journey_nav.height() },0);
    });
    $position_bar.find('li').eq(2).click(function(){
        $('body,html').animate({scrollTop:$cdH.offset().top - $journey_nav.height()},0);
    });
    $position_bar.find('li').eq(3).click(function(){
        $('body,html').animate({scrollTop:$rnH.offset().top - $journey_nav.height()},0);
    });
    var colorarr = ['#87cc23','#56d7a1','#3ad191','#fa7d49','#ffb748','#fa6844','#85d52c','#45d9f1','#23cc77',
        '#ffbd59','#c67ff6','#ffb139','#4bc3fb','#29ce7b','#53c6fc','#4bc3fb','#fa5f39','#ff9c04','#ff833b',
        '#cc8cf7','#28cd7a','#fa5f39','#ffb139','#25cb86'];
    var $v_show = $('.v_show');
    var $service_list_bar = $('.service_list_bar');
    var icons= $('.m_header_nav ').find('i');
    $v_show.find('li').width($(window).width());
    $v_show.width($v_show.find('li').length * $(window).width());
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
    var height = $(window).height();
    $(window).scroll(function(){
        if($(document).scrollTop() >= height){
            $('.return-top').show();
        }else{
            $('.return-top').hide()
        }
    });
    $('.return-top').on('click',function(){
       $('body,html').animate({scrollTop:0},0)
    });
    $('.position_bar li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.navigation').click(function(){
        $(this).find('i').toggleClass('up');
        $('.m_header_nav ').toggle();
        $('body').toggleClass('stop_roll');
    })

})