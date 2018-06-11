console.log("시작");
$("#BTN_GOOGLE_LOGIN").click(function () {
    console.log("버튼 눌림");

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        $('#AUTH_STATE').text(result.user.displayName + "님 로그인 하셨습니다");
        $('#AUTH_STATE_FACE').text("sentiment_very_satisfied");
        document.getElementById("AUTH_STATE_FACE").style.color = "blue";
        document.getElementById("BTN_SET_EQUIP").style.display = "inline-block";
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref(userId).set(userId);
    }).catch(function (error) {
        alert(error.message)
    });
});
