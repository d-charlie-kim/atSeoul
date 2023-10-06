const http = require("http");
const express = require("express");
const app = express();
const io = require("socket.io");
const { useEffect } = require("react");

const httpServer = http.createServer(app).listen(8000);

const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// socketServer.on('connect');
socketServer.on("connect", (socket) => {
  socket.on("request_message", (req) => {
    console.log(req);
    socket.broadcast.emit("receive_message", req);
  });
});

// 880129293280;

/*
// NOTE
socket.io 에 대해서 알아보기
메서드 공부하기
흠흠냐 흠냐

- 채팅방 답게 구현하기
- 닉네임 받고, 띄우기
- UI 이쁘게 만들기
- 모달로 만들면 좋겠다 싶음
- 

*/
