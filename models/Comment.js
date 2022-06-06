const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const CommentSchema = new mongoose.Schema({
    message: String,
    userId: {
      type: ObjectId,
      ref: "User",
    },
    msgDate: Date,
    postIds: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;