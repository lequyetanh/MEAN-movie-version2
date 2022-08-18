// const { $ } = require("protractor");

$(document).ready(function () {
  setTimeout(() => { //nếu không có cái này thì sẽ bị lỗi do máy tính cho dù có load dc console.log(1) thì cũng ko load đc các hàm bắt sự kiện click
    console.log("1");
    var mouseIsDown = false;

    var getPercentage = function (presentTime, totallength) {
      var calPercentage = (presentTime / totallength) * 100;
      return parseFloat(calPercentage.toString());
    };

    var calculateDuration = function (duration) {
      var seconds = parseInt(duration % 60); //giây sẽ bằng toàn bộ thời gian chia lấy dư cho 60
      var minutes = parseInt((duration % 3600) / 60); // phút sẽ bằng toàn bộ thời gian chia lấy dư cho 3600 và chia lấy phần nguyên cho 60
      var hours = parseInt(duration / 3600); //giờ sẽ bằng thời gian chia cho 3600 lấy phần nguyên
      return {
        hours: pad(hours),
        minutes: pad(minutes.toFixed()),
        seconds: pad(seconds.toFixed())
      };
    };

    var pad = function (number) {
      if (number > 0 && number < 10) {
        return "0" + number;
      }
      if (number == 0) {
        return "0" + number;
      } else {
        return number;
      }
    };

    $(".videoPlayer").toArray().forEach(function (videoPlayer) {

      // video
      var video = $(videoPlayer).find("video")[0]; //video phát

      var videoFrame = $(videoPlayer).find(".videoFrame");
      // top controls
      var startTime = $(videoPlayer).find(".startTime"); //thời gian bắt đầu
      var playerSeekBar = $(videoPlayer).find(".topControls .seekbar"); //thanh seekbar chạy
      var playerProgressBar = $(videoPlayer).find(".topControls .seekbar .progressBar");
      var endTime = $(videoPlayer).find(".endTime"); //thời gian kết thúc

      // volume
      var volumeContainer = $(videoPlayer).find(".volume");
      var volumeSeekBar = $(videoPlayer).find(".volume .seekbar"); //thanh volume tất cả
      var volumeProgreeBar = $(videoPlayer).find(".volume .seekbar .progressBar"); //thanh volume đã chạy
      var volumePercentage = $(videoPlayer).find(".volume .percentage");
      var clickUnMute = $(videoPlayer).find(".fa-volume-mute");

      // playback
      var fastBackward = $(videoPlayer).find(".backward"); //nút tua lại
      var playPauseBtn = $(videoPlayer).find(".playPauseBtn"); //nút tạm dừng và tiếp tục
      var playCenter = $(videoPlayer).find(".play-center");
      var fastForward = $(videoPlayer).find(".forward"); //nút tua đi
      var speedVideo = $(videoPlayer).find(".item-speed");

      // fullscreen
      var fullscreen = $(videoPlayer).find(".fullscreen"); //nút full màn hình

      var currentDuration, //thoi gian hien tai
        endDuration, //thoi gian ket thuc
        seekBarPercentage, //phần trăm âm lượng
        interval,
        newInterval,
        completeDuration; //thoi gian toan bo

      playPauseBtn.on("click", function () {
        completeDuration = video.duration; //gán biến completeDuration bằng toàn bộ thời gian của video
        // console.log(video.duration);
        endDuration = calculateDuration(completeDuration); //gán biến endDuration bằng
        if (endDuration.hours < 1) {
          endTime.text(`${endDuration.minutes}:${endDuration.seconds}`);
        } else {
          endTime.text(`${endDuration.hours}:${endDuration.minutes}:${endDuration.seconds}`);
        }
        // console.log(endDuration.hours);

        if (playPauseBtn.hasClass("play")) {
          // console.log("ahihi");
          playPauseBtn.addClass("pause").removeClass("play");
          video.play();
          $(videoPlayer).addClass("isPlaying");
        } else if (playPauseBtn.hasClass("pause")) {
          video.pause();
          playPauseBtn.addClass("play").removeClass("pause");
          $(videoPlayer).removeClass("isPlaying");
        }
        interval = setInterval(function () {
          if (!video.paused) {
            updateSeekbar();
          }
          if (video.paused) {
            clearInterval(interval);
          }
          if (video.ended) {
            clearInterval(interval);
            $(playerProgressBar).css("width", "100%");
            playPauseBtn.removeClass("pause").addClass("play");
            $(videoPlayer).removeClass("isPlaying").addClass("showControls");
          }
        }, 500);
      });

      //  $(playCenter).on("click",function(){
      //    $(playCenter).addClass('none').removeClass('play-center');
      //   completeDuration=video.duration;//gán biến completeDuration bằng toàn bộ thời gian của video
      //   endDuration=calculateDuration(completeDuration);//gán biến endDuration bằng
      //   if(endDuration.hours==0){
      //     endTime.text(`${endDuration.minutes}:${endDuration.seconds}`);
      //   }
      //   else{
      //     endTime.text(`${endDuration.hours}:${endDuration.minutes}:${endDuration.seconds}`);
      //   }
      //   console.log(endDuration.hours);

      //   if(playPauseBtn.hasClass("play")){
      //     playPauseBtn.addClass("pause").removeClass("play");
      //     video.play();
      //     $(videoPlayer).addClass("isPlaying");
      //   }
      //   else if(playPauseBtn.hasClass("pause")){
      //     video.pause();
      //     playPauseBtn.addClass("play").removeClass("pause");
      //     $(videoPlayer).removeClass("isPlaying");
      //   }
      //   interval=setInterval(function(){
      //     if(!video.paused){
      //       updateSeekbar();
      //     }
      //     if(video.paused){
      //       clearInterval(interval);
      //     }
      //     if(video.ended){
      //       clearInterval(interval);
      //       $(playerProgressBar).css("width","100%");
      //       playPauseBtn.removeClass("pause").addClass("play");
      //       $(videoPlayer).removeClass("isPlaying").addClass("showControls");
      //     }
      //   },500);

      // });


      fastBackward.on("click", function () {
        if (!video.ended && completeDuration != undefined) {
          video.currentTime > 0 && video.currentTime < video.duration ? (video.currentTime -= 10) : 0;
        }
      });

      fastForward.on("click", function () {
        if (!video.ended && completeDuration != undefined) {
          video.currentTime > 0 && video.currentTime < video.duration ? (video.currentTime += 10) : 0;
        }
      });

      playerSeekBar.on("click", function (e) {
        // console.log("run");
        if (!video.ended && completeDuration != undefined) {
          var seekPosition = e.pageX - $(playerSeekBar).offset().left;
          if (seekPosition >= 0 && seekPosition < $(playerSeekBar).outerWidth()) {
            video.currentTime = (seekPosition * completeDuration) / $(playerSeekBar).outerWidth();
            updateSeekbar();
          }
        }
      });

      volumeSeekBar.on("click", function (e) {
        // console.log("volume");
        let volumePosition = e.pageX - $(volumeSeekBar).offset().left;
        // console.log(volumePosition);
        var videoVolume = volumePosition / $(volumeSeekBar).outerWidth();
        // console.log(videoVolume);
        if (videoVolume >= 0 && videoVolume <= 1) {
          video.volume = videoVolume;
          // console.log(videoVolume);
          volumeProgreeBar.css("width", videoVolume * 100 + "%");
          volumePercentage.text(Math.floor(videoVolume * 100) + "%");
          $(".fa-volume-mute").addClass("fa").addClass("fa-volume-up").removeClass("fas").removeClass("fa-volume-mute");
        }
      });


      $(".fa-volume-up").on("click", function (e) {
        var videoVolume = 0;
        // console.log(videoVolume);
        video.volume = videoVolume;
        // console.log(videoVolume);
        volumeProgreeBar.css("width", videoVolume * 100 + "%");
        volumePercentage.text(Math.floor(videoVolume * 100) + "%");
        $(".fa-volume-up").addClass("fas").addClass("fa-volume-mute").removeClass("fa").removeClass("fa-volume-up");
      });

      $(clickUnMute).on("click", function (e) {
        alert("click mute");
        var videoVolume = 0.5;
        // console.log(videoVolume);
        video.volume = videoVolume;
        // console.log(videoVolume);
        volumeProgreeBar.css("width", videoVolume * 100 + "%");
        volumePercentage.text(Math.floor(videoVolume * 100) + "%");
        $(".fa-volume-mute").addClass("fa").addClass("fa-volume-up").removeClass("fas").removeClass("fa-volume-mute");
      });

      fullscreen.on("click", function () {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      });

      speedVideo.on("click", function () {
        speedVideo = $(this).text();
        // var current_nut = $('.highlightSpeed').index() + 1;
        // var click_nut = $(this).index() + 1;
        $('.list-speed h5').removeClass('highlightSpeed');
        $(this).addClass('highlightSpeed');
        $(".speed").text(speedVideo);
        switch (speedVideo) {
          case "2.0x":
            video.playbackRate = 2;
            break;
          case "1.5x":
            video.playbackRate = 1.5;
            break;
          case "1.0x":
            video.playbackRate = 1;
            break;
          case "0.5x":
            video.playbackRate = 0.5;
            break;
          case "0.25x":
            video.playbackRate = 0.25;
            break;
        }
        // video.playbackRate = 2;
      });

      $(videoPlayer).hover(function () {

        $(videoPlayer).addClass("showControls");
        $(videoPlayer).removeClass("isPlaying");

      }, function () {
        setTimeout(function () {
          $(videoPlayer).removeClass("showControls");
          $(videoPlayer).addClass("isPlaying");
        }, 2000);
      });

      // console.log("fuckyou2");

      var updateSeekbar = function () {
        seekBarPercentage = getPercentage(video.currentTime, video.duration);
        currentDuration = calculateDuration(video.currentTime);
        // console.log("current time");
        if (endDuration.hours < 1) {
          startTime.text(
            `${currentDuration.minutes}:${currentDuration.seconds}`
          );
        } else {
          startTime.text(
            `${currentDuration.hours}:${currentDuration.minutes}:${currentDuration.seconds}`
          );
        }

        $(playerProgressBar).css("width", seekBarPercentage + "%");
      };

      setVolumne = () => {
        // console.log("volume");
        let videoVolume = 0.2;
        console.log(videoVolume);
        if (videoVolume >= 0 && videoVolume <= 1) {
          video.volume = videoVolume;
          // console.log(videoVolume);
          volumeProgreeBar.css("width", videoVolume * 100 + "%");
          volumePercentage.text(Math.floor(videoVolume * 100) + "%");
        }
      };

      // newInterval = setInterval(function () {
      //   if (!video.paused) {
      //     playPauseBtn.trigger("click");
      //     clearInterval(newInterval);
      //   }
      // }, 100);

      // const volumeRangeWidth = volumeSeekBar.getBoundingClientRect().width; // This will be the volume limit (100%)
      videoFrame.on("mouseup", function () { //băt sự kiện nhả click khỏi volumeContainer
        mouseIsDown = false;
        // console.log(mouseIsDown);
      });
      volumeProgreeBar.on("mousedown", function () { //bắt sự kiện click vào thanh ghi
        mouseIsDown = true;
        // console.log(mouseIsDown);
      });
      volumeContainer.on("mousemove", volumeSlide);

      function volumeSlide(event) {
        if (mouseIsDown) {
          let volumePosition = event.pageX - $(volumeSeekBar).offset().left;
          var videoVolume = volumePosition / $(volumeSeekBar).outerWidth();
          // console.log(videoVolume);
          if (videoVolume >= 0 && videoVolume <= 1) {
            video.volume = videoVolume;
            // console.log(videoVolume);
            volumeProgreeBar.css("width", videoVolume * 100 + "%");
            volumePercentage.text(Math.floor(videoVolume * 100) + "%");
          }
        }
      }
      setVolumne();
    });
  }, 2000);
});
