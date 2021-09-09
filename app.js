//  Express 모듈 불러오기
const express = require("express");
const http = require("http");   //  노트 기본 http 모듈

//  express 생성
const app = express();

//  설정, 속성을 집어 넣을 때
//  set(키, 값)
//  get(키)

//  etag를 사용하지 않음
app.set("etag", false);
//  환경 변수에 PORT가 설정되어 있으면 그 값을 사용
//  설정이 안되어 있으면 3000
app.set('port', process.env.PORT || 3000); 

//  로거 추가
//  npm install morgan
//  로거 불러오기
const logger = require("morgan");   //  로거 불러오기
//  로거를 express에 추가: 미들웨어 추가
app.use(logger("dev"));

//  MongoDB
const { MongoClient } = require("mongodb");

//  정적 웹의 제공
//  미들웨어 express.static 미들웨어 함수를 등록
app.use(express.static(__dirname + "/public"));

//  View 엔진 설정
app.set("view engine", "ejs");  //  View엔진으로 ejs 사용 선언
app.set("views", __dirname + "/views"); //  템플릿의 위치

//  GET 메서드 요청의 처리
//  app.get(url, callback)
app.get("/", (req, resp) => {
    //  http 모듈의 응답 처리메서드
    /*
    console.log("[GET] /");
    resp.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    resp.write("Express Welcomes You!");
    resp.end();
    */
    resp.status(200)
        .contentType("text/html;charset=UTF-8")
        .render("home");
});

app.get("/welcome", (req, resp) => {
    //  express의 추가 응답 처리 메서드
    console.log("[GET] /welcome");
    resp.status(200)
        .header("Content-Type", "text/html;charset=UTF-8")
        .send("Welcome!!!!!!!");
})

//  GET 요청 파라미터의 처리
app.get("/request", (req, resp) => {
    console.log("[GET] /request");
    console.log(req.query); //  req.query -> url 파라미터 객체
    console.log("[QUERY] name:" + req.query.name);

    let paramName = req.query.name;
    if (paramName === undefined ||
        paramName.length == 0) { //  name 파라미터가 전달되지 않으면
            resp.status(404)    //  Not Found
                .contentType("text/html;charset=UTF-8")
                .send("Name 정보를 확인할 수 없어요.");
        } else {
            //파라미터가 정상 전달
            resp.status(200)    //  성공
                .contentType("text/html;charset=UTF-8")
                .send("Name:" + paramName);
        }
})


//  URL 파라미터 처리(Fancy URL, Pretty URL)
//  URL의 경로일부로 데이터 전송 방식
app.get("/urlparam/:name", (req, resp) => {
    //  url 파라미터는 params 객체로 얻어올 수 있다.
    let userName = req.params.name;
    resp.writeHead(200, { "Content-Type": "text/html;charset=UTF-8"})
        resp.write("<h1>name:" + userName + "</h1>")
        resp.write("<p>URL 파라미터를 전달 받았습니다.</p>")
        resp.send();
});

//  View 엔진 활용
app.get("/render", (req, resp) => {
    //  응답객체의 render 메서드 활용
    resp.contentType("text/html;charset=UTF-8")
        .render("render");

});

//  Router 등록(미들웨어)
const webRouter = require("./router/WebRouter")(app);
app.use("/web", webRouter);

function startServer() {
    //  database 연결 정보
    const dburl = "mongodb://localhost:27017";
    //  데이터베이스 Connect
    MongoClient.connect(dburl, { useNewUrlParser: true })
        .then(client => {
            //  db 선택
            console.log("데이터베이스에 연결 되었습니다.");
            let db = client.db("mydb")
            //  익스프레스에 추가
            app.set("db", db);  //  db 키로 mongodb 클라이언트 추가

            //  express 실행
            startExpress();
        })
        .catch(reason => {
            console.error(reason);
        });
}

function startExpress() {
    //  서버 start
    http.createServer(app).listen(app.get("port"), () => {
        console.log("test");
        console.log("Web Server is running on port:" + app.get("port"));
})
}

startServer();