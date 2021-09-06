// 현재 몽고DB에 있는 데이터베이스의 목록 확인
show dbs

// 데이터베이스의 사용
use local

// 확인 
db

// 현재 collection 확인
show collections

// 생성을 위한 절차 필요 없고
// 삭제를 위해서는 db.dropDatabase()

// DB 상태 확인
db.stats();

// 특정 컬렉션의 정보
db.startup_log.stats();

// mydb 데이터베이스 선택
use mydb

// 선택 데이터베이스 확인
db

// title이 First Post인 문서를 삽입
db.posts.insert({
	"title": "First Post"
})

// 다큐먼트 검색
// 1개 문서 검색 : findOne()
db.posts.findOne();

// JSON 객체 만들기
let post = {
	"title": "Second Post"
}
db.posts.save(post);
// save : 다큐먼트에 _id 필드가 없으면
//	  insert (삽입)

// 문서 한개를 선택
post = db.posts.findOne();
post
// _id가 설정되어 있다
// 스키마가 정해져 있지 않다.
post.createdAt = new Date();
// save : 다큐멘트에 _id 필드가 있으면
//	update (갱신)
db.posts.save(post) 

// 기존 문서의 갱신(Update)
/* 
db.컬렉션명.update(
	{ 변경 문서의 조건 },
	{ $set: 
		{ 업데이트할 내용 }
	}
);
*/

db.posts.update(
	{ "title": "First Post" },
	{ $set:
		{ createdAt: new Date(),
		  updatedAt: new Date() }
	}
)

// 객체의 삭제 : .remove
post = db.posts.findOne()
db.posts.remove(post)        
        
// 검색 조건 객체를 이용한 삭제
db.posts.remove({title: /Second/})

/*
db.posts 컬렉션에

title: "First Post", by: "bit", likes: 10
title: "Second Post", by: "hong", likes: 50
title: "Third Post", by: "bit", likes: 30
title: "Fourth Post:, by: "hong", likes: 10

INSERT 연습
*/

db.posts.insert ({
	title: "First Post",
	by: "bit",
	likes: 30
})

db.posts.insert ({
	title: "Second Post",
	by: "park",
	likes: 50
})

db.posts.insert ({
	title: "Third Post",
	by: "bit",
	likes: 30
})

db.posts.insert ({
	title: "Fourth Post",
	by: "park",
	likes: 10
})

// 여러 문서를 insert - insertMany
db.posts.insertMany ([
	{ title: "Fifth Post",
	  by: "bit",
	  likes: 50 },
	{ title: "Sixth Post",
	  by: "park",
	  likes: 50 }
])
          
db.posts.findOne()
db.posts.find()
//   .pretty() 메서드 : BSON을 보기 좋게 출력
          
// 검색 조건 연산자
// 같다: { key: value }
db.posts.find({ "by" : "park" })	// by = park

// 크다: $gt { key: { $gt: value } }
db.posts.find({ "likes": { $gt: 30 } })	// likes > 10 

// 크거나 같다: $gte
db.posts.find({ "likes": { $gte: 50 } } )	// likes >= 50

// 작다: $lt
db.posts.find({ "likes": { $lt: 30 } } )	// likes < 30

// 작거나 같다: $lte
db.posts.find({ "likes": { $lte: 30 } } )	// likes <= 10

// 같지 않다: $ne
db.posts.find({ "likes": { $ne: 30 } } )	// likes != 50

// 조건의 조합
// and 연산
/*
{
      $and: [
	{ 조건 객체 1 },
	{ 조건 객체 2 }
	]
}
*/

// by가 park이고 likes >= 50
db.posts.find({
      $and: [
	{ by: "park" },
	{ likes: 
	     { $gte: 50 } }
	]
})
        
// or 연산
/*
  {
    $or: [
      { 조건 객체 1 },
      { 조건 객체 2 }
    ]
  }
*/

// by가 bit 이거나 likes != 50
db.posts.find({
    $or: [
        { by: "bit" },
        { likes: { $ne: 50} }
        ]
})

// Projection
// find, findOne의 두번째 인자 객체로 출력 필드를 명시
// 출력을 제어할 수 있다.
// 1: 출력함, 0: 출력하지 않음
// 모든 문서들 중에서, _id 출력하지 않고
// title, likes 정보 출력
db.posts.find({}, { title: 1, likes: 1, _id: 0 })

// 출력 제한
// 	.limit : 받아올 개수를 제한
//	.skip : 건너뛸 문서의 개수 지정
// limit : 2개출력, skip: first, second, third 건너 뜀
db.posts.find(imit(2).skip(3) 

// 데이터 정렬
//	.sort : 정렬 기준 객체
//	1: 오름차순, -1: 내림차순

// likes의 역순으로 정렬
db.posts.find().sort({likes: -1})
db.posts.find().sort({likes: -1}, {title: 1})