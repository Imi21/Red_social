const Post = require("../models/Post");

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
       const post = await Post.find().limit(10).
       res.send(post)
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

async like(req, res) {
      try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body.likes, { new: true })
      res.send({ message: "you like this post", post });  
      } catch (error) {  
      console.error(error);
      }
      }      

}
module.exports = PostController;