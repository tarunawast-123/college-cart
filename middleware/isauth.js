const { get } = require("jquery");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.get("authorization");
  let decodedtoken = jwt.verify(token, "94DHWWHEdjfksk54ihe3#*^!382");
  if (decodedtoken) {
    req.userId = decodedtoken.userId;
    console.log(
      "*********************************************************" + req.userId
    );
    next();
  } else {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }
};
