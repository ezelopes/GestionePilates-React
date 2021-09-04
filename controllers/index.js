const { Router } = require('express');
const student = require('./allieva');
const receipt = require('./ricevuta');
const teacher = require('./insegnante');

const router = new Router();

router.use('/student', student);
router.use('/receipt', receipt);
router.use('/teacher', teacher);

// if path corresponds to none of the above
router.use('/', (req, res) => {
  res.render('404', {
    url: 'HERE ARE THE AVAILABLE APIs: /getStudents /getSingleStudent/:TaxCode'
  });
});

module.exports = router;
