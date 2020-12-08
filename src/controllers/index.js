const router = require('express').Router();

router.use((err, req, res, next) => {
  res.status(500).json({
    status: err.status || 500,
    msg: err.msg || 'Internal Server Error',
    data: null,
  });
});

module.exports = router;
