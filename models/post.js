const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tagggedUser: { type: Schema.Types.ObjectId, ref: 'User' },
  location: { type: location,  } 

});

postSchema.set('timestamps', true);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;