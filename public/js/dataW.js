console.log("data 쓰기 js 실행");

firebase.database().ref('USER/ID').set('NEW');
firebase.database().ref('USER/PASSWORD').set('NEW');
firebase.database().ref('USER/NAME').set('NEW');
firebase.database().ref('USER/PHONENUM').set('NEW');
firebase.database().ref('USER/SIGNDATE_Y').set('NEW');
firebase.database().ref('USER/SIGNDATE_M').set('NEW');
firebase.database().ref('USER/SIGNDATE_D').set('NEW');
firebase.database().ref('USER/BIRTHDAY').set('NEW');

console.log("data 쓰기 js 종료");


console.log("변경 js 실행");
$("#BTN_SIGNUP").click(function () {
    console.log("변경버튼누름");

    firebase.database().ref('USER/ID').on('value', function (snapshot) {
            var new_ID = $("#ID").val();
            var updates1 = {};
            var ID_config = snapshot.val();

            if (ID_config = null) {
                console.log("ID미입력");
            }
            else if (ID_config == 'NEW') {
                updates1['USER/ID'] = new_ID;
                firebase.database().ref().update(updates1);
                console.log("ID:%s 로 메시지변경", new_ID);
            }
    });

firebase.database().ref('USER/PASSWORD').on('value', function (snapshot) {
    var new_PASSWORD = $("#PASSWORD").val();
    var updates2 = {};
    var PASSWORD_config = snapshot.val();

    switch (PASSWORD_config) {
        case 'NEW':
            updates2['USER/PASSWORD'] = new_PASSWORD;
            firebase.database().ref().update(updates2);
            console.log("password:%s 로 메시지변경", new_PASSWORD);
            break;
        case null:
            firebase.database().ref('USER/PASSWORD').set('NEW');
            break;
        default:
            console.log("error");
            break;
    }
});


firebase.database().ref('USER/NAME').on('value', function (snapshot) {
    var new_FIRSTNAME = $("#Name").val();
    var updates3 = {};
    var NAME_config = snapshot.val();

    switch (NAME_config) {
        case 'NEW':
            updates3['USER/NAME'] = new_FIRSTNAME;
            firebase.database().ref().update(updates3);
            console.log("Name:%s 로 메시지변경", new_FIRSTNAME);
            break;
        case null:
            firebase.database().ref('USER/NAME').set('NEW');
            break;
        default:
            console.log("error");
            break;
    }
});


firebase.database().ref('USER/PHONENUM').on('value', function (snapshot) {
    var new_PHONENUM = $("#Phone_num").val();
    var updates4 = {};
    var PHONE_config = snapshot.val();

    switch (PHONE_config) {
        case 'NEW':
            updates4['USER/PHONENUM'] = new_PHONENUM;
            firebase.database().ref().update(updates4);
            console.log("phone:%s 로 메시지변경", new_PHONENUM);
            break;
        case null:
            firebase.database().ref('USER/PHONENUM').set('NEW');
            break;
        default:
            console.log("error");
            break;
    }
});

firebase.database().ref('USER/BIRTHDAY').on('value', function (snapshot) {
    var new_BIRTHDAY = $("#Birth_month").val();
    var updates5 = {};
    var BIRTHDAY_config = snapshot.val();

    switch (BIRTHDAY_config) {
        case 'NEW':
            updates5['USER/BIRTHDAY'] = new_BIRTHDAY;
            firebase.database().ref().update(updates5);
            console.log("birthday:%s 로 메시지변경", new_BIRTHDAY);
            break;
        case null:
            firebase.database().ref('USER/BIRTHDAY').set('NEW');
            break;
        default:
            console.log("error");
            break;
    }
}); firebase.database().ref('USER/SIGNDATE_Y').on('value', function (snapshot) {
    var Date = new Date();

    var Sign_Y = Date.getFullYear();
    var Sign_m = Date.getMonth();
    var Sign_d = Date.getDate();
    var updates5_1 = {};
    var updates5_2 = {};
    var updates5_3 = {};

    var SIGNDATE_config = snapshot.val();


    if (SIGNDATE_config == "NEW") {
        updates5_1['USER/SIGNDATE_Y'] = Sign_Y;
        updates5_2['USER/SIGNDATE_M'] = Sign_m;
        updates5_3['USER/SIGNDATE_D'] = Sign_d;
        firebase.database().ref().update(updates5_1);
        firebase.database().ref().update(updates5_2);
        firebase.database().ref().update(updates5_3);
        console.log("SignInDay:%s년 %s월 %s일 로 메시지변경", Sign_Y, Sign_m, Sign_d);
    }
});

console.log("변경 js 종료");
});

