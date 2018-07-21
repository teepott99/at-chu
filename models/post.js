const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  
  name: String,
  // { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  
  taggged: String,
  // { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  tagLocation: { type: String, required: true }, 
  comment: { type: String },
  // img: {}
}, 
{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;