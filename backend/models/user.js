const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    socialId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    provider: {
      type: String,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    profile_image: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    statics: {
      async getOrCreateSocialUser(serializedSocialProfile) {
        const user = await this.findOne({
          socialId: serializedSocialProfile.socialId,
        });
        if (user) {
          return user;
        } else {
          const newUser = await this.create(serializedSocialProfile);
          return newUser;
        }
      },
      async getUserDocument(id) {
        const user = await this.findOne({ $or: [{ socialId: id }, { id }] });
        return user;
      },
    },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
