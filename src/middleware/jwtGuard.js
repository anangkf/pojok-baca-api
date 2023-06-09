const passport = require('passport');

const jwtGuard = passport.authenticate('jwt', { session: false });

module.exports = jwtGuard;
