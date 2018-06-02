
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

board.on("ready",function(){

  var led = new five.Led.RGB({
    pins:{
      red: 6,
      green: 5,
      blue: 3
    }
  });

this.repl.inject({
  led: led
});

  firebase.initializeApp(config);
  console.log("파이어베이스 정보 받아오기");
  var database = firebase.database();

  database.ref('/Color').on('value',function(snapshot){
    var message = snapshot.val();
    switch (message) {
      case 'Red':
        console.log("Red");
        led.on();
        led.color("#FF0000");
        led.blink(500);
      break;
      case 'Green':
        console.log("Green");
        led.on();
        led.color("#00FF00");
        led.blink(500);
      break;
      case 'Blue':
        console.log("Blue");
        led.on();
        led.color("#0000FF");
        led.blink(500);
      break;
      default:
      console.log("ERROR");
    }
  });
});
