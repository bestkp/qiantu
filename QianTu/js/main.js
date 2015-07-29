$(window).on('load',function(){
   //瀑布流布局
    var $boxs=$('#designerlover div.picbox');
    var w=$boxs.eq(0).outerWidth();
    var HArr=[];
    $boxs.each(function(index,val){
        var h=$boxs.eq(index).outerHeight();
        if(index<4){
            HArr[index]=h;
        }else{
            var minH=Math.min.apply(null,HArr);
            var HIndex= $.inArray(minH,HArr);
            $(val).css({
                'position':'absolute',
                'top':minH+71+'px',
                'left':HIndex*w+'px'
            });
            HArr[HIndex]+=$boxs.eq(index).outerHeight();
        }

    });
    $('#designerlover').height(Math.max.apply(null,HArr)+71);
    //轮播图
    tab();
    //autoTab();
});

function tab(){
    var $tab=$('#tab>div');
    var slideArr=$('#tab .small_slide div');
    var inow=0;
    var zIndex=1;
    var picsArr=$('#tab>div:lt(7)');
    var isclick=false;
    var timer=null;
    var inext=0;
    $('#tab').mouseover(function(){
       $tab.eq(7).show();
        $tab.eq(8).show();
    });
    $('#tab').mouseout(function(){
        $tab.eq(7).hide();
        $tab.eq(8).hide();
    });
    $tab.eq(7).mouseover(function(){
       $(this).children("div").css('background','url("../QianTu/images/slide-arrow.png") no-repeat -140px 0');
    });
    $tab.eq(7).mouseout(function(){
        $(this).children("div").css('background','url("../QianTu/images/slide-arrow.png") no-repeat 0px 0');
    });
    $tab.eq(8).mouseover(function(){
        $(this).children("div").css('background','url("../QianTu/images/slide-arrow.png") no-repeat -210px 0');
    });
    $tab.eq(8).mouseout(function(){
        $(this).children("div").css('background','url("../QianTu/images/slide-arrow.png") no-repeat -70px 0');
    });


    slideArr.each(function(index,value){
        if($(value).hasClass('active'))
        {
            inow=index;
        }
        slideArr.eq(index).mouseover(function(){
            isclick=false;
            $(this).addClass('active');
        });
        slideArr.eq(index).mouseout(function(){
            if(isclick==false) {
                if (index != inow) {
                    $(this).removeClass('active');
                }
            }
        });

        slideArr.eq(index).click(function(){
            slideArr.each(function(i,val){
                $(val).removeClass('active');
            });
            isclick=true;
            $(this).addClass('active');
            zIndex++;
            $(picsArr[index]).css({
               'z-index':zIndex
            });
            inow=index;

        });

    });
    //console.log(inow);
    timer=setInterval(function(){
        if(inow==6){
            inext=0;
            inow=0;

        }else{
            inext=inow+1;
            inow++;
        }
        zIndex++;
        $(picsArr[inext]).css({
            'z-index':zIndex
        });
        $(picsArr[inext]).slideDown();
        slideArr.eq(inow).addClass('active');
        slideArr.eq(inow-1).removeClass('active');
        /*if(inow==6){
            inow=0;
        }else{
            inow++;
        }*/
    },3000);



}
