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
