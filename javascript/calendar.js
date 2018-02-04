$(function(){
    var i,$tabs = $('.tabs').find('li.tab'),
        adultPrice = [],
        childPrice = [],
        mydate = new Date(),
        year = mydate.getFullYear(), //获取完整的年份(4位,1970-????)
        month = mydate.getMonth(); //获取当前月份(0-11,0代表1月)
        $('.tabs').width($tabs.width() * $tabs.length);
    //获取当前月份的天数
    function getNowdays(year,month){
        var nowDate = new Date(year,month,0);
        return nowDate.getDate();
    }
    //改变数字的位数
    function fix(num, length) {
        return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    }

    //当月的天数
    var monthLength = getNowdays(year,month+1);
    //今日是几号
    var nowDay = mydate.getDate();
    //获取这个月第一天是周几
    var firstDay = new Date(year,month,1).getDay();
//   确定表格需要的行数
    var row_num = parseInt(Math.ceil((monthLength+firstDay) / 7));
    var $tbody= $('.calendar table tbody');
    autoPlay(monthLength,nowDay,firstDay,row_num,month,year,month+1);
    function autoPlay(monthLength,nowDay,firstDay,row_num,len,nowYear,nowMonth){
        for(i=0;i<row_num;i++){
            var tr = document.createElement('tr');
            for(var j=0;j<7;j++){
                var td = document.createElement('td');
                var divOne = document.createElement('div');
                var divTwo = document.createElement('div');
                var index = i * 7 + j;
                var date = index - firstDay+1;
                if(date<=0||date>monthLength){
                    date ='';
                    divOne.innerText = date;
                    td.appendChild(divOne);
                    tr.appendChild(td);
                }else {
                    if(len == month){
                        if(date <nowDay){
                            divOne.innerText = date;
                            divOne.className = 'c_gray';
                            td.appendChild(divOne);
                            tr.appendChild(td);
                        }else if(date == nowDay){
                            divOne.className = 'color_f50';
                            divOne.innerText = '今天';
                            td.appendChild(divOne);
                            tr.appendChild(td);
                        }else{
                            divOne.innerText = date;
                            td.appendChild(divOne);
                            divTwo.className = 'price';
                            td.appendChild(divTwo);
                            td.dataset.key =nowYear+'-'+ nowMonth +'-'+fix(date,2);
                            tr.appendChild(td);
                        }
                    }else{
                        divOne.innerText = date;
                        td.appendChild(divOne);
                        divTwo.className = 'price';
                        td.appendChild(divTwo);
                        td.dataset.key =nowYear +'-'+nowMonth +'-'+fix(date,2);
                        tr.appendChild(td);
                    }
                }
            }
            $tbody.append(tr);
        }
    }

    $tabs.each(function(){
        $(this).click(function(){
            var index = $(this).index();
            ani(index);
            //点击月份调用函数生成日历
            $tbody.find($('tr:not(.week)')).remove();
            $(this).addClass('act').siblings().removeClass('act');
            var data = (this.dataset.key).toString();
            var year = data.substring(0,4);
            var months = data.substring(5,7);
            //当月的天数
            var monthLength = getNowdays(year,months);
            //今日是几号
            var nowDay = mydate.getDate();
            //获取这个月第一天是周几
            var firstDay = new Date(year,months-1,1).getDay();
            //   确定表格需要的行数
            var row_num = parseInt(Math.ceil((monthLength+firstDay)/7));
            autoPlay(monthLength,nowDay,firstDay,row_num,months-1,year,months);
            prepend()
        })
    });
    //    获取josn数据
    prepend();
    function prepend(){
        var val= JSON.parse($('#hidDateArr').val());
        var tds = $('tbody td');
        for(var i=0;i<tds.length;i++){
            var key = tds[i].getAttribute('data-key');
            if(key != null){
                $.each(val,function (j,t) {
                    if(t.date == key){
                        adultPrice.push(t.price);
                        childPrice.push(t.child);
                        $(tds[i]).attr('price',t.price);
                        $(tds[i]).attr('child',t.child);
                        $(tds[i]).find('.price').prepend("<span class='color_f50'>"+t.price+"</span> 起");
                    }
                })
            }
        }
    }
    adultPrice = adultPrice.sort();
    childPrice = childPrice.sort();

    //月份点击动画
    function ani(index){
        var $tab = $('.tabs');
        var tabWidth = parseInt($tab.width());
        var pageWidth = parseInt($(window).width());
        var num = parseInt(Math.floor(pageWidth / $tabs.width()))-1;
        var width = tabWidth - pageWidth;
        var last = $tabs.length -2;
        if(tabWidth>=pageWidth){
            if(index>=num){
                if(index >=last){
                    $tab.animate({left:-width + 'px'},0)
                }else{
                    $tab.animate({left:-110 * (index - 1) + 'px'},0)
                }
            }else{
                $tab.animate({left:'0px'},0)
            }
        }
    }
    //给月份添加自定义的data属性
    console.log(adultPrice);
    var num = 0;
    var yearNum = 1;
    for(i=0;i<$tabs.length;i++){
        if(month+1+i <=12) {
            $tabs[i].dataset.key = (year) + '-' + (month + 1 + i);
            $tabs[i].innerHTML = "<div class='wrap'>"+ (month + 1 + i) +'月'+"</div>"
        }else{
            if(num >= 12){
                num= 0;
                yearNum+=1;
            }
            num+=1;
            $tabs[i].dataset.key = (year+yearNum) + '-' + (num);
            $tabs[i].innerHTML = "<div class='wrap'>"+ num +'月'+"</div>"
        }
    }



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