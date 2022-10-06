import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Translation from '../../common/Translation';
import useCountByMonth from './useCountByMonth';
import { timePeriods, years, isTrimester } from '../../../commondata';
import { barChartOptions, chartColors } from '../../../commondata/charts.config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// TODO: Export these

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

const StudentCountChart = ({ receiptsWithStudentInfo }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
  const [viewByMonth, setViewByMonth] = useState(timePeriods[0].period);

  const { september, october, november, december, january, february, march, april, may, june, july, august } = useCountByMonth(
    receiptsWithStudentInfo,
    selectedYear
  );

  const data = useMemo(
    () => ({
      labels: isTrimester(viewByMonth) ? trimesterLabels : monthLabels,
      datasets: [
        {
          data: isTrimester(viewByMonth)
            ? [september + october + november + december, january + february + march, april + may + june]
            : [september, october, november, december, january, february, march, april, may, june, july, august],
          backgroundColor: chartColors,
          maxBarThickness: 80,
        },
      ],
    }),
    [april, august, december, february, january, july, june, march, may, november, october, september, viewByMonth]
  );

  return (
    <Container fluid>
      <Container className="formItems">
        <Row>
          <Col>
            <Form.Label>
              <Translation value="chart.studentCount.selectYear" />
            </Form.Label>
            <Form.Control
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
          </Col>

          <Col>
            <Form.Label>
              <Translation value="chart.studentCount.selectPeriodType" />
            </Form.Label>
            <Form.Control as="select" defaultValue={viewByMonth} onChange={({ target }) => setViewByMonth(target.value)}>
              {timePeriods.map((period) => (
                <option key={`select_${period.id}`} value={period.period}>
                  {period.period}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </Container>

      <div className="chart-wrapper">
        <b>
          <Translation
            value="chart.studentCount.title"
            replace={{ period: viewByMonth.toLowerCase(), year: selectedYear, yearPlusOne: selectedYear + 1 }}
          />
        </b>
        <div>
          <Bar data={data} options={barChartOptions} width={500} height={300} />
        </div>
      </div>
    </Container>
  );
};

StudentCountChart.propTypes = {
  receiptsWithStudentInfo: PropTypes.array.isRequired,
};

export default StudentCountChart;
