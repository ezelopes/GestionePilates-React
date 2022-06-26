import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Form, Row } from 'react-bootstrap';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { years, courses, isMembershipFee, disciplines, isFitnessCourse, isDanceCourse } from '../../../commondata';
import { isDateBetweenTwoDates } from '../../../helpers/dates';
import { chartColors, doughnutOptions } from '../../../commondata/charts.config';
import Translation from '../../common/Translation';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomePerCourseChart = ({ receiptsWithStudentInfo }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
  const [selectedDiscipline, setSelectedDiscipline] = useState(disciplines[0].discipline);

  let fitnessTotal = 0;
  let danceCoursesTotal = 0;

  const amountPaidForEachCourse = receiptsWithStudentInfo.reduce(
    (accumulator, receipt) => {
      if (isMembershipFee(receipt.ReceiptType)) {
        return accumulator;
      }

      if (isDateBetweenTwoDates(`${selectedYear}-09-01`, `${selectedYear + 1}-08-31`, receipt.ReceiptDate)) {
        if (isFitnessCourse(receipt.Discipline)) {
          fitnessTotal += parseInt(receipt.AmountPaid, 10);

          return accumulator;
        }

        if (isDanceCourse(receipt.Discipline)) {
          // eslint-disable-next-line no-param-reassign
          accumulator[receipt.Course] += parseInt(receipt.AmountPaid, 10);

          danceCoursesTotal += parseInt(receipt.AmountPaid, 10);

          return accumulator;
        }
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
        data: isFitnessCourse(selectedDiscipline)
          ? [fitnessTotal]
          : [
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
            ].sort((a, b) => b - a),
        backgroundColor: chartColors,
        maxBarThickness: 80,
      },
    ],
  };

  return (
    <Container fluid>
      <Container className="formItems">
        <Row>
          <Col>
            <Form.Label>
              <Translation value="chart.incomePerCourse.selectYear" />
            </Form.Label>
            <Form.Control
              as="select"
              defaultValue={selectedYear}
              onChange={({ target }) => setSelectedYear(parseInt(target.value, 10))}
            >
              {years.map((year) => (
                <option key={`select_${year.id}`} value={year.year}>
                  {year.year}
                </option>
              ))}
            </Form.Control>
          </Col>

          <Col>
            <Form.Label>
              <Translation value="chart.incomePerCourse.selectDiscipline" />
            </Form.Label>
            <Form.Control as="select" defaultValue={selectedYear} onChange={({ target }) => setSelectedDiscipline(target.value)}>
              {disciplines.map((discipline) => (
                <option key={`select_${discipline.id}`} value={discipline.discipline}>
                  {discipline.discipline}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </Container>

      <div className="chart-wrapper">
        <b>
          <Translation
            value="chart.incomePerCourse.title"
            replace={{
              total: isFitnessCourse(selectedDiscipline) ? fitnessTotal : danceCoursesTotal,
              discipline: selectedDiscipline.toLowerCase(),
            }}
          />
        </b>
        <div>
          <Doughnut data={data} options={doughnutOptions} />
        </div>
      </div>
    </Container>
  );
};

IncomePerCourseChart.propTypes = {
  receiptsWithStudentInfo: PropTypes.array.isRequired,
};

export default IncomePerCourseChart;
