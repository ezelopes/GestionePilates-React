import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { years } from '../../../commondata';
import useCountByMonth from './useCountByMonth';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRation: false,
  title: {
    fontSize: 20,
    fontColor: 'red',
  },
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
      position: 'top',
    },
    title: {
      display: true,
      padding: { bottom: 25 },
      align: 'start',
      font: {
        size: 15,
      },
    },
  },
};

const monthLabels = [
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
];

const trimesterLabels = ['Settembre - Dicembre', 'Gennaio - Marzo', 'Aprile - Giugno'];

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

const StudentCountChart = ({ receiptsWithStudentInfo }) => {
  const [selectedYear, setSelectedYear] = useState(2021);
  const [viewByMonth, setViewByMonth] = useState(2021);

  const { september, october, november, december, january, february, march, april, may, june, july, august } = useCountByMonth(
    receiptsWithStudentInfo,
    selectedYear
  );

  const data = {
    labels: viewByMonth ? monthLabels : trimesterLabels,
    datasets: [
      {
        data: viewByMonth
          ? [september, october, november, december, january, february, march, april, may, june, july, august]
          : [september + october + november + december, january + february + march, april + may + june],
        backgroundColor: chartColors,
        maxBarThickness: 80,
      },
    ],
  };

  options.plugins.title.text = `Numero di allieve iscritte per ${viewByMonth ? 'mese' : 'trimestre'} nel ${selectedYear}/${
    selectedYear + 1
  }`;

  return (
    <div className="container-fluid" style={{ width: 'fit-content' }}>
      <div style={{ display: 'flex', gap: '1em', alignItems: 'flex-end', marginBottom: '2em' }}>
        <Form.Label> Seleziona anno</Form.Label>
        <Form.Control
          style={{ width: 'fit-content' }}
          as="select"
          defaultValue={selectedYear}
          onChange={({ target }) => {
            setSelectedYear(parseInt(target.value, 10));
          }}
        >
          {years.map((year) => (
            <option key={`select_${year.id}`} value={year.id}>
              {year.year}
            </option>
          ))}
        </Form.Control>

        <Form.Label> Seleziona tipologia</Form.Label>
        <Form.Control
          style={{ width: 'fit-content' }}
          as="select"
          defaultValue={selectedYear}
          onChange={({ target }) => {
            setViewByMonth(target.value === 'by_month');
          }}
        >
          <option key="select_by_month" value="by_month">
            Per Mese
          </option>
          <option key="select_by_trimester" value="by_trimester">
            Per Trimestre
          </option>
        </Form.Control>
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <Bar data={data} options={options} width={500} height={300} />
        </div>
      </div>
    </div>
  );
};

StudentCountChart.propTypes = {
  receiptsWithStudentInfo: PropTypes.array.isRequired,
};

export default StudentCountChart;
