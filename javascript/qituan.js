$(function(){
    var value = $('.adult_number');

//下单人数点击
    $('#left_btn').click(function(){
        var num = parseInt(value.val())-1;
        if(num>0){
            if(num<=2){
                $(this).removeClass('btn_color');
            }
            value.val(num);
        }
    });
    $('#right_btn').click(function(){
        var num = parseInt(value.val())+1;
        value.val(num);
        $('#left_btn').addClass('btn_color');
    });

    var c_value = $('.child_number');
    $('#c_left_btn').click(function(){
        var num = parseInt(c_value.val()-1);
        if(num>0){
            if(num<2){
                $(this).removeClass('btn_color');
            }
            c_value.val(num)
        }
    });
    $('#c_right_btn').click(function(){
        var num = parseInt(c_value.val())+1;
        c_value.val(num);
        $('#c_left_btn').addClass('btn_color');
    });
//给所有td添加点击事件
    $('table').on('click','td',function(){
        var num = $(this).find('div').length;
        if(num>1){
            $(this).addClass('c_f50').siblings().removeClass('c_f50').parent().siblings().find('td').removeClass('c_f50');
            $('.text_discount').show();
            $('.next_page').css('background','#f80');
        }
    });

    $('.dis_content').find('li').each(function(){
        var number = $(this).index();
        if(number>=2){
            $(this).hide();
        }
    });
    $('.dis_more').find('i').click(function(){
        $(this).toggleClass('up');
        $('.dis_content').find('li').toggle();
    });
    $('.next_page').click(function(){
        var len = $('.calendar').find('td.c_f50').length;
        if(len<1){
            $('.popup_bar').show();
        }
    });
    $('.confirm').click(function(){
        $('.popup_bar').hide();
    });
})