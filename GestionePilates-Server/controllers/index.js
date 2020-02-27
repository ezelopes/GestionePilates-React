const { Router } = require('express');
const getAllieve = require('./getAllieve');
const getSingleAllieva = require('./getSingleAllieva');
const getRicevuteOfAllieva = require('./getRicevuteOfAllieva');
const creaRicevuta = require('./creaRicevuta');

const router = new Router();

router.use('/getAllieve', getAllieve);
router.use('/getSingleAllieva/:CodiceFiscale', getSingleAllieva);
router.use('/getRicevuteOfAllieva/:CodiceFiscale', getRicevuteOfAllieva);

router.use('/creaRicevuta', creaRicevuta);

// if path corresponds to none of the above
router.use('/', (req, res, next) => {
  res.render('404', {
    url: 'HERE ARE THE AVAILABLE APIs: /getAllieve /getSingleAllieva/:CodiceFiscale'
  });
});

module.exports = router;
