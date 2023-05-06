const { config } = require("dotenv");
config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const users = require("./routes/users");
const oauth2Callback = require("./routes/oauth-callback");
const auth = require("./routes/auth");

const cors = require("cors");

const { CLIENT_URL } = require("./constants");
const connectDB = require("./db");
const {
  GoogleOAuth2Strategy,
  TwitterOAuth2Strategy,
  LinkedInOAuth2Strategy,
} = require("./strategies/oauth2-strategy");
const { User } = require("./models/user");

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(
  session({
    secret: "Rwqapoqqwe@#1111bcbc",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());

app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth/callback", oauth2Callback);

passport.serializeUser((user, done) => {
  done(null, user.socialId || user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ $or: [{ socialId: id }, { id }] }).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
  });
});

passport.use("google", GoogleOAuth2Strategy);
passport.use("twitter", TwitterOAuth2Strategy);
passport.use("linkedin", LinkedInOAuth2Strategy);

module.exports = app;
