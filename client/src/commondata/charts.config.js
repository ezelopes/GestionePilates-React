const doughnutOptions = {
  responsive: true,
  maintainAspectRation: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const barChartOptions = {
  responsive: true,
  maintainAspectRation: false,
  scales: {
    y: {
      position: 'left',
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const chartColors = [
  '#F94144',
  '#277DA1',
  '#F8961E',
  '#43AA8B',
  '#F9844A',
  '#90BE6D',
  '#F3722C',
  '#577590',
  '#F9C74F',
  '#4D908E',
];

export { doughnutOptions, barChartOptions, chartColors };
