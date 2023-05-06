const express = require("express");
const passport = require("passport");
const { CLIENT_URL } = require("../constants");
const router = express.Router();

// Generate Authorization URL and redirect
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["tweet.read", "users.read"],
  })
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_liteprofile", "r_emailaddress"],
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
