const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { User, Admin } = require('../models/index');
const CONST = require('../utils/constant');

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONST.JWT_SECRET,
    ignoreExpiration: false,
  },
  // eslint-disable-next-line consistent-return
  async (payload, done) => {
    try {
      if (payload.role === 'user') {
        const user = await User.findAll({
          where: {
            id: payload.sub,
          },
        });

        if (user) return done(null, user);
        return done(null, false);
      }

      if (payload.role === 'admin') {
        const admin = await Admin.findAll({
          where: {
            id: payload.sub,
          },
        });

        if (admin) return done(null, admin);
        return done(null, false);
      }
      return done(null, false);
    } catch (error) {
      done(error, false);
    }
  },
);

passport.use(jwtStrategy);
