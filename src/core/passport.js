import passport from 'passport';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
import LocalStrategy from 'passport-local';
import { log, logError } from '../logger';
import { User } from '../data/models';

passport.use(new LocalStrategy(async (username, password, done) => {
  log('in local strategy', username, password);

  let user;

  try {
    user = await User.findOne({
      where: {
        email: username,
      },
    });
  } catch (error) {
    logError('Error in passport login', error);
    return done(error, false);
  }

  if (!user || !user.comparePassword(password)) return done({ type: 'invalidPassword' }, null);

  return done(null, { id: user.id, isReviewer: user.isReviewer });
}));

passport.serializeUser((user, done) => {
  log('serializeUser', user);
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  log('deserializeUser', userId);

  let user;
  try {
    user = await User.findOne({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    logError('Error in passport deserializeUser', error);
    return done(error, false);
  }

  return done(null, { id: user.id, isReviewer: user.isReviewer });
});

/**
 * Sign in with Facebook.
 */
// passport.use(new FacebookStrategy({
//   clientID: config.facebook.id,
//   clientSecret: config.facebook.secret,
//   callbackURL: '/login/facebook/return',
//   profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
//   passReqToCallback: true,
// }, (req, accessToken, refreshToken, profile, done) => {
//   /* eslint-disable no-underscore-dangle */
//   const loginName = 'facebook';
//   const claimType = 'urn:facebook:access_token';
//   const fooBar = async () => {
//     if (req.user) {
//       const userLogin = await UserLogin.findOne({
//         attributes: ['name', 'key'],
//         where: { name: loginName, key: profile.id },
//       });
//       if (userLogin) {
//         // There is already a Facebook account that belongs to you.
//         // Sign in with that account or delete it, then link it with your current account.
//         done();
//       } else {
//         const user = await User.create({
//           id: req.user.id,
//           email: profile._json.email,
//           logins: [
//             { name: loginName, key: profile.id },
//           ],
//           claims: [
//             { type: claimType, value: profile.id },
//           ],
//           profile: {
//             displayName: profile.displayName,
//             gender: profile._json.gender,
//             picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
//           },
//         }, {
//           include: [
//             { model: UserLogin, as: 'logins' },
//             { model: UserClaim, as: 'claims' },
//             { model: UserProfile, as: 'profile' },
//           ],
//         });
//         done(null, {
//           id: user.id,
//           email: user.email,
//         });
//       }
//     } else {
//       const users = await User.findAll({
//         attributes: ['id', 'email'],
//         where: { '$logins.name$': loginName, '$logins.key$': profile.id },
//         include: [
//           {
//             attributes: ['name', 'key'],
//             model: UserLogin,
//             as: 'logins',
//             required: true,
//           },
//         ],
//       });
//       if (users.length) {
//         done(null, users[0]);
//       } else {
//         let user = await User.findOne({ where: { email: profile._json.email } });
//         if (user) {
//           // There is already an account using this email address. Sign in to
//           // that account and link it with Facebook manually from Account Settings.
//           done(null);
//         } else {
//           user = await User.create({
//             email: profile._json.email,
//             emailConfirmed: true,
//             logins: [
//               { name: loginName, key: profile.id },
//             ],
//             claims: [
//               { type: claimType, value: accessToken },
//             ],
//             profile: {
//               displayName: profile.displayName,
//               gender: profile._json.gender,
//               picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
//             },
//           }, {
//             include: [
//               { model: UserLogin, as: 'logins' },
//               { model: UserClaim, as: 'claims' },
//               { model: UserProfile, as: 'profile' },
//             ],
//           });
//           done(null, {
//             id: user.id,
//             email: user.email,
//           });
//         }
//       }
//     }
//   };
//
//   fooBar().catch(done);
// }));

export default passport;
