$(function(){
     var $h_input = $('#h_input');
    $('.h_left_btn').on('click',function(){
        if($h_input.val() >1){
            var num = parseInt($h_input.val()) -1 ;
            $h_input.val(num);
        }
    });
    $('.h_right_btn').on('click',function(){
        var num = parseInt($h_input.val()) +1;
        $h_input.val(num);
    });
    var height = parseInt($(window).height())/2;
    $(window).scroll(function(){
        if($(document).scrollTop() >= height){
            $('.return-top').show()
        }else{
            $('.return-top').hide();
        }
    });
    $('.return-top').click(function(){
       $(document).scrollTop(0);
    });
    var $selece = $('.selece');
    $selece.each(function(){
      $(this).click(function(){

          var len = $(this).children().length;
          if(len>=1){
              $(this).html('')
                  .css('border-color','#d4d4d4');
          }else{
              $(this).html('<i class="fa fa-check-square" aria-hidden="true"></i>')
                  .css('border-color','#fff')
          }
      })
    });
    //验证手机号码
    function vPhoneNumber(value){
        var regPhone = /^(13[0-9]|15[012356789]|18[0123456789]|147|145|17[0-9])\d{8}$/;
        if(regPhone.test(value)){
            return true;
        }else{
            $('#tips').show().delay (800).fadeOut ().html('请输入正确的手机号码');
        }
    }
    $('#phone').blur(function(){
        vPhoneNumber($(this).val());
    })
//    验证姓名
    function vName(email){
        var $email = email.val();
        if($email.length == ''){
            $('#tips').show().delay (800).fadeOut ().html('请填写联系人姓名');
        }else{
            if($email.length < 2){
                $('#tips').show().delay (800).fadeOut ().html('预定人姓名长度为2-20个')
            }else{
                return true;
            }
        }
    }
    $('#cname').blur(function(){
        vName($(this))
    })
//    验证email
    function vEmail(value){
        var $value = value.val();
        var regexp =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(regexp.test($value)){
            return true;
        }else{
            $('#tips').show().delay (800).fadeOut ().html('请正确填写您的邮箱')
        }
    }
    $('#cemail').blur(function(){
        vEmail($(this))
    })

//    常用旅客信息页面
    $('.aci_middle').click(function(){
        var select_icon = $('.select_icon');
       if(select_icon.children().length<1){
           select_icon.css('border-color','#fff').html('<i class="fa' +
               ' fa-check-square"></i>')
       }else{
           select_icon.css('border-color','#33bd61').html('');
       }
    });
    show();
    function show(){
        $('.people_info li').slice(5).hide()
    }
    $('#select').change(function(){
        var val = $(this).val();
        if(val == '护照') {
            show();
            $('.people_info li').slice(0, -1).show();
        }
        if(val == '港澳通行证' || val=="台湾通行证"){
            show();
            $('.people_info li').slice().show();
        }
        if(val =='军官证' || val== '台胞证'|| val == "回乡证" || val == '户口簿' || val=="出生证明"){
            show();
            $('#gender').show();
            $('#birthday').show();
        }
    });
    $('.add_name span').click(function(){
       $(this).toggleClass('a_select')
    })
})