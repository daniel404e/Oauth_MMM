const OAuth2Strategy = require("passport-oauth2");
const { OAUTH2_CREDENTIALS } = require("../oauth2-config");
const { API_ENDPOINT, GOOGLE_SCOPES } = require("../constants");
const { User } = require("../models/user");

// Google
const GoogleOAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: OAUTH2_CREDENTIALS.GOOGLE.authUrl,
    clientID: OAUTH2_CREDENTIALS.GOOGLE.clientId,
    clientSecret: OAUTH2_CREDENTIALS.GOOGLE.clientSecret,
    tokenURL: OAUTH2_CREDENTIALS.GOOGLE.tokenUrl,
    callbackURL: `${API_ENDPOINT}/auth/callback/google`,
    scope: GOOGLE_SCOPES,
  },
  async function (accessToken, refreshToken, results, profile, cb) {
    try {
      const user = await User.getOrCreateSocialUser(profile);
      cb(null, user);
    } catch (error) {
      cb(error, null);
    }
  }
);

GoogleOAuth2Strategy.userProfile = (accessToken, done) => {
  fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((req) => req.json())
    .then((googleProfile) => {
      const profile = {
        socialId: googleProfile.id,
        firstName: googleProfile.given_name,
        lastName: googleProfile.family_name,
        fullName: googleProfile.name,
        email: googleProfile.email,
        provider: "google",
      };
      done(null, profile);
    })
    .catch((error) => done(error, null));
};

module.exports = GoogleOAuth2Strategy;
