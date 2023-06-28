const { Router } = require('express')
const router = Router();
const path = require('path');
const { renderSingUpFrom, renderSingInFrom, signin, signup, logout } = require('../controllers/user.controllers')

router.get('/users/signup', renderSingUpFrom);

router.post('/users/signup', signup);

router.get('/users/signin', renderSingInFrom);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

router.get('/users/js/particles.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/particles.js'));
});

router.get('/users/js/view-particles.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/view-particles.js'));
});
  
module.exports = router