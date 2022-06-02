const Comment = require("../models/Comment");

const CommentController = {

    async create(req, res) {
    try {
    const comment = await Comment.create({...req.body, 
    author: req.user._id,
    message: req.body,message,
    date: new Date(),
    
    })
    await User.findByIdAndUpdate(req.user._id, { $push: { orderIds: order._id } })
    res.status(201).send(order)
    } catch (error) {
    console.error(error);
    }
    }
}

module.exports = CommentController;