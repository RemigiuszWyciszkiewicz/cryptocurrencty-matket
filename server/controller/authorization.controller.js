const passport = require('../auth').passport;
const jwt = require('jsonwebtoken');

const passportAuthenticateLogin = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(401).send('Wrong email or password');
        return next('Wrong email or password');
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, 'top_secret');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const passportAuthenticateSignUp = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    if (user) {
      res.send(user);
    }

    if (!user) {
      res.status(409).send('Duplication error');
    }
    if (err) {
      next(err);
    }
  })(req, res, next);
};

module.exports = {
  passportAuthenticateLogin,
  passportAuthenticateSignUp,
};
