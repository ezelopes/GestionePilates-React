const ages = [
  { id: 0, age: 'Maggiorenne' },
  { id: 1, age: 'Minorenne' },
];

const disciplines = [
  { id: 0, discipline: 'Fitness' },
  { id: 1, discipline: 'Danza Sportiva' },
];

const schools = [
  { id: 0, school: 'Stezzano' },
  { id: 1, school: 'Osio Sotto' },
];

const courses = [
  { id: 0, course: '' },
  { id: 1, course: 'Giocodanza I' },
  { id: 2, course: 'Giocodanza II' },
  { id: 3, course: 'Tecnica Propedeutica I' },
  { id: 4, course: 'Tecnica Propedeutica II' },
  { id: 5, course: 'I Corso Danza Classica' },
  { id: 6, course: 'Corso Pre-Accademico' },
  { id: 7, course: 'I Corso Accademico' },
  { id: 8, course: 'Propedeutica Danza Moderna' },
  { id: 9, course: 'Danza Moderna Principianti' },
  { id: 10, course: 'Danza Moderna Intermedio' },
  { id: 11, course: 'Danza Moderna Avanzato' },
  { id: 12, course: 'Hip Hop Break Baby' },
  { id: 13, course: 'Hip Hop Break Children' },
  { id: 14, course: 'Hip Hop Principianti' },
  { id: 15, course: 'Hip Hop Intermedio' },
  { id: 16, course: 'Hip Hop Avanzato' },
  { id: 17, course: 'Cheerleader Senior' },
  { id: 18, course: 'Cheerleader Peewe' },
  { id: 19, course: 'Cheerleader Mini' },
  { id: 20, course: 'Musical Children' },
  { id: 21, course: 'Musiscal Teens' },
];

const receiptTypes = [
  { id: 0, type: 'Quota' },
  { id: 1, type: 'Quota Associativa' },
];

const paymentMethod = [
  { id: 0, type: 'Contanti' },
  { id: 1, type: 'Assegno' },
  { id: 2, type: 'Bonifico Bancario' },
];

const defaultAmounts = [
  { value: '90', label: '90' },
  { value: '120', label: '120' },
  { value: '150', label: '150' },
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
  { id: 2021, year: 2021 },
  { id: 2022, year: 2022 },
  { id: 2023, year: 2023 },
  { id: 2024, year: 2024 },
];

const BLANK_DATE = '______-______-________';

const getMonthFromId = (monthId) =>
  months.map(({ id, month }) => (id === monthId ? month : null)).filter((month) => month !== null);

const isAdult = (age) => age === ages[0].age;

const isMembershipFee = (receiptType) => receiptType === receiptTypes[1].type;

export {
  ages,
  disciplines,
  schools,
  courses,
  receiptTypes,
  paymentMethod,
  defaultAmounts,
  months,
  years,
  BLANK_DATE,
  getMonthFromId,
  isAdult,
  isMembershipFee,
};
