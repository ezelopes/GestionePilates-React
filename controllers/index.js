const { Router } = require('express');
const getAllieve = require('./getAllieve');
const getInsegnanti = require('./getInsegnanti');
const getSingleAllieva = require('./getSingleAllieva');
const getSingleInsegnante = require('./getSingleInsegnante');
const getRicevuteOfAllieva = require('./getRicevuteOfAllieva');
const getAllRicevute = require('./getAllRicevute');
const creaRicevuta = require('./creaRicevuta');
const creaAllieva = require('./creaAllieva');
const creaInsegnante = require('./creaInsegnante');
const modificaAllieva = require('./modificaAllieva');
const modificaInsegnante = require('./modificaInsegnante');
const eliminaAllieva = require('./eliminaAllieva');
const eliminaInsegnante = require('./eliminaInsegnante');
const eliminaRicevute = require('./eliminaRicevute');

const router = new Router();

router.use('/getAllieve', getAllieve);
router.use('/getInsegnanti', getInsegnanti);
router.use('/getSingleAllieva/:CodiceFiscale', getSingleAllieva);
router.use('/getSingleInsegnante/:CodiceFiscale', getSingleInsegnante);
router.use('/getRicevuteOfAllieva/:CodiceFiscale', getRicevuteOfAllieva);
router.use('/getAllRicevute', getAllRicevute);

router.use('/creaAllieva', creaAllieva);
router.use('/creaInsegnante', creaInsegnante);

router.use('/modificaAllieva', modificaAllieva);
router.use('/modificaInsegnante', modificaInsegnante);
router.use('/eliminaAllieva', eliminaAllieva);
router.use('/eliminaInsegnante', eliminaInsegnante);

router.use('/creaRicevuta', creaRicevuta);
router.use('/eliminaRicevute', eliminaRicevute);

// if path corresponds to none of the above
router.use('/', (req, res, next) => {
  res.render('404', {
    url: 'HERE ARE THE AVAILABLE APIs: /getAllieve /getSingleAllieva/:CodiceFiscale'
  });
});

module.exports = router;
