const { Router } = require('express');
const getAllieve = require('./getAllieve');

const router = new Router();

router.use('/getAllieve', getAllieve);

// if path corresponds to none of the above
router.use('/', (req, res, next) => {
  res.render('404', {
    url: 'HERE ARE THE AVAILABLE APIs: /getAllieve'
  });
});

module.exports = router;
