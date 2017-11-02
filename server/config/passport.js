import JwtStrategy from 'passport-jwt/lib/strategy';
import ExtractJwt from 'passport-jwt/lib/extract_jwt';
import Users from '../models/Users';
import serverConfig from './config';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import GitHubStrategy from 'passport-github2';
import { passportFindOrCreate } from '../util/passportFindOrCreate';
import dotenv from 'dotenv';

dotenv.config();

const passportInit = passport => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  opts.secretOrKey = process.env.JWT;

  // Local, regular signup
  passport.use(
    new JwtStrategy(opts, (jwtUser, done) => {
      Users.findOne({ _id: jwtUser._id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);

        return done(null, false);
      });
    })
  );

  // Google
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: serverConfig.googleAuth.clientID,
        clientSecret: serverConfig.googleAuth.clientSecret,
        callbackURL: serverConfig.googleAuth.callbackURL
      },
      passportFindOrCreate
    )
  );

  // Facebook
  // https://github.com/passport/express-4.x-facebook-example
  // https://github.com/jaredhanson/passport-facebook
  // https://developers.facebook.com/docs/graph-api/reference/v2.5/user
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: serverConfig.googleAuth.clientID,
        clientSecret: serverConfig.googleAuth.clientSecret,
        callbackURL: serverConfig.googleAuth.callbackURL,
        profileFields: ['id', 'email', 'gender', 'locale', 'name', 'timezone']
      },
      passportFindOrCreate
    )
  );

  // Github
  passport.use(
    new GitHubStrategy.Strategy(
      {
        clientID: serverConfig.googleAuth.clientID,
        clientSecret: serverConfig.googleAuth.clientSecret,
        callbackURL: serverConfig.googleAuth.callbackURL,
        scope: ['user']
      },
      passportFindOrCreate
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findById(id)
      .then(user => done(null, user))
      .catch(done);
  });
};

export default passportInit;
