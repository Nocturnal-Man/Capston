
var five = require("johnny-five");

var firebase = require("firebase");

var board = new five.Board({port : "COM6"});
var config = {
  apiKey: "AIzaSyCbPSQdeDN0ZYzz7lmibjx1hVr2Ph_GER4",
  authDomain: "testtest-b3ffc.firebaseio.com",
  databaseURL: "https://testtest-b3ffc.firebaseio.com",
  projectId: "testtest-b3ffc",
  storageBucket: "testtest-b3ffc.appspot.com"
};
// 사진에서도 말했듯이 이 부분은 파이어 베이스를 개인 프로젝트에 연결하기 위한 부분이다.
// 중요한 부분이고 혹시 연결이 안된다면 이 부분에서 혹시 다른점이 있는지 다시 확인해보길 바란다.

board.on("ready",function(){

  var a1 = new five.Led(12);

  var dt = new Date(); // 시간을 가져오기 위한 변수로 Date()함수를 이용
  var currentSeconds =  dt.getSeconds(); //초를 표시하기 위한 변수로 Date()함수에 포함된 getSeconds()를 이용
  var test; //0~9까지 표시하기위해 초를 10으로 나눈 나머지를 저장하기 위한 변수. 변수명 가지고 태클걸거면 꺼져라

  firebase.initializeApp(config); //위에서 작성한 부분의 ID를 이분에서 초기화하고 연결한다.
  console.log("파이어베이스 정보 받아오기");
  var database = firebase.database();

  setInterval(function(){//1초마다 여기에 써진 코드가 반복된다. 1000은 1초
    currentSeconds++;
    test = currentSeconds%10;
    database.ref('/test').set(test);//database에 test라는 키을 가진 부분에 test변수가 가진 값이 저장이 된다
    console.log("%d초",test);
  },1000);

  // 파이어 베이스 데이터베이스는 NoSQL(no라고 해서 SQL을 안쓰는게 아니고 Not only다.)를
  // 이용한 클라우드 데이터베이스로 NoSQL의 특징은 따로 찾아보고 데이터베이스의 구조는 JSON트리 구조로
  // 모든 데이터는 JSON개체로 저장이 된다. 기존의 SQL데이터베이스와 달리 테이블과 레코드를 가지고 있지 않고
  // JSON트리에 연결된 키를 가지고 데이터를 저장한다.
  // 자세하게 알고싶다면 https://firebase.google.com/docs/database/web/structure-data를 참조.

  database.ref('/test').on('value',function(snapshot){
    var message = snapshot.val();
    if(message == 1){
    a1.on();
    }
    else{
      a1.off();
    }
  });
});
