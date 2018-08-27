function plotWeightTrailGraph(chart_name, obs){

  jQuery('#' + chart_name).highcharts({
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Weight trail'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Click to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats:{
        month: '%b, %Y'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Weight (kg)'
      }
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b, %Y}: {point.y:.1f} Kg'
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 7
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [{
        type: 'area',
        name: 'Weight',
        data: formatData(obs)
      }]
  });
  //});


}


function formatData(obs) {
  data = [];
  for(var i = 0; i < obs.length; i++) {
    data.push([ getDateWithFormat(obs[i][0]), obs[i][1] ]);
  }
  return data;
}

function getDateWithFormat(d) {
  newDate = new Date(d);
  var day = newDate.getDate();
  var monthIndex = newDate.getMonth();
  var year = newDate.getFullYear();

  return Date.UTC(year,monthIndex,day);
}








function hideChart() {
  document.getElementById("popupLargeChart").style.display = 'none';
  document.getElementById("regimen-change-cover").style.display = 'none';
}

function zoomChart(id, obs) {
  if(id == 'container_one') {
    document.getElementById("popupLargeChart").style.display = 'inline';
    document.getElementById("regimen-change-cover").style.display = 'inline';
    plotWeightTrailGraph('popupLargeChart', obs)
  }else if(id == 'container_three'){
    document.getElementById("popupLargeChart").style.display = 'inline';
    document.getElementById("regimen-change-cover").style.display = 'inline';
    plotBabyGraph('popupLargeChart');
  }

}










/*
Baby charts.
*/

function plotBabyGraph(chart_name) {

    //resetWeightReadings(obs);

    jQuery('#' + chart_name).highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Weight For Age'
        },
        xAxis: {
            categories: age_in_months ,
            title: {
              text: 'Age in months'
            },
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5
            }]
        },
        yAxis: {
            title: {
                text: 'Weight (kg)'
            }
        },
        tooltip: {
          shared: true,
          valueSuffix: ' Kg'
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          line : {
            dataLabels : {
              enabled : true,
              formatter: function() {
                var last  = this.series.data[this.series.data.length - 1];
                if ((this.point.category === last.category  && this.point.y === last.y)) {
                  return this.point.y;
                }
                return "";
              }
            },
          },
          series: {
            fillOpacity: 0.5,
            connectNulls: true,
            marker: {
              enabled: false
            }
          }
        },
        series: [{
            name: 'Standard high weight',
            data: standard_high_weight,
            marker: {
              fillColor: '#c70a00',
              lineWidth: 2,
              lineColor: '999'
            }
        }, {
            name: 'Median weight',
            data: median_weight
        }, {
            name: "Weight trail (child's weight)",
            data: weight_trail,
            marker: { enabled: true }
        }, {
            name: 'Standard low weight',
            data: standard_low_weight
        }]
    });

  }
