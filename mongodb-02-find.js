// const MongoClient = require("mongodb").MongoClient;
// 객체 구조 할당 방식
// const { testInsertOneDoc, 
//     testInsertManyDocs, 
//     testDeleteAll } = require("./mongodb-01-crud");
const { MongoClient } = require("mongodb"); //  위에랑 같음

const url = "mongodb://localhost:27017"; // 접속 URL

const client = new MongoClient(url, { useNewUrlParser: true });

//  문서 한 개 가져오기
function testFindOne() {
    client.connect()
    .then(client => {
        const db = client.db("mydb");

        db.collection("friends").findOne()
        .then(result => {
            console.log(result);
            client.close();
        })
    })
}
// testFindOne();

//  문서 전체 가져오기
function testFindAll() {
    client.connect()
    .then(client => {
        const db = client.db("mydb");
        //  toArray로 배열로 변경하면 Promise의 도움을 받을 수 있다
        db.collections("friends").find().toArray()
        .then(result => {
            for (let doc of result) {
                console.log(doc);
            }
        })
        .then(() => {
            client.close();
        })
        .catch(reason => {
            console.error(reason);
        })
    })
}
testFindAll();