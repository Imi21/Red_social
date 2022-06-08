const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const bcrypt = require('bcrypt');
const transporter = require("../config/nodemailer");
const saltRounds = 0;

const UserController = {
  async register(req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password,saltRounds);
      
      const user = await User.create({ 
        ...req.body,
        confirmed: false,
        role: "user",
         });
         const url = 'http://localhost:8080/users/confirm/'+ req.body.email
         await transporter.sendMail({

          to: req.body.email,
          subject: "Confirme su registro",
          html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
          <a href="#"> Click para confirmar tu registro</a>`,
          });

      res.send({ message: "Confirma el correo en tu email", user });
    } catch (error) {
      error.origin = 'User';
      next(error)
    }
  },

  async confirm(req,res){

    try {
    const user = await User.updateOne({confirmed:true},{
    where:{
    email: req.params.email
    }
    })
    res.status(201).send( "Usuario confirmado con exito" );
    } catch (error) {
    console.error(error)
    }
    },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      const token = jwt.sign({ _id: user._id }, jwt_secret); 
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },



  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id).populate("postsIds")
     
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserController;