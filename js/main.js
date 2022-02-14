//햄버거 버튼을 클릭하면 
$('.open_gnb').click(function(){
    $(this).toggleClass('open');
    $('.gnb_area').slideToggle();
    $('.m_gnb_dimmed').fadeToggle(200);
});


//open_snb를 클릭하면 서브메ㄴ ㅠ 보임
$('.open_snb').click(function(){
    $(this).toggleClass('open');
});


$(window).resize(function(){
    winW = $(window).width();
    //모바일 상태에서 메뉴 슬라이드가 작동된 뒤 남아있는 style 속성을 없애준다
    if(winW > 1024){
        $('.gnb_area,.m_gnb_dimmed').removeAttr('style');   
        $('.open_gnb').removeClass('open');
    }

    //모바일 상태에서 .subInner부분이슬라이더로
    if(winW < 769){
        $('.type2, .type3, .type4').addClass('mySlider');
         //slick이 적용된 요소에서 발생하는 이벤트를 처리해 주는 함수(꼭 slick적용전 사용)
        $('.mySlider').on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
            var index = (currentSlide ? currentSlide : slick.currentSlide) + 1; 
            $('.slick-dots').html('<li>'+index+'/'+(slick.slideCount)+'</li>');
        //dot이 나올 자리에 삽입
        });
        $('.mySlider').slick({ dots:true });
    } else {
        $('.mySlider').slick('unslick');
        $('.type2, .type3, .type4').removeClass('mySlider');

    }


// location.reload();//화면 새로고침-위에거 다 지우고 이거 하나만 

});


//모바일 상태에서 .subInner부분이 슬라이더로 

winW = $(window).width();
if(winW < 769){
    $('.type2, .type3, .type4').addClass('mySlider');

    //slick이 적용된 요소에서 발생하는 이벤트를 처리해 주는 함수(꼭 slick 적용전 사용)

    $('.mySlider').on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
        var index = (currentSlide ? currentSlide : slick.currentSlide) + 1; 
        $('.slick-dots').html('<li>'+index+'/'+(slick.slideCount)+'</li>');
    //dot이 나올 자리에 삽입
    });

    $('.mySlider').slick({
        dots: true, 
    });

} else {
    $('.mySlider').slick('unslick');
    $('.type2, .type3, .type4').removeClass('mySlider');
};



var pos = [];  //각 섹션 top에서 부터 얼마나 떨어져 있냐를 알아내기 위한 변수 설정(배열)
for(var i=1 ; i<6 ; i++){
    pos.push(($('#section'+i).offset().top) - 160) ;
}
console.log(pos);



//인디게이터를 누르면 각 페이지(section)으로 이동한다
$('.indicator li a').on("click",function(e){
    e.preventDefault();  //a의 기본 기능을 못하게 한다.
    var targ = this.hash; //  #(해쉬) 값을 찾아서 변수에 넣는다    

    var sectionH =($(targ).offset().top) - 158; 
//각section의 위로부터의 거리에서 고정 헤더길이(160px)만큼 빼줌

    $('html,body').animate({scrollTop:sectionH},500);    
});

//모바일-인디게이터를 누르면 각 페이지(section)으로 이동한다
$('.m_indicator li a').on("click",function(e){
    e.preventDefault(); //a의 기본 기능을 못하게 한다.
    var targ = this.hash; //  #(해쉬) 값을 찾아서 변수에 넣는다    

    var sectionH =($(targ).offset().top) - 85; 
    //각section의 위로부터의 거리에서 고정 헤더길이(85px)만큼 빼줌

    $('html,body').animate({scrollTop:sectionH},500);   

    $('.m_indicator li').removeClass('on'); 
    $(this).parent('li').addClass('on');
    //클릭한 인디게이터 부모li에 on클라스 추가
});






var currenrP;  //현재 어떤 section부분에 있는지 알아오는 변수선언

$(window).scroll(function(){
    var scrollH = $(window).scrollTop(); //스크롤 된 거리  
    console.log(scrollH);

    //모바일-인디케이터,snb_wrap이 스크롤 되면 고정
    if(scrollH >=60){
        $('.snb_wrap, .m_indicator').addClass('stick');
    } else {
        $('.snb_wrap, .m_indicator').removeClass('stick');
    };
    
    //스크롤 시 인디케이터 색상 변환
    if(scrollH < pos[1]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(0).addClass('on');
        $('.indicator_prev').hide();
        currenrP = 0 ; 
    } 
    else if (scrollH >= pos[1] && scrollH < pos[2]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(1).addClass('on');
        $('.indicator_prev').show();
        currenrP = 1 ; 
    } 
    else if (scrollH >= pos[2] && scrollH < pos[3]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(2).addClass('on');
        $('.indicator_prev').show();
        $('.buy_car img').removeClass('ani');
        currenrP = 2 ; 
    } 
    else if (scrollH >= pos[3] && scrollH < pos[4]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(3).addClass('on');        
        $('.indicator_next').show();
        $('.indicator_prev').show();
        currenrP = 3 ; 
    }
    else {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(4).addClass('on');
        $('.indicator_next').hide();
        $('.buy_car img').addClass('ani');
        currenrP = 4 ; 
    }
});


//하나 위 section으로 스크롤 되게
$('.indicator_prev').on('click',function(){
    currenrP = currenrP - 1;
    $('html,body').animate({scrollTop:pos[currenrP]+2},500,'swing'); 
});
//하나 아래 section으로 스크롤 되게
$('.indicator_next').on('click',function(){
    currenrP = currenrP + 1;
    $('html,body').animate({scrollTop:pos[currenrP]+2},500,'swing'); 
});
