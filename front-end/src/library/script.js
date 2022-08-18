$(document).ready(function(){
 $(".videoPlayer").toArray().forEach(function(videoPlayer){

  // video
  var video= $(videoPlayer).find("video")[0]; //video phát

  // top controls
  var startTime= $(videoPlayer).find(".startTime");//thời gian bắt đầu
  var playerSeekBar= $(videoPlayer).find(".topControls .seekbar");//thanh seekbar chạy
  var playerProgressBar = $(videoPlayer).find(".topControls .seekbar .progressBar");
  var endTime= $(videoPlayer).find(".endTime");//thời gian kết thúc

  // volume
  var volumeSeekBar= $(videoPlayer).find(".volume .seekbar");//thanh volume tất cả
  var volumeProgreeBar= $(videoPlayer).find(".volume .seekbar .progressBar");//thanh volume đã chạy
  var volumePercentage=$(videoPlayer).find(".volume .percentage");

  // playback
  var fastBackward=$(videoPlayer).find(".backward");//nút tua lại
  var playPauseBtn=$(videoPlayer).find(".playPauseBtn");//nút tạm dừng và tiếp tục
  var fastForward=$(videoPlayer).find(".forward");//nút tua đi

  // fullscreen
  var fullscreen= $(videoPlayer).find(".fullscreen");//nút full màn hình

  var currentDuration,    //thoi gian hien tai
      endDuration,        //thoi gian ket thuc
      seekBarPercentage,  //phần trăm âm lượng
      interval,
      completeDuration;   //thoi gian toan bo


  $(playPauseBtn).on("click",function(){
    completeDuration=video.duration;//gán biến completeDuration bằng toàn bộ thời gian của video
    endDuration=calculateDuration(completeDuration);//gán biến endDuration bằng
    if(endDuration.hours==0){
      endTime.text(`${endDuration.minutes}:${endDuration.seconds}`);
    }
    else{
      endTime.text(`${endDuration.hours}:${endDuration.minutes}:${endDuration.seconds}`);
    }
    console.log(endDuration);

    if(playPauseBtn.hasClass("play")){
      playPauseBtn.addClass("pause").removeClass("play");
      video.play();
      $(videoPlayer).addClass("isPlaying");
    }
    else if(playPauseBtn.hasClass("pause")){
      video.pause();
      playPauseBtn.addClass("play").removeClass("pause");
      $(videoPlayer).removeClass("isPlaying");
    }
    interval=setInterval(function(){
      if(!video.paused){
        updateSeekbar();
      }
      if(video.paused){
        clearInterval(interval);
      }
      if(video.ended){
        clearInterval(interval);
        $(playerProgressBar).css("width","100%");
        playPauseBtn.removeClass("pause").addClass("play");
        $(videoPlayer).removeClass("isPlaying").addClass("showControls");
      }
    },500);

  });


  fastBackward.on("click",function(){
    if(!video.ended && completeDuration !=undefined){
      video.currentTime>0 && video.currentTime<video.duration ? (video.currentTime-=10):0;
    }
  });

  fastForward.on("click",function(){
    if(!video.ended && completeDuration !=undefined){
      video.currentTime>0 && video.currentTime<video.duration ? (video.currentTime+=10):0;
    }
  });

  playerSeekBar.on("click",function(e){
    console.log("run");
    if(!video.ended && completeDuration !=undefined){
      var seekPosition=e.pageX - $(playerSeekBar).offset().left;
      if(seekPosition>=0 && seekPosition<$(playerSeekBar).outerWidth()){
        video.currentTime=(seekPosition*completeDuration)/$(playerSeekBar).outerWidth();
        updateSeekbar();
      }
    }
  });

  volumeSeekBar.on("click",function(e){
    // console.log("volume");
    var volumePosition=e.pageX-$(volumeSeekBar).offset().left;
    var videoVolume= volumePosition/$(volumeSeekBar).outerWidth();
    if(videoVolume>=0 && videoVolume<=1){
      video.volume=videoVolume;
      // console.log(videoVolume);
      volumeProgreeBar.css("width",videoVolume*100+"%");
      volumePercentage.text(Math.floor(videoVolume*100)+"%");
    }
  });

  fullscreen.on("click",function(){
    if(video.requestFullscreen){
      video.requestFullscreen();
    }
    else if(video.webkitRequestFullscreen){
      video.webkitRequestFullscreen();
    }
  });

  $(videoPlayer).hover(function(){

      $(videoPlayer).addClass("showControls");
      $(videoPlayer).removeClass("isPlaying");

  },function(){
    setTimeout(function(){
        $(videoPlayer).removeClass("showControls");
        $(videoPlayer).addClass("isPlaying");
    },2000);
  });

  // console.log("fuckyou2");

  var updateSeekbar=function(){
    seekBarPercentage=getPercentage(video.currentTime, video.duration);
    currentDuration=calculateDuration(video.currentTime);
    if(endDuration.hours==0)
    {
      startTime.text(
        `${currentDuration.minutes}:${currentDuration.seconds}`
      );
    }
    else{
      startTime.text(
        `${currentDuration.hours}:${currentDuration.minutes}:${currentDuration.seconds}`
      );
    }

    $(playerProgressBar).css("width",seekBarPercentage + "%");
  };

 });

 var getPercentage=function(presentTime,totallength){
   var calPercentage= (presentTime/totallength) *100;
   return parseFloat(calPercentage.toString());
 };

 var calculateDuration=function(duration){
   var seconds=parseInt(duration%60);//giây sẽ bằng toàn bộ thời gian chia lấy dư cho 60
   var minutes=parseInt((duration%3600)/60);// phút sẽ bằng toàn bộ thời gian chia lấy dư cho 3600 và chia lấy phần nguyên cho 60
   var hours=parseInt(duration/3600);//giờ sẽ bằng thời gian chia cho 3600 lấy phần nguyên
   return{
     hours:pad(hours),
     minutes:pad(minutes.toFixed()),
     seconds:pad(seconds.toFixed())
   };
 };

 var pad= function(number){
   if(number>0 && number<10){
     return"0"+number;
   }
   else{
     return number;
   }
 };

});
