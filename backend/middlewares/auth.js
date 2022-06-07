const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      throw generateError("Falta Authorizacion", 401);
    }

    //// token
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("token incorrecto", 401);
    }
    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
