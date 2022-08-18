// var socket = io("http://localhost:4000");

// socket.on("Sign-in-fail",function(){
//     alert("Username already exists");
// });

// socket.on("Sign-in-success", function(data){
//     $(".name, .user").html(data);
//     $(".login").hide();
//     $(".logined").show();
//     alert("login successfully");
// });

// socket.on("Server-send-listUser", function(data){
//     $(".rightContent").html("");
//     data.forEach(function(eachItem){
//         $(".rightContent").append("<div class='flexbox-start-start'><img class='image' src='plain-white-background.jpg'><sup class='color'>\</sup><div class='online'>" + eachItem + "</div></div>");
//     });
// });

// socket.on("server-send-message", function(data){
//     // console.log(data);
//     $(".clear").append("<img class='iconUser' src='https://i.pinimg.com/originals/e4/6d/ec/e46decc3ee807d76616f7eb366797e65.jpg'/><span class='blackcolor' style='vertical-align: middle;'>" + data.un + "</span><br/><div class='message'>" + data.nd + "</div><div class='Clear'></div>")
//     // $(".message").append("<div class='message'>" + data + "</div>")
//     // $(".clear").append("<div class='blackcolor'>hello</div>");
// });

// socket.on("someone-is-typing", function(data){
//     $(".run").show();
//     $(".doSomething").html(data + " is typing");
// });

// socket.on("he-is-stop-type", function(data){
//     $(".run").show();
//     $(".doSomething").html("");
//     $(".doSomething").html(data + " is stop type");
//     setTimeout(function () {
//         $(".run").hide();
//     }, 1000);
// });

$(document).ready(function () {

  // console.log("jquery");
  //   $(".run").show();
  //   $(".login").show();
  //   $(".logined").hide();

  //   $(".register").click(function(){
  //       socket.emit("Client-send-userName", $(".userName").val());
  //   });

  //   $(".logOut").click(function(){
  //       console.log("logout");
  //       socket.emit("Log-out");
  //       $(".login").show();
  //       $(".logined").hide();
  //   });

  //   $(".sendMessage").click(function(){
  //       // console.log("message");
  //       socket.emit("send-message", $(".textMessage").val());
  //       // $(".textMessage").html("");
  //   });

  //   $(".textMessage").focusin(function(){
  //       socket.emit("typing");
  //   });

  //   $(".textMessage").focusout(function(){
  //       socket.emit("stop-type");
  //   });


  // ==========================================================================
  $(window).scroll(function () {
    var _scrollTop = $(window).scrollTop();
    if (_scrollTop > 59) {
      // console.log("fixed");
      $(".menu").addClass("fixed");
      // $(".header").addClass("fixed");
    } else {
      $(".menu").removeClass("fixed");
      // $(".header").removeClass("fixed");
    }
  });

  $(window).scroll(function () {
    var _scrollTop = $(window).scrollTop();
    if (_scrollTop > 59) {
      $(".adver1").addClass("fixed");
      $(".adver2").addClass("fixed");
    } else {
      $(".adver1").removeClass("fixed");
      $(".adver2").removeClass("fixed");
    }
  });
});
