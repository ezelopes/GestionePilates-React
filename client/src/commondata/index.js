const ages = [
  { id: 'adult', age: 'Maggiorenne' },
  { id: 'underage', age: 'Minorenne' },
];

const disciplines = [
  { id: 'sports_dance', discipline: 'Danza Sportiva' },
  { id: 'fitness', discipline: 'Fitness' },
];

const schools = [
  { id: 'osio_sotto', school: 'Osio Sotto' },
  { id: 'stezzano', school: 'Stezzano' },
];

const courses = [
  { id: 'none', course: '' },
  { id: 'senior_cheerleader', course: 'Cheerleader Senior' },
  { id: 'peewe_cheerleader', course: 'Cheerleader Peewe' },
  { id: 'mini_cheerleader', course: 'Cheerleader Mini' },
  { id: 'ballet_danceI', course: 'I Corso Danza Classica' },
  { id: 'pre_academic_course', course: 'Corso Pre-Accademico' },
  { id: 'academic_course', course: 'I Corso Accademico' },
  { id: 'beginner_modern_dance', course: 'Danza Moderna Principianti' },
  { id: 'intermediate_modern_dance', course: 'Danza Moderna Intermedio' },
  { id: 'advance_modern_dance', course: 'Danza Moderna Avanzato' },
  { id: 'baby_danceI', course: 'Giocodanza I' },
  { id: 'baby_danceII', course: 'Giocodanza II' },
  { id: 'baby_hip_hop', course: 'Hip Hop Break Baby' },
  { id: 'children_hip_hop', course: 'Hip Hop Break Children' },
  { id: 'beginner_hip_hop', course: 'Hip Hop Principianti' },
  { id: 'intermediate_hip_hop', course: 'Hip Hop Intermedio' },
  { id: 'advance_hip_hop', course: 'Hip Hop Avanzato' },
  { id: 'children_musical', course: 'Musical Children' },
  { id: 'teen_musical', course: 'Musiscal Teens' },
  { id: 'preparatory_modern_dance', course: 'Propedeutica Danza Moderna' },
  { id: 'preparatory_danceI', course: 'Tecnica Propedeutica I' },
  { id: 'preparatory_danceII', course: 'Tecnica Propedeutica II' },
];

const receiptTypes = [
  { id: 'subscription_fee', type: 'Quota' },
  { id: 'membership_fee', type: 'Quota Associativa' },
  { id: 'dance_recital_fee', type: 'Quota Saggio' },
];

const paymentMethods = [
  { id: 'check', type: 'Assegno' },
  { id: 'bank_transfer', type: 'Bonifico Bancario' },
  { id: 'cash', type: 'Contanti' },
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

const isAdult = (age) => age === ages[0].age;

const isSubscriptionFee = (receiptType) => receiptType === receiptTypes[0].type;

const isMembershipFee = (receiptType) => receiptType === receiptTypes[1].type;

const isDanceRecitalFee = (receiptType) => receiptType === receiptTypes[2].type;

const isDanceCourse = (courseType) => courseType === disciplines[0].discipline;

const isFitnessCourse = (courseType) => courseType === disciplines[1].discipline;

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
