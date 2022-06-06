const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
title: String,
body: String,
likes: [{ type: ObjectId }],
}, { timestamps: true });


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;