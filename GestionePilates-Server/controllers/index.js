const { Router } = require('express');
const getAllieve = require('./getAllieve');
const getSingleAllieva = require('./getSingleAllieva');
const getRicevuteOfAllieva = require('./getRicevuteOfAllieva');
const getAllRicevute = require('./getAllRicevute');
const creaRicevuta = require('./creaRicevuta');
const creaAllieva = require('./creaAllieva');
const modificaAllieva = require('./modificaAllieva');
const eliminaAllieva = require('./eliminaAllieva');
const eliminaRicevute = require('./eliminaRicevute');

const router = new Router();

router.use('/getAllieve', getAllieve);
router.use('/getSingleAllieva/:CodiceFiscale', getSingleAllieva);
router.use('/getRicevuteOfAllieva/:CodiceFiscale', getRicevuteOfAllieva);
router.use('/getAllRicevute', getAllRicevute);

router.use('/creaRicevuta', creaRicevuta);
router.use('/creaAllieva', creaAllieva);
router.use('/modificaAllieva', modificaAllieva);
router.use('/eliminaAllieva', eliminaAllieva);
router.use('/eliminaRicevute', eliminaRicevute);

// if path corresponds to none of the above
router.use('/', (req, res, next) => {
  res.render('404', {
    url: 'HERE ARE THE AVAILABLE APIs: /getAllieve /getSingleAllieva/:CodiceFiscale'
  });
});

module.exports = router;
