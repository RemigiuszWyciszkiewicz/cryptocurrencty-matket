const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../data-access/models').User;
const bcrypt = require('bcrypt');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const documentsCountWithGivenEmails = await User.find({ email: req.body.email }).countDocuments().exec();
        const documentsCountWithGivenNames = await User.find({ name: req.body.name }).countDocuments().exec();

        if (documentsCountWithGivenEmails !== 0) {
          return done(null, false, { emailDuplication: 'User with given email already exists.' });
        } else if (documentsCountWithGivenNames !== 0) {
          return done(null, false, { nameDuplication: 'User with given name already exists.' });
        } else {
          req.body.password = await bcrypt.hash(password, 10);
          await User.create({ email, ...req.body });

          return done(null, { email, ...req.body });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromHeader('auth-token'),
      passReqToCallback: true,
    },
    async (req, token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
