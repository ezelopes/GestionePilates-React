import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Form, Row } from 'react-bootstrap';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { years, disciplines, isFitnessCourse } from '../../../commondata';
import { chartColors, doughnutOptions } from '../../../commondata/charts.config';
import Translation from '../../common/Translation';
import useAmountPaidPerCourse from './useAmountPaidPerCourse';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomePerCourseChart = ({ receiptsWithStudentInfo }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
  const [selectedDiscipline, setSelectedDiscipline] = useState(disciplines[0].discipline);

  const { amountPaidPerCourse, fitnessTotal, danceCoursesTotal } = useAmountPaidPerCourse(receiptsWithStudentInfo, selectedYear);

  const data = {
    labels: Object.keys(amountPaidPerCourse).map((courseAmount) => courseAmount),
    datasets: [
      {
        data: isFitnessCourse(selectedDiscipline)
          ? [fitnessTotal]
          : Object.keys(amountPaidPerCourse).map((courseAmount) => amountPaidPerCourse[courseAmount]),
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
