// var socket = io("http://localhost:3000");

// const { $ } = require("protractor");

$(document).ready(function(){
  setTimeout(function () {
    console.log("ahihi");
    let progressbar = document.getElementById('progressbar');
      // var percent = document.getElementById('percent');
      let scrollHeight = document.body.scrollHeight;
      // console.log(scrollHeight + "px");
      let windowHeight = window.innerHeight;
      // console.log(windowHeight + "px");
      let totalHeight = scrollHeight - windowHeight;
      // console.log(totalHeight);       // chiều cao tối đa của trang web
      window.onscroll = function(){
        // console.log(window.pageYOffset + "px");   //chiều cao ở vị trí hiện tại của trang web
        let progress = (window.pageYOffset / totalHeight)*100;
        // console.log(progress);
        progressbar.style.height = progress + "%";
      }
    $(".messenger").show();
    $(".wrapper").hide();
    $(".auth").hide();

    $(".messenger").click(function(){
      $(".messenger").hide();
      $(".wrapper").show();
    });

    $(".fa-times").click(function(){
      console.log("ahihi");
      $(".messenger").show();
      $(".wrapper").hide();
    });

    $(".messenger1").click(function(){
      $(".bao").hide();
      $(".auth").show();
    });
  },300);
});

