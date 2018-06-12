$("#BTN_OPEN").click(function () {
    console.log("open 버튼 누름");
    firebase.database().ref('M2').set("A");
    firebase.database().ref('M1').set("A");

    firebase.database().ref('M1').on('value', function (snapshot) {
        var check = snapshot.val();
        switch (check) {
            case 'A':
                console.log("데이터" + check + "로 읽어옴");
                document.getElementById("open_check").style.borderColor = "blue";
                $('#open_check').text("정상");
                document.getElementById("close_check").style.borderColor = "black";
                $('#close_check').text("확인");
                break;
            default:
                console.log("데이터" + check + "로 읽어옴");
        }
    });

});



$("#BTN_CLOSE").click(function () {
    console.log("close 버튼 누름");
    firebase.database().ref('M2').set("B");
     firebase.database().ref('M1').set("B");

    firebase.database().ref('M2').on('value', function (snapshot2) {
        var check2 = snapshot2.val();
        switch (check2) {
            case 'B':
                console.log("데이터" + check2 + "로 읽어옴");
                document.getElementById("close_check").style.borderColor = "blue";
                $('#close_check').text("정상");
                 document.getElementById("open_check").style.borderColor = "black";
                $('#open_check').text("확인");
                break;
            default:
                console.log("데이터" + check2 + "로 읽어옴");
        }
    });

});
