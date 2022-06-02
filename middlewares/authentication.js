const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const Comment = require("../models/Comment");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "No estas autorizado perla" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Ha habido un problema con el token" });
  }
};
const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "No pasarás por aqui!!!",
    });
  }
  next();
};

const isAuthor = async(req, res, next) => {
    try {
        const order = await Comment.findById(req.params._id);
        if (order.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'Este comentario no es tuyo' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del pedido' })
    }
}

module.exports = { authentication, isAdmin,isAuthor };