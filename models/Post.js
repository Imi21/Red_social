const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, "Por favor rellena el tiutlo del post"],
      },
    body: {
        type: String,
        required: [true, "Por favor rellena el precio del producto"],
      },
    comments: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String
    }],
    likes: [{ type: ObjectId }],
}, { timestamps: true });


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;