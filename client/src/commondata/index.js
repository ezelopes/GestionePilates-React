const ages = [
  { value: 'Maggiorenne', label: 'Maggiorenne' },
  { value: 'Minorenne', label: 'Minorenne' },
];

const disciplines = [
  { value: 'Danza Sportiva', label: 'Danza Sportiva' },
  { value: 'Fitness', label: 'Fitness' },
];

const schools = [
  { value: 'Osio Sotto', label: 'Osio Sotto' },
  { value: 'Stezzano', label: 'Stezzano' },
];

const courses = [
  { value: 'none', label: '' },
  { value: 'Cheerleader Senior', label: 'Cheerleader Senior' },
  { value: 'Cheerleader Peewe', label: 'Cheerleader Peewe' },
  { value: 'Cheerleader Mini', label: 'Cheerleader Mini' },
  { value: 'I Corso Danza Classica', label: 'I Corso Danza Classica' },
  { value: 'Corso Pre-Accademico', label: 'Corso Pre-Accademico' },
  { value: 'I Corso Accademico', label: 'I Corso Accademico' },
  { value: 'Danza Moderna Principianti', label: 'Danza Moderna Principianti' },
  { value: 'Danza Moderna Intermedio', label: 'Danza Moderna Intermedio' },
  { value: 'Danza Moderna Avanzato', label: 'Danza Moderna Avanzato' },
  { value: 'Giocodanza I', label: 'Giocodanza I' },
  { value: 'Giocodanza II', label: 'Giocodanza II' },
  { value: 'Hip Hop Break Baby', label: 'Hip Hop Break Baby' },
  { value: 'Hip Hop Break Children', label: 'Hip Hop Break Children' },
  { value: 'Hip Hop Principianti', label: 'Hip Hop Principianti' },
  { value: 'Hip Hop Intermedio', label: 'Hip Hop Intermedio' },
  { value: 'Hip Hop Avanzato', label: 'Hip Hop Avanzato' },
  { value: 'Musical Children', label: 'Musical Children' },
  { value: 'Musiscal Teens', label: 'Musiscal Teens' },
  { value: 'Propedeutica Danza Moderna', label: 'Propedeutica Danza Moderna' },
  { value: 'Tecnica Propedeutica I', label: 'Tecnica Propedeutica I' },
  { value: 'Tecnica Propedeutica II', label: 'Tecnica Propedeutica II' },
];

const receiptTypes = [
  { value: 'Quota', label: 'Quota' },
  { value: 'Quota Associativa', label: 'Quota Associativa' },
  { value: 'Quota Saggio', label: 'Quota Saggio' },
];

const paymentMethods = [
  { value: 'Assegno', label: 'Assegno' },
  { value: 'Bonifico Bancario', label: 'Bonifico Bancario' },
  { value: 'Contanti', label: 'Contanti' },
];

const defaultAmounts = [
  { value: '10', label: '10' },
  { value: '90', label: '90' },
  { value: '120', label: '120' },
  { value: '150', label: '150' },
];

const timePeriods = [
  { id: 'month', period: 'Per Mese' },
  { id: 'trimester', period: 'Per Trimestre' },
];

const months = [
  { id: 0, month: 'Gennaio' },
  { id: 1, month: 'Febbraio' },
  { id: 2, month: 'Marzo' },
  { id: 3, month: 'Aprile' },
  { id: 4, month: 'Maggio' },
  { id: 5, month: 'Giugno' },
  { id: 6, month: 'Luglio' },
  { id: 7, month: 'Agosto' },
  { id: 8, month: 'Settembre' },
  { id: 9, month: 'Ottobre' },
  { id: 10, month: 'Novembre' },
  { id: 11, month: 'Dicembre' },
];

const years = [
  { id: 2019, year: 2019 },
  { id: 2020, year: 2020 },
  { id: 2021, year: 2021 },
  { id: 2022, year: 2022 },
  { id: 2023, year: 2023 },
  { id: 2024, year: 2024 },
];

const BLANK_DATE = '______-______-________';
const BLANK_SPACE = '___________________________';

const getMonthFromId = (monthId) => months.find(({ id }) => id === monthId);

const isAdult = (age) => age === ages[0].value;

const isSubscriptionFee = (receiptType) => receiptType === receiptTypes[0].value;

const isMembershipFee = (receiptType) => receiptType === receiptTypes[1].value;

const isDanceRecitalFee = (receiptType) => receiptType === receiptTypes[2].value;

const isDanceCourse = (courseType) => courseType === disciplines[0].value;

const isFitnessCourse = (courseType) => courseType === disciplines[1].value;

const isTrimester = (timePeriod) => timePeriod === timePeriods[1].period;

export {
  ages,
  disciplines,
  schools,
  courses,
  receiptTypes,
  paymentMethods,
  defaultAmounts,
  timePeriods,
  months,
  years,
  BLANK_DATE,
  BLANK_SPACE,
  getMonthFromId,
  isAdult,
  isSubscriptionFee,
  isMembershipFee,
  isDanceRecitalFee,
  isFitnessCourse,
  isDanceCourse,
  isTrimester,
};
