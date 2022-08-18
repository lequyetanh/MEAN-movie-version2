// const { $ } = require("protractor");

$(document).ready(function(){
  setTimeout(function () {
    var auto = setInterval(function(){
      $('#btn-next').trigger('click');
    },3000);

    $('.speed').click(function(event){
      $('.list_speed').addClass('speed-active').removeClass('list_speed');
    });

    $('.item-speed').click(function(event){
      let x= $('.item-speed').html();
      $('.speed').html(x);
      $('.speed-active').addClass('list_speed').removeClass('speed-active');
    });

    $('.setting').click(function(event){
      $('.list_resolution').addClass('resolution-active').removeClass('list_resolution');
    });

    $('.item-speed3').click(function(event){
      $('.resolution-active').addClass('list_resolution').removeClass('resolution-active');
    });

    $('.Subtitle').click(function(event){
      $('.list_subtitle').addClass('subtitle-active').removeClass('list_subtitle');
    });

    $('.item-speed2').click(function(event){
      $('.subtitle-active').addClass('list_subtitle').removeClass('subtitle-active');
    });

    $('#btn-next').click(function(event) {
      var slide_sau = $('.active').next();
      var nut_sau = $('.active_nut').next();
      if(slide_sau.length!=0){
        $('.active').addClass('bienmatbentrai').one('webkitAnimationEnd',function(event){
          $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('active');
        });
        slide_sau.addClass('active').addClass('divaobenphai').one('webkitAnimationEnd',function(event){
          $('.divaobenphai').removeClass('divaobenphai');
        });
        $('ul li').removeClass('active_nut');
        nut_sau.addClass('active_nut');
      }
      else{
        $('.active').addClass('bienmatbentrai').one('webkitAnimationEnd',function(event){
          $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('active');
        });
        $('.slide:first-child').addClass('active').addClass('divaobenphai').one('webkitAnimationEnd',function(event){
          $('.divaobenphai').removeClass('divaobenphai');
        });
        $('ul li').removeClass('active_nut');
        $('ul li:first-child').addClass('active_nut');
      }
    });

    $('#btn-prev').click(function(event) {
      var slide_truoc = $('.active').prev();
      var nut_truoc = $('.active_nut').prev();
      if(slide_truoc.length!=0){
        $('.active').addClass('bienmatbenphai').one('webkitAnimationEnd',function(event){
          $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('active');
        });
        slide_truoc.addClass('active').addClass('divaobentrai').one('webkitAnimationEnd',function(event){
          $('.divaobentrai').removeClass('divaobentrai');
        });
        $('ul li').removeClass('active_nut');
        nut_truoc.addClass('active_nut');
      }
      else{
        $('.active').addClass('bienmatbenphai').one('webkitAnimationEnd',function(event){
          $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('active');
        });
        $('.slide:last-child').addClass('active').addClass('divaobentrai').one('webkitAnimationEnd',function(event){
          $('.divaobentrai').removeClass('divaobentrai');
        });
        $('ul li').removeClass('active_nut');
        $('ul li:last-child').addClass('active_nut');
      }
    });

    $('ul li').click(function(event){
      console.log("12");
      var current_nut = $('.active_nut').index()+1;
      var click_nut = $(this).index()+1;
      $('ul li').removeClass('active_nut');
      $(this).addClass('active_nut');
      if(click_nut>current_nut){
        $('.active').addClass('bienmatbentrai').one('webkitAnimationEnd',function(event){
          $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('active');
        });
        $('.slide:nth-child('+click_nut+')').addClass('active').addClass('divaobenphai').one('webkitAnimationEnd',function(event){
          $('.divaobenphai').removeClass('divaobenphai');
        });
      }
      if(click_nut<current_nut){
        $('.active').addClass('bienmatbenphai').one('webkitAnimationEnd',function(event){
          $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('active');
        });
        $('.slide:nth-child('+click_nut+')').addClass('active').addClass('divaobentrai').one('webkitAnimationEnd',function(event){
          $('.divaobentrai').removeClass('divaobentrai');
        });
      }
    });

  },2000);
});

