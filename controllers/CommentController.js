const Comment = require("../models/Comment.js");
const User = require("../models/User.js");

const CommentController = {
  async create(req, res) {
    try {
        const comment = await Comment.create({...req.body,
            message: req.body.message,
            deliveryDate: new Date(),
            userId: req.user._id
        })
        await User.findByIdAndUpdate(req.user._id, { $push: { commentIds: comment._id } })
        res.status(201).send(comment)
    } catch (error) {
        console.error(error);
    }
},

  async update(req, res) {
    try {
      const ocomment = await Comment.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        {
          new: true,
        }
      );
      res.send({ message: "comment successfully updated", comment });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = CommentController;