var xData = [];
var y1Data = [];
var y2Data = [];
var flag = true;
var sinFlag = true;
var cosFlag = true;
var options = {
    series:

        [{
                name: "Y1",
                data: []
            },
            {
                name: "Y2",
                data: []
            }
        ],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Zašumený sínus a kosínus',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        },
    },
    colors: ['#DBFF33', '#33FFBD'],
    xaxis: {
        categories: [],
        title: {
            text: "id"
        }
    },
    yaxis: [{
        title: {
            text: "hodnota"
        },
        labels: {
            formatter: function (value) {
                return value.toFixed(1); 
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
source.onmessage = function (event) {
    let data = JSON.parse(event.data);
    if (flag) {
        addData(data);

        if (cosFlag && sinFlag) {
            chart.updateSeries([{
                    name: 'Sínus',
                    data: y1Data
                },
                {
                    name: 'Kosínus',
                    data: y2Data
                },
            ]);
            chart.updateOptions({
                colors: ['#DBFF33', '#33FFBD'],
            });
        } else if (!cosFlag && !sinFlag) {
            chart.updateSeries([]);

        } else if (!cosFlag) {
            chart.updateOptions({
                colors: ['#DBFF33'],
            });
            chart.updateSeries([{
                name: 'Sínus',
                data: y1Data
            }]);

        } else if (!sinFlag) {
            chart.updateOptions({
                colors: ['#33FFBD'],
            });
            chart.updateSeries([{
                name: 'Kosínus',
                data: y2Data
            }]);

        }

        chart.updateOptions({
            xaxis: {
                categories: xData
            },
        });
    }

};

function addData(data) {
    const slider = document.getElementById("slider");
    let value = slider.data;
    xData.push(data.x);
    y1Data.push(data.y1 * value);
    y2Data.push(data.y2 * value);
}

var button = document.getElementById("stopButton");
var sinBox = document.getElementById("sinBox");
var cosBox = document.getElementById("cosBox");
button.addEventListener('click', function () {
    flag = false;
    console.log("stopped");
})
sinBox.addEventListener('change', function () {
    sinFlag = !sinFlag;
    console.log(sinFlag)
})

cosBox.addEventListener('change', function () {
    cosFlag = !cosFlag;
    console.log(cosFlag)
})


document.addEventListener('customEventName', (event) => {
    const data = event.detail;
    console.log(event);
});