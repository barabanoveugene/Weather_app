<template>
  <div>
    <canvas :id="dynamicId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      dynamicId: 'myChart-' + Date.now(),
    };
  },
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    printGraph() {
      let chart
      if (chart) {
        chart.destroy()
      }
      
      const configuration = {
        type: 'line',
        data: {
          labels: this.chartData.map(item => item.dt),
          datasets: [
            {
            label: 'Temperature',
            data: this.chartData.map(item => item.temp),
            fill: true,
            backgroundColor: 'rgb(0, 102, 138, 0.2)',
            borderColor: 'rgb(0, 102, 138, 1)',
            borderWidth: 4,
            lineTension: 0.3,
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          aspectRatio: 2,
          scales: {
            x: {
              grid: {
                display: false,
                barPercentage: 0.5
              }
            },
            y: {
              grid: {
                display: false,
                barPercentage: 0.5
              },
              ticks: {
                stepSize: 10,
                display: false
              }
            }   
          },
          plugins: {
            tooltip: {
              cornerRadius: 10,
              caretSize: 0,
              displayColors: false,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              bodyFont: {
                size: 14
              }
            }
          },
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 2,
              borderCapStyle: 'round'
            },
            point: {
              hoverRadius: 7,
              hitRadius: 10,
              borderWidth: 2,
              radius: 5,
              borderColor: 'blue',
              backgroundColor: 'white',
              pointStyle: 'circle'
            }
          }
        }
      }
        const ctx = document.getElementById(this.dynamicId);
        chart = new Chart(ctx, configuration);
    }
    
  },
  mounted() {
    this.printGraph()
  }
}
</script>

<style>
  
</style>

