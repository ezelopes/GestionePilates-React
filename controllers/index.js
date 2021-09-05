const { Router } = require('express');
const student = require('./student');
const receipt = require('./receipt');
const teacher = require('./teacher');

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
