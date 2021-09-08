//  Express 모듈 불러오기
const express = require("express");
const http = require("http");   //  노트 기본 http 모듈

//  express 생성
const app = express();

//  설정, 속성을 집어 넣을 때
//  set(키, 값)
//  get(키)

//  환경 변수에 PORT가 설정되어 있으면 그 값을 사용
//  설정이 안되어 있으면 3000
app.set('port', process.env.PORT || 3000); 

//  로거 추가
//  npm install morgan
//  로거 불러오기
const logger = require("morgan");   //  로거 불러오기
//  로거를 express에 추가: 미들웨어 추가
app.use(logger("dev"));

//  정적 웹의 제공
//  미들웨어 express.static 미들웨어 함수를 등록
app.use(express.static(__dirname + "/public"));
//  서버 start
http.createServer(app).listen(app.get("port"), () => {
    console.log("test");
    console.log("Web Server is running on port:" + app.get("port"));
})