const Post = require("../models/Post");

const PostController ={
async create(req,res){
try {
const post = await Post.create(req.body)
res.status(201).send(post)
} catch (error) {
console.error(error)

res.status(500).send({ message: 'Ha habido un problema al crear el Post' })
}
},

async getAll(req, res) {
 try {
       const post = await Post.find()
       res.send(post)
       } catch (error) {
       console.error(error);   
}
},
}
module.exports = PostController;