const OAuth2Strategy = require("passport-oauth2");
const { OAUTH2_CREDENTIALS } = require("../oauth2-config");
const { API_ENDPOINT, TWITTER_SCOPES } = require("../constants");
const { User } = require("../models/user");

const CONFIDENTIAL_CLIENT_AUTH_TOKEN = Buffer.from(
  `${OAUTH2_CREDENTIALS.TWITTER.clientId}:${OAUTH2_CREDENTIALS.TWITTER.clientSecret}`
).toString("base64");

const TwitterOAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: OAUTH2_CREDENTIALS.TWITTER.authUrl,
    clientID: OAUTH2_CREDENTIALS.TWITTER.clientId,
    clientSecret: OAUTH2_CREDENTIALS.TWITTER.clientSecret,
    tokenURL: OAUTH2_CREDENTIALS.TWITTER.tokenUrl,
    scope: TWITTER_SCOPES,
    pkce: true,
    state: true,
    callbackURL: `${API_ENDPOINT}/auth/callback/twitter`,
    customHeaders: {
      authorization: `Basic ${CONFIDENTIAL_CLIENT_AUTH_TOKEN}`,
    },
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      const user = await User.getOrCreateSocialUser(profile);
      cb(null, user);
    } catch (error) {
      cb(error, null);
    }
  }
);

TwitterOAuth2Strategy.userProfile = (accessToken, done) => {
  fetch(
    `https://api.twitter.com/2/users/me?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,verified_type,withheld`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((req) => req.json())
    .then(({ data: twitterProfile }) => {
      const profile = {
        socialId: twitterProfile.id,
        fullName: twitterProfile.name,
        email: twitterProfile.email,
        provider: "twitter",
        username: twitterProfile.username,
        profile_image: twitterProfile.profile_image_url,
      };
      done(null, profile);
    })
    .catch((error) => done(error, null));
};

module.exports = TwitterOAuth2Strategy;
