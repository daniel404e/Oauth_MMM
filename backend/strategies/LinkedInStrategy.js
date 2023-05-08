const OAuth2Strategy = require("passport-oauth2");
const { OAUTH2_CREDENTIALS } = require("../oauth2-config");
const { API_ENDPOINT, LINKEDIN_SCOPES } = require("../constants");
const { User } = require("../models/user");

// LinkedIn
const LinkedInOAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: OAUTH2_CREDENTIALS.LINKEDIN.authUrl,
    clientID: OAUTH2_CREDENTIALS.LINKEDIN.clientId,
    clientSecret: OAUTH2_CREDENTIALS.LINKEDIN.clientSecret,
    tokenURL: OAUTH2_CREDENTIALS.LINKEDIN.tokenUrl,
    callbackURL: `${API_ENDPOINT}/auth/callback/linkedin`,
    scope: LINKEDIN_SCOPES,
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

module.exports = LinkedInOAuth2Strategy;
