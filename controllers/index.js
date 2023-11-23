const { Router } = require('express');
const member = require('./member');
const subscription = require('./subscription');
// Const teacher = require('./teacher');

const router = new Router();

router.use('/member', member);
router.use('/subscription', subscription);
// Router.use('/teacher', teacher);

// If path corresponds to none of the above
router.use('/', (req, res) => {
  res.status(404).send({
    message: 'This endpoint does not exist :(',
  });
});

// TODO: Endpoint to backup DB?
// https://www.npmjs.com/package/knex-dump

module.exports = router;
