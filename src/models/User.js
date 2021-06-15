const User = require("../mongooseModels/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async signup(data) {
    var userToSave = {
      name: data.name,
      email: data.email,
      password: await bcrypt.hash(data.password, 8),
      _id: ObjectId(),
    };
    userToSave = new User(userToSave);
    return await this.genratejwtToken(userToSave);
  },

  async genratejwtToken(user) {
    const token = jwt.sign({ _id: user._id }, "jwtKey");
    user.token = token;
    await user.save();
    return { name: user.name, email: user.email, token };
  },

  async login(data) {
    const user = await User.findOne({ email: data.email });
    if (user && user._id) {
      var isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
        user.token = jwt.sign({ _id: user._id }, "jwtKey");
        await user.save();
        return { email: user.email, token: user.token };
      }
    } else {
      return "User not found";
    }
  },
};
