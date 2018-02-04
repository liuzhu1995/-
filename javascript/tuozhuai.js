var $products =  $('.products');
var $m_header = $('.m_header');
$(window).scroll(function () {
    var st = $(this).scrollTop();
    st>=50?$m_header.addClass('fixed'):$m_header.removeClass('fixed');

});
