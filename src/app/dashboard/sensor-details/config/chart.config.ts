export const ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  pointDot : true,
  radius: 3,
  pointDotStrokeWidth : 1,
  bezierCurve : true,
  defaultFontFamily: 'roboto_regular',
  defaultFontColor: '#FF0000',
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
    drag: true,

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
  options: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontColor: '#ffffff',
        defaultFontColor: '#ffffff',
      }
    },
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        userCallback: function(label, index, labels) {
          // when the floored value is the same as the value we have a whole number
          if (Math.floor(label) === label) {
              return label;
          }
        },
      }
    }
  }
};

export const ChartColors = {
  backgroundColor: 'rgba(148,159,177,1)',
  borderColor: 'rgba(148,159,177,1)',
  pointBackgroundColor: 'rgba(148,159,177,1)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(148,159,177,1)'
};
