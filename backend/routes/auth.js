const express = require("express");
const passport = require("passport");
const {
  CLIENT_URL,
  TWITTER_SCOPES,
  LINKEDIN_SCOPES,
  GOOGLE_SCOPES,
} = require("../constants");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { User } = require("../models/user");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const router = express.Router();

// Generate Authorization URL and redirect
router.get(
  "/google",
  passport.authenticate("google", { scope: GOOGLE_SCOPES })
);

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: TWITTER_SCOPES,
  })
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: LINKEDIN_SCOPES,
  })
);

// End redirect

router.get("/success", isAuthenticated, (req, res) => {
  res.json({
    message: "User Authenticated",
    user: req.user,
  });
});

router.post(
  "/oauth-complete",
  isAuthenticated,
  body("phoneNumber").isMobilePhone(),
  validate,
  async (req, res) => {
    const { phoneNumber } = req.body;
    const draftUser = req.user;
    delete draftUser.status;
    const user = await new User({
      ...draftUser,
      phoneNumber,
    }).save();
    res.json({ ...user.toJSON() });
  }
);

router.get("/logout", isAuthenticated, (req, res) => {
  console.log("Logout");
  req.logout({ keepSessionInfo: false }, (error) => {
    if (error) {
      console.log("Cannot log out:", error);
    }
    console.log("Logged out");
  });
  res.redirect(CLIENT_URL);
});

module.exports = router;
