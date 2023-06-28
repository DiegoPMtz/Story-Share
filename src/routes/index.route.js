const {Router}= require ('express')
const router = Router();

const{ renderAbout, renderIndex, renderTrabajos}= require('../controllers/index.controllers')

router.get('/', renderIndex);

router.get('/about',renderAbout);

router.get('/Trabajos',renderTrabajos);

module.exports = router;