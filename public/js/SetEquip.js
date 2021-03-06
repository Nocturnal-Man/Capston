function generateChartData() {
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 500);

    for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * 40) - 20;

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
}
setInterval(AirHum, 2000);

function AirHum() {
    database.ref('/HUM').on('value', function (snapshot) {
        var hum = snapshot.val();
        $('#AirHum').text(hum + "%");
    });
}
setInterval(wal, 4000);

function wal() {
    console.log("수위값 읽어오기");
    database.ref('/E').on('value', function(snapshot2) {
        database.ref('/WAL').on('value', function(snapshot3) {
            var E = snapshot2.val();
            var W1 = snapshot3.val();
            switch (E) {
                case 1:
                    if(W1==1){
                         $('#WAL').text("수위가 높습니다!");
                        $('#EQIP_ICON').text("warning");
                        document.getElementById("EQIP_ICON").style.color = "red";
                        document.getElementById("WAL").style.color = "red";
                    }
                    else{
                        console.log("ERROR");
                    }
                    break;
                case 0:
                    if (W1==1) {
                        $('#WAL').text("안전");
                        $('#EQIP_ICON').text("thumb_up");
                        document.getElementById("EQIP_ICON").style.color = "#1e96ff";
                        document.getElementById("WAL").style.color = "black";
                    }
                    else{
                         $('#WAL').text("수위가 낮습니다!");
                        $('#EQIP_ICON').text("warning");
                        document.getElementById("EQIP_ICON").style.color = "red";
                        document.getElementById("WAL").style.color = "red";
                    }
                    break;
                default:
                    console.log("ERROR");
                    break;
            }
            console.log("E는"+E+"입니다");
            console.log("W는"+W1+"입니다");
        });

    });
}

var chartData = generateChartData();

var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "marginRight": 80,
    "dataProvider": chartData,
    "valueAxes": [{
        "position": "left",
        "title": "Unique visitors"
    }],
    "graphs": [{
        "id": "g1",
        "fillAlphas": 0.4,
        "valueField": "visits",
        "balloonText": "<div style='margin:5px; font-size:19px;'>Visits:<b>[[value]]</b></div>"
    }],
    "chartScrollbar": {
        "graph": "g1",
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA"
    },
    "chartCursor": {
        "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "minPeriod": "mm",
        "parseDates": true
    },
    "export": {
        "enabled": true,
        "dateFormat": "YYYY-MM-DD HH:NN:SS"
    }
});

chart.addListener("dataUpdated", zoomChart);
// when we apply theme, the dataUpdated event is fired even before we add listener, so
// we need to call zoomChart here
zoomChart();
// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 250, chartData.length - 100);
}

// generate some random data, quite different range
function generateChartData() {
    var chartData = [];
    // current date
    var firstDate = new Date();
    // now set 500 minutes back
    firstDate.setMinutes(firstDate.getDate() - 1000);

    // and generate 500 data items
    var visits = 500;
    for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        // each time we add one minute
        newDate.setMinutes(newDate.getMinutes() + i);
        // some random number
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        // add data item to the array
        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}

var database = firebase.database();


var chart1 = AmCharts.makeChart("chartdiv1", {
    "theme": "light",
    "type": "gauge",
    "axes": [{
        "topTextFontSize": 20,
        "topTextYOffset": 70,
        "axisColor": "#31d6ea",
        "axisThickness": 1,
        "endValue": 100,
        "gridInside": true,
        "inside": true,
        "radius": "50%",
        "valueInterval": 10,
        "tickColor": "#67b7dc",
        "startAngle": -90,
        "endAngle": 90,
        "unit": "%",
        "bandOutlineAlpha": 0,
        "bands": [{
            "color": "#0080ff",
            "endValue": 100,
            "innerRadius": "105%",
            "radius": "170%",
            "gradientRatio": [0.5, 0, -0.5],
            "startValue": 0
    }, {
            "color": "#3cd3a3",
            "endValue": 0,
            "innerRadius": "105%",
            "radius": "170%",
            "gradientRatio": [0.5, 0, -0.5],
            "startValue": 0

   }]
  }],
    "arrows": [{
        "alpha": 1,
        "innerRadius": "35%",
        "nailRadius": 0,
        "radius": "170%"
  }]
});
setInterval(smoth, 2000);

function smoth() {
    database.ref('/GHM').on('value', function (snapshot) {
        var message = snapshot.val();
        chart1.arrows[0].setValue(message);
        chart1.axes[0].setTopText(message + "%");
        chart1.axes[0].bands[1].setEndValue(message);
    });
}
