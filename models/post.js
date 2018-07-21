const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tagggedUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // location: { type: location, required: true },
  // tagLocation: { type: location, required: true }, 
  comment: { type: String },
  // img: {}
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;