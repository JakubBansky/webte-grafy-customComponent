const xmlFileURL = 'z03.xml';



function getContent(xmlFileURL) {
  console.log("parsing");
  var xhr = new XMLHttpRequest();
  var rok = [];
  var A = [];
  var B = [];
  var C = [];
  var D = [];
  var E = [];
  var FX = [];
  var FN = [];
  var grades = [];
  xhr.open('GET', xmlFileURL, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlString = xhr.responseText;
      var parser = new DOMParser();
    }
  };

  xhr.send();

  fetch(xmlFileURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(xmlString => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const zaznamy = xmlDoc.querySelectorAll('zaznam');
      zaznamy.forEach(zaznam => {
        rok.push(zaznam.querySelector("rok").textContent);
      });
      const hodnotenie = xmlDoc.querySelectorAll("hodnotenie");
      hodnotenie.forEach(hodnota => {
        A.push(hodnota.querySelector('A').textContent);
        B.push(hodnota.querySelector('B').textContent);
        C.push(hodnota.querySelector('C').textContent);
        D.push(hodnota.querySelector('D').textContent);
        E.push(hodnota.querySelector('E').textContent);
        FX.push(hodnota.querySelector('FX').textContent);
        FN.push(hodnota.querySelector('FN').textContent);
      })
      grades.push(A, B, C, D, E, FX, FN);
      const bodyWidth = document.body.clientWidth;


      const horizontal = [{
          categories: rok,
          title: {
            text: "Semestre"
          },
          tickPlacement: 'on'
        },
        {
          title: {
            text: 'Počet študentov'
          }
        }
      ]

      const vertical = [{
          categories: rok,
          title: {
            text: 'Počet študentov'
          },
          tickPlacement: 'on'
        },
        {
          title: {
            text: "Semestre"
          }
        }
      ]


      if (bodyWidth > 728) {
        createGraph(grades, false, horizontal);
      } else {
        createGraph(grades, true, vertical);
      }

      console.log(grades);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

getContent(xmlFileURL);

function createGraph(grades, horizontal, axes) {
  var options = {
    series: [{
        name: 'A',
        data: grades[0]
      }, {
        name: 'B',
        data: grades[1]
      }, {
        name: 'C',
        data: grades[2]
      },
      {
        name: 'D',
        data: grades[3]
      },
      {
        name: 'E',
        data: grades[4]
      },
      {
        name: 'Fx',
        data: grades[5]
      },
      {
        name: 'Fn',
        data: grades[6]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: axes[0],
    yaxis: axes[1],
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " študentov"
        }
      }
    }
  };
  console.log("loading");
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
  console.log("loaded");
}