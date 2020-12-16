const router = require('express').Router();
const { join } = require('path');
const { checkUser } = require('../middleware');

router.get('/home', checkUser, (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'home.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'register.html'));
});
router.get(['/', '/login'], (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
});

module.exports = router;
