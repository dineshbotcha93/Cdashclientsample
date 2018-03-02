/* Chart Configuration
*
* https://valor-software.com/ng2-charts/
* http://www.chartjs.org/docs/latest/axes/styling.html
* ******************************************************* */
export const ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  pointDot : true,
  radius: 3,
  pointDotStrokeWidth : 1,
  bezierCurve : true,
  defaultFontFamily: 'roboto_light',
  defaultFontColor: 'rgba(255, 255, 255, 1)',
  // Container for pan options
  pan: {
    // Boolean to enable panning
    enabled: false,

    // Panning directions. Remove the appropriate direction to disable
    // Eg. 'y' would only allow panning in the y direction
    mode: 'xy',
    rangeMin: {
      // Format of min pan range depends on scale type
      x: null,
      y: null
    },
    rangeMax: {
      // Format of max pan range depends on scale type
      x: null,
      y: null
    }
  },

  // Container for zoom options
  zoom: {
    // Boolean to enable zooming
    enabled: false,

    // Enable drag-to-zoom behavior
    drag: false,

    // Zooming directions. Remove the appropriate direction to disable
    // Eg. 'y' would only allow zooming in the y direction
    mode: 'xy',
    rangeMin: {
      // Format of min zoom range depends on scale type
      x: null,
      y: null
    },
    rangeMax: {
      // Format of max zoom range depends on scale type
      x: null,
      y: null
    }
  },
  legend: {
    labels: {
      // This more specific font property overrides the global property
      fontColor: 'rgba(255, 255, 255, 1)',
      defaultFontColor: 'rgba(255, 255, 255, 1)',
      defaultFontFamily: 'roboto_light',
    }
  },
  scales: {
    ticks: {
      beginAtZero: true,
      min: 0,
      userCallback: function(label, index, labels) {
        // when the floored value is the same as the value we have a whole number
        if (Math.floor(label) === label) {
          return label;
        }
      },
    },
    xAxes: [{
      ticks: {
        fontColor: 'rgba(255, 255, 255, 1)',
      },
    }],
    yAxes: [{
      ticks: {
        fontColor: 'rgba(255, 255, 255, 1)',
      },
    }],
  },
};

export const ChartColors = {
  backgroundColor: 'rgba(255, 204, 101, 0.1)',
  borderColor: 'rgba(255, 204, 101, 0.25)',
  pointBackgroundColor: 'rgba(255, 204, 101, 0.75)',
  // pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  // pointHoverBorderColor: 'rgba(148, 159, 177, 1)'
};
