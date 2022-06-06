const Post = require("../models/Post");
const User = require("../models/User");

const PostController ={

async create(req,res){
try {
if(!req.body.title || !req.body.body){res.status(400).send({ message: 'Te faltan datos fiera' })}     
const post = await Post.create(req.body)
res.status(201).send(post)
} catch (error) {
console.error(error)

res.status(500).send({ message: 'Ha habido un problema al crear el Post' })
}
},

async getAll(req, res) {
      try {
        const { page = 1, limit = 10 } = req.query;
        const posts = await Post.find()
          .populate("reviews.userId")
          .limit(limit * 1)
          .skip((page - 1) * limit);
        res.send(posts);
      } catch (error) {
        console.error(error);
      }
    },

async delete(req, res) {

      try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: 'Post deleted' })
            } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the post' })
}
},

async update(req, res) {
      try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "post successfully updated", post });  
            } catch (error) {  
            console.error(error);
}
},

async getPostByTitle(req, res) {

      try {
      if (req.params.title.length>20){
      return res.status(400).send('Busqueda demasiado larga')
      }
      const title = new RegExp(req.params.title, "i");
      const post = await Post.find({title});
      res.send(post);
      } catch (error) {
      console.log(error);
      }
      },


async getById(req, res) {
      try {
      const post = await Post.findById(req.params._id)
      res.send(post)
      } catch (error) {
      console.error(error); 
      }
      },

async insertComment(req, res) {
      try {
      const post = await Post.findByIdAndUpdate(
      req.params._id,
      { $push: { comments: { ...req.body, userId: req.user._id } } },
      { new: true }
      );
      res.send(post);
      } catch (error) {
      console.error(error);
      res.status(500).send({ message: "No se ha podido comentar" });
      }
      },
async like(req, res) {
  try {
      const existProduct = await Post.findById(req.params._id)
      if (!existProduct.likes.includes(req.user._id)){
      const post = await Post.findByIdAndUpdate(
      req.params._id,
      { $push: { likes: req.user._id } },
      { new: true }
      )
          
  await User.findByIdAndUpdate(
      req.user._id,
      { $push: { likes: req.params._id } },
      { new: true }
      );
      res.send(post);
      }
      else {
      res.status(400).send({message: 'Solo un ike por usuario'})
      }
        
        
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "No se ha podido dar like" });
      }
      },
}
module.exports = PostController;