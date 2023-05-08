module.exports = {
  CLIENT_URL: process.env.CLIENT_URL,
  API_ENDPOINT: process.env.API_ENDPOINT,
  TWITTER_CALLBACK_URL: process.env.TWITTER_CALLBACK_URL,
  TWITTER_SCOPES: [
    "tweet.read",
    "tweet.write",
    "users.read",
    "follows.read",
    "follows.write",
    "offline.access",
  ],
  GOOGLE_SCOPES: ["profile", "email", "openid"],
  LINKEDIN_SCOPES: ["r_liteprofile", "r_emailaddress"],
};
