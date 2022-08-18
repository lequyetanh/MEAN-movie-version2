// setTimeout(() => {
//   const socket = io('/') //kết nối với socket
//   console.log("1");
//   const videoGrid = document.getElementById('video-grid') // biến này chứa tất cả những người tham gia group
//   const myPeer = new Peer(undefined, { //kết nối với peer
//     path: '/peerjs',
//     host: '/',
//     port: '443'
//   })

//   myPeer.on('open', id => {
//     console.log(id);
//     socket.emit('join-room', ROOM_ID, id)
//   })

//   let myVideoStream; // biến này chứa thông tin video của mình

//   const myVideo = document.createElement('video') // biến này chứa thông tin video của mình
//   myVideo.muted = true;
//   const peers = {}
//   navigator.mediaDevices.getUserMedia({ //lấy camera và tiếng của mình
//     video: true,
//     audio: true
//   }).then(stream => {

//     myVideoStream = stream; // biến myVideoStream cũng được gán bằng video ở trên máy tính mình 2 thuộc tính là video và tiếng
//     addVideoStream(myVideo, stream) //thêm stream của mình vào màn hình

//     myPeer.on('call', call => { //lắng nghe sự kiện thằng mới join vào room, chỉ có thằng mới join và room mới chạy
//       call.answer(stream) //gửi lại dữ liệu cho thằng mới join vào room
//       // console.log(stream);
//       const video = document.createElement('video')
//       call.on('stream', userVideoStream => { //lắng nghe xem có bao nhiêu thằng đang stream trong room
//         // console.log(userVideoStream);
//         addVideoStream(video, userVideoStream); //thêm stream của thằng mới lên màn hình của nó
//       })
//     })


//     socket.on('user-connected', userId => { // lắng nghe sự kiện có ai đó kết nối vào room của mình, tất cả mọi người trừ thằng mới join và room sẽ chạy
//       // console.log(stream);
//       connectToNewUser(userId, stream) // đầu vào là id của thằng đó và stream của mình
//     })

//     function connectToNewUser(userId, stream) { //hiển thị stream
//       const call = myPeer.call(userId, stream) // lắng nghe sự kiện có thằng kết nối với room của mình
//       const video = document.createElement('video') // tạo ra biến video cho mình
//       call.on('stream', userVideoStream => { //hàm này chạy 2 lần
//         // console.log(userVideoStream);
//         addVideoStream(video, userVideoStream);
//       })
//       call.on('close', () => { //lắng nghe sự kiện thằng kết nối với room của mình out
//         video.remove() //xóa video của thằng đó đi
//       })

//       peers[userId] = call
//     }

//     // đầu vào là biến video được gán bằng video ở trên máy tính mình 2 thuộc tính là video và tiếng
//     function addVideoStream(video, stream) {
//       video.srcObject = stream
//       // đại khái là chạy video sử dụng webcam khi nhận được tín hiệu
//       video.addEventListener('loadedmetadata', () => {
//         video.play()
//       })
//       videoGrid.append(video)
//     }

//     // input value
//     var text = $("input");
//     // when press enter send message
//     $('html').keydown(function (e) {
//       if (e.which == 13 && text.val().length !== 0) {
//         socket.emit('message', text.val());
//         text.val('')
//       }
//     });
//     socket.on("createMessage", message => {
//       $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
//       scrollToBottom()
//     })
//   })

//   socket.on('user-disconnected', userId => {
//     if (peers[userId]) peers[userId].close()
//   })
// }, 2000);
// navigator.mediaDevices.getUserMedia({ //lấy camera và tiếng của mình
//   video: true,
//   audio: true
// }).then(stream => {
//   myVideoStream = stream;
// })

// // hình như là chuyển đến tin nhắn cuối cùng
// function scrollToBottom() {
//   var d = $('.main__chat_window');
//   d.scrollTop(d.prop("scrollHeight"));
// }


// function muteUnmute() {
//   // console.log(myVideoStream);
//   const enabled = myVideoStream.getAudioTracks()[0].enabled; //đã tồn tại myVideoStream
//   if (enabled) {
//     // nếu myVideoStream nhận giá trị true
//     myVideoStream.getAudioTracks()[0].enabled = false; // tắt tiếng trên màn hình
//     setUnmuteButton(); // thay đổi giao diện button
//   } else {
//     // nếu myVideoStream nhận giá trị false
//     setMuteButton();
//     myVideoStream.getAudioTracks()[0].enabled = true;
//   }
// }

// function playStop() {
//   // console.log('object')
//   var enabled = myVideoStream.getVideoTracks()[0].enabled; //đã tồn tại myVideoStream nhận 2 giá trị là true và false
//   if (enabled) {
//     // nếu myVideoStream nhận giá trị true
//     myVideoStream.getVideoTracks()[0].enabled = false; //tắt video trên màn hình
//     setPlayVideo() //thay đổi giao diện button
//   } else {
//     // nếu myVideoStream nhận giá trị false
//     myVideoStream.getVideoTracks()[0].enabled = true; //bật video trên màn hình
//     setStopVideo() //thay đổi giao diện button
//   }
// }

// // giao diện mở tiếng
// const setMuteButton = () => {
//   const html = `
// <i class="fas fa-microphone"></i>
// <span>Mute</span>
// `
//   document.querySelector('.main__mute_button').innerHTML = html;
// }

// // giao diện tắt tiếng
// const setUnmuteButton = () => {
//   const html = `
// <i class="unmute fas fa-microphone-slash"></i>
// <span>Unmute</span>
// `
//   document.querySelector('.main__mute_button').innerHTML = html;
// }

// // giao diện stop
// const setStopVideo = () => {
//   const html = `
// <i class="fas fa-video"></i>
// <span>Stop Video</span>
// `
//   document.querySelector('.main__video_button').innerHTML = html;
// }


// // giao diện play
// const setPlayVideo = () => {
//   const html = `
// <i class="stop fas fa-video-slash"></i>
// <span>Play Video</span>
// `
//   document.querySelector('.main__video_button').innerHTML = html;
// }
