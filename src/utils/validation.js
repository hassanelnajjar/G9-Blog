module.exports.validateRegister = (userName, userEmail, userPassword, userPassword2) => {
  const errors = [];
  if (!userName || !userEmail || !userPassword || !userPassword2) {
    errors.push({
      data: null,
      status: 400,
      msg: 'You need to enter all values',
    });
  }

  if (userPassword !== userPassword2) {
    errors.push({
      data: null,
      status: 400,
      msg: 'Your passwords should be identical',
    });
  }

  if (userPassword < 6) {
    errors.push({
      data: null,
      status: 400,
      msg: 'Your password should be more than 6 chars',
    });
  }
  return errors;
};

module.exports.validateLogin = (userEmail, userPassword) => {
  const errors = [];
  if (!userEmail || !userPassword) {
    errors.push({
      data: null,
      status: 400,
      msg: 'You need to enter all values',
    });
  }

  if (userPassword < 6) {
    errors.push({
      data: null,
      status: 400,
      msg: 'Your password should be more than 6 chars',
    });
  }
  return errors;
};
