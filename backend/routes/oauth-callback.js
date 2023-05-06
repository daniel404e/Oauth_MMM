const express = require("express");
const passport = require("passport");
const { CLIENT_URL } = require("../constants");
const router = express.Router();

/* GET users listing. */
router.get(
  "/google",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL + "/dashboard",
    failureRedirect: CLIENT_URL + "/login",
  })
);

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_URL + "/dashboard",
    failureRedirect: CLIENT_URL + "/login",
  })
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    successRedirect: CLIENT_URL + "/dashboard",
    failureRedirect: CLIENT_URL + "/login",
  })
);

module.exports = router;
