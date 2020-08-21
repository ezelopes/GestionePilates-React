const { Router } = require('express');
const allieva = require('./allieva');
const ricevuta = require('./ricevuta');
const insegnante = require('./insegnante');

const router = new Router();

router.use('/allieva', allieva);
router.use('/ricevuta', ricevuta);
router.use('/insegnante', insegnante);

// if path corresponds to none of the above
router.use('/', (req, res, next) => {
  res.render('404', {
    url: 'HERE ARE THE AVAILABLE APIs: /getAllieve /getSingleAllieva/:CodiceFiscale'
  });
});

module.exports = router;
