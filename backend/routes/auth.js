const express = require("express");
const passport = require("passport");
const {
  CLIENT_URL,
  TWITTER_SCOPES,
  LINKEDIN_SCOPES,
  GOOGLE_SCOPES,
} = require("../constants");
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

router.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      message: "User Authenticated",
      user: req.user,
    });
  } else
    res.status(400).json({
      message: "User Not Authenticated",
      user: null,
    });
});

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Logout");
    req.logout({ keepSessionInfo: false }, (error) => {
      if (error) {
        console.log("Cannot log out:", error);
      }
      console.log("Logged out");
    });
  } else {
    return res.json({ message: "Already logout" });
  }
  res.redirect(CLIENT_URL);
});

module.exports = router;
