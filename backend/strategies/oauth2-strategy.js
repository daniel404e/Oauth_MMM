const OAuth2Strategy = require("passport-oauth2");
const { OAUTH2_CREDENTIALS } = require("../oauth2-config");
const { API_ENDPOINT } = require("../constants");
const { User } = require("../models/user");

// Google
const GoogleOAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: OAUTH2_CREDENTIALS.GOOGLE.authUrl,
    clientID: OAUTH2_CREDENTIALS.GOOGLE.clientId,
    clientSecret: OAUTH2_CREDENTIALS.GOOGLE.clientSecret,
    tokenURL: OAUTH2_CREDENTIALS.GOOGLE.tokenUrl,
    callbackURL: `${API_ENDPOINT}/auth/callback/google`,
    scope: ["profile", "email", "openid"],
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

// Twitter
const TwitterOAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: OAUTH2_CREDENTIALS.TWITTER.authUrl,
    clientID: OAUTH2_CREDENTIALS.TWITTER.clientId,
    clientSecret: OAUTH2_CREDENTIALS.TWITTER.clientSecret,
    tokenURL: OAUTH2_CREDENTIALS.TWITTER.tokenUrl,
    callbackURL: `${API_ENDPOINT}/auth/callback/twitter`,
    scope: ["tweet.read", "users.read"],
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
  fetch(`https://api.twitter.com/2/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((req) => req.json())
    .then((twitterProfile) => {
      const profile = {
        socialId: twitterProfile.id,
        firstName: twitterProfile.given_name,
        lastName: twitterProfile.family_name,
        fullName: twitterProfile.name,
        email: twitterProfile.email,
        provider: "twitter",
      };
      done(null, profile);
    })
    .catch((error) => done(error, null));
};

// LinkedIn
const LinkedInOAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: OAUTH2_CREDENTIALS.LINKEDIN.authUrl,
    clientID: OAUTH2_CREDENTIALS.LINKEDIN.clientId,
    clientSecret: OAUTH2_CREDENTIALS.LINKEDIN.clientSecret,
    tokenURL: OAUTH2_CREDENTIALS.LINKEDIN.tokenUrl,
    callbackURL: `${API_ENDPOINT}/auth/callback/linkedin`,
    scope: ["r_liteprofile", "r_emailaddress"],
    skipUserProfile: false,
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

LinkedInOAuth2Strategy.userProfile = async (accessToken, done) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const profileRes = await fetch("https://api.linkedin.com/v2/me", options);
    if (profileRes.status === 200) {
      const json = await profileRes.json();
      const profile = {
        socialId: json.id,
        firstName: json.localizedFirstName,
        lastName: json.localizedLastName,
        fullName: json.localizedFirstName + " " + json.localizedLastName,
        email: "",
        provider: "linkedin",
      };

      const emailRes = await fetch(
        `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`,
        options
      );
      if (emailRes.status === 200) {
        const data = await emailRes.json();
        if (data.elements && data.elements.length) {
          const emailEl = data.elements[0];
          const email = emailEl["handle~"].emailAddress;
          profile.email = email;
        }
        done(null, profile);

      }
    } else {
      throw profileRes.statusText;
    }
  } catch (error) {
    console.log(`🚀 LinkedIn fetch profile error:`, error);
    done(error, null);
  }

};

module.exports = {
  GoogleOAuth2Strategy,
  TwitterOAuth2Strategy,
  LinkedInOAuth2Strategy,
};
