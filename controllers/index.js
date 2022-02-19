const { Router } = require('express');
const student = require('./student');
const receipt = require('./receipt');
const teacher = require('./teacher');

const router = new Router();

router.use('/student', student);
router.use('/receipt', receipt);
router.use('/teacher', teacher);

// If path corresponds to none of the above
router.use('/', (req, res) => {
  res.status(404).send({
    message: 'This endpoint does not exist :(',
  });
});

module.exports = router;
