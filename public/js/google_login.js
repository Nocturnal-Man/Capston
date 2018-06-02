console.log("시작");
$("#BTN_GOOGLE_LOGIN").click(function(){
  console.log("버튼 눌림");

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result){
    $('#AUTH_STATE').text(result.user.displayName + "님 로그인 하셨습니다");
  }).catch(function(error){
    alert(error.message)
  });
});
