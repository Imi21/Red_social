const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const CommentSchema = new mongoose.Schema({
author: String,
message: String,
date: Date,
postId: { 
    type: ObjectId,
    ref: 'Post'
    },
}, { timestamps: true });
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;