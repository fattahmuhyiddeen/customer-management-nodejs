const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const cors = require('cors');
const passport = require('passport'), OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const home = require('./routes/home.js');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//end middlewares

const secret = "kdfjngkjdngjkenrge";
// passport middleware
passport.use(
  'login',
  // eslint-disable-next-line no-undef
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find the user associated with the email provided by the user
        const user = await UserModel.findOne({
          where: {
            // eslint-disable-next-line object-shorthand
            email: email,
          },
        });
        if (!user) {
          // If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found' });
        }

        // If the passwords match, it returns a value of true.
        const validate = await user.validatePassword(password);
        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }
        // Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// This verifies that the token sent by the user is valid
passport.use(
  new JwtStrategy(
    {
      secretOrKey: `${secret}`,

      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    // eslint-disable-next-line consistent-return
    async (token, done) => {
      try {
        // Find the user associated with the email provided by the user
        const user = await UserModel.findOne({
          where: {
            // eslint-disable-next-line object-shorthand
            email: token.email,
          },
        });
        if (!user) {
          // If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found' });
        }

        // Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        done(error);
      }
    }
  )
);
// end passport middleware

const PORT = process.env.PORT || 3001;

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', {
    successRedirect: '/',
    failureRedirect: '/login'
  }
  ));

app.use('/home', home);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})