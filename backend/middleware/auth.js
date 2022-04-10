const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    // Recup du token
    const token = req.headers.authorization;

    // Decodage du token (-> objet js)
    const decodedToken = jwt.verify(token, process.env.TOKEN);

    // Recup du userId dedans
    const userId = decodedToken.userId;

    const result = await User.findOne(userId);
    const user = result[0][0];

    req.auth = user;
    if (result && user.id !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: "unauthorized request",
    });
  }
};
