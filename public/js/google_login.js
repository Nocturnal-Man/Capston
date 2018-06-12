console.log("시작");
$("#BTN_GOOGLE_LOGIN").click(function () { //버튼이 눌림을 감지
    console.log("버튼 눌림");

    var provider = new firebase.auth.GoogleAuthProvider(); //다운받은 firebase의 tool에서 Google인증을
                                                           //사용하게 해주는 함수로 그 함수를 provider에 초기화 시켜준다.

    firebase.auth().signInWithPopup(provider).then(function (result) { //위에서 초기화된 provider를 이용해 구글 로그인 창을 띄우는데 Popup방식으로 띄운다 
        $('#AUTH_STATE').text(result.user.displayName + "님 로그인 하셨습니다");
        //로그인 페이지에서 보면 AUTH_STATE가 초기에는 '인증되지 않은 사용자입니다'라고 나와있는데 그 부분 text를 변경하는 구문으로 로그인한 사람의 정보(이름)을
        //받아와 '___님이 로그인 하셨습니다'라는 메시지로 바꿔준다.
        $('#AUTH_STATE_FACE').text("sentiment_very_satisfied");
        //마찬가지로 로그인 페이지에서 사용한 <i>태그에 사용된 아이콘을 변경하기 위한 구문으로 <i></i>태그 사이에 들어가는 text에 해당된 아이콘이 출력이 되는데
        //그 부분의 text를 변경해준다. 찡그린 표정에서 웃는 얼굴로 변경하게 해주는 부분이고
        document.getElementById("AUTH_STATE_FACE").style.color = "blue";
        //위에서 연장된 부분으로 해당하는 곳의 스타일을 변경하는 형식이다. 정확하게는 jquery(제이쿼리)라는걸 사용했는데 javascript의 행동모델에 기초한 구문이다.
        //위 $를 이용한 구문은 일반적인 jquery구문으로 속도가 조금 느리다. 페이지 안에서 데이터를 변경하거나 속성을 변경하는데 사용하는것이 jquery라고 이해하면 된다.
        document.getElementById("BTN_SET_EQUIP").style.display = "inline-block";
        //로그인이 된다면 비활성화 되어있던 'BTN_SET_EUQIP'의 display속성이 none에서 inline-block으로 변경되어 화면에 보이게 된다.
        var userId = firebase.auth().currentUser.uid;
        // 파이어베이스에서 제공하는 인증을 사용하면 uid라는 28자리의 개인식별코드가 생성되는데 그걸 데이터베이스에 저장하기 위해 로그인한 사람의 uid를 userId변수에 저장
        firebase.database().ref(userId).set(userId);
        // 위에서 저장한 uid를 데이터베이스에 저장하기 위한 구문으로 userId : userId 이런 식으로 데이터 베이스에는 저장이 된다.
        // set() 함수는 저장을 위한 함수로 ()안에 저장하고 싶은 변수나 값을 넣으면된다. ref()는 데이터가 저장될 이름을 정하는 함수로 예를들어 A에 20이란 값을 저장하려면
        // ref()에 ref('A') 이런식으로 적고 set()에는 set(20) 이런식으로 저장하면 된다.
    }).catch(function (error) {
        //에러 발생시 에러를 보여주기 위한 구문으로 alert() 함수는 익스플로러나 크롬같은 페이지에서 경고창을 띄우는 함수이다.
        alert(error.message)
    });
});