import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { years, courses, isMembershipFee } from '../../../commondata';
import { isDateBetweenTwoDates } from '../../../helpers/dates';

ChartJS.register(ArcElement, Tooltip, Legend);

// TODO: REFACTOR ALL BELOW

const options = {
  responsive: true,
  maintainAspectRation: false,
  title: {
    fontSize: 20,
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
      maxHeight: 200,
      font: {
        size: 18,
      },
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

const IncomePerCourseChart = ({ receiptsWithStudentInfo }) => {
  const [selectedYear, setSelectedYear] = useState(2021);

  // Let fitnessTotal = 0;

  let coursesTotal = 0;

  const amountPaidForEachCourse = receiptsWithStudentInfo.reduce(
    (accumulator, receipt) => {
      if (isMembershipFee(receipt.ReceiptType)) {
        return accumulator;
      }

      if (isDateBetweenTwoDates(`${selectedYear}-09-01`, `${selectedYear + 1}-08-31`, receipt.ReceiptDate)) {
        if (!receipt.Course) {
          // This is fitness
          // fitnessTotal += parseInt(receipt.AmountPaid, 10);

          return accumulator;
        }

        // eslint-disable-next-line no-param-reassign
        accumulator[receipt.Course] += parseInt(receipt.AmountPaid, 10);

        coursesTotal += parseInt(receipt.AmountPaid, 10);
      }

      return accumulator;
    },
    {
      'Giocodanza I': 0,
      'Giocodanza II': 0,
      'Tecnica Propedeutica I': 0,
      'Tecnica Propedeutica II': 0,
      'I Corso Danza Classica': 0,
      'Corso Pre-Accademico': 0,
      'I Corso Accademico': 0,
      'Propedeutica Danza Moderna': 0,
      'Danza Moderna Principianti': 0,
      'Danza Moderna Intermedio': 0,
      'Danza Moderna Avanzato': 0,
      'Hip Hop Break Baby': 0,
      'Hip Hop Break Children': 0,
      'Hip Hop Principianti': 0,
      'Hip Hop Intermedio': 0,
      'Hip Hop Avanzato': 0,
      'Cheerleader Senior': 0,
      'Cheerleader Peewe': 0,
      'Cheerleader Mini': 0,
      'Musical Children': 0,
      'Musiscal Teens': 0,
    }
  );

  const data = {
    labels: courses.map(({ course }) => course).filter((course) => course !== ''),
    datasets: [
      {
        data: [
          amountPaidForEachCourse['Giocodanza I'],
          amountPaidForEachCourse['Giocodanza II'],
          amountPaidForEachCourse['Tecnica Propedeutica I'],
          amountPaidForEachCourse['Tecnica Propedeutica II'],
          amountPaidForEachCourse['I Corso Danza Classica'],
          amountPaidForEachCourse['Corso Pre-Accademico'],
          amountPaidForEachCourse['I Corso Accademico'],
          amountPaidForEachCourse['Propedeutica Danza Moderna'],
          amountPaidForEachCourse['Danza Moderna Principianti'],
          amountPaidForEachCourse['Danza Moderna Intermedio'],
          amountPaidForEachCourse['Danza Moderna Avanzato'],
          amountPaidForEachCourse['Hip Hop Break Baby'],
          amountPaidForEachCourse['Hip Hop Break Children'],
          amountPaidForEachCourse['Hip Hop Principianti'],
          amountPaidForEachCourse['Hip Hop Intermedio'],
          amountPaidForEachCourse['Hip Hop Avanzato'],
          amountPaidForEachCourse['Cheerleader Senior'],
          amountPaidForEachCourse['Cheerleader Peewe'],
          amountPaidForEachCourse['Cheerleader Mini'],
          amountPaidForEachCourse['Musical Children'],
          amountPaidForEachCourse['Musiscal Teens'],
        ],
        backgroundColor: chartColors,
        maxBarThickness: 80,
      },
    ],
  };

  options.plugins.title.text = [
    `Incasso totale dei corsi di danza: ${coursesTotal} €`,
    // `Incasso totale dei corsi di fitness -> ${fitnessTotal} €`,
  ];

  return (
    <div className="container-fluid" style={{ width: 'fit-content' }}>
      <div style={{ display: 'flex', gap: '1em', alignItems: 'flex-end', marginBottom: '2em' }}>
        <Form.Label> Seleziona anno </Form.Label>
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
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

IncomePerCourseChart.propTypes = {
  receiptsWithStudentInfo: PropTypes.array.isRequired,
};

export default IncomePerCourseChart;
