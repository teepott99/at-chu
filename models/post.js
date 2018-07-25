const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function capitalize(val) {   
  if (typeof val !== 'string') val = '';
     return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase(); 
    };

const postSchema = new Schema({
  
  name: {
    type: String,
    set: capitalize,
    required: true,
  },
  location: {
    name: String,
    // set: capitalize,
    type: { type: String}, 
    // required: true,
    coordinates: [Number]},
  tagged: {
    type: String,
    set: capitalize,
    required: true,
  },
  tagLocation: {
    name: String,
    // set: capitalize,
    type: { type: String}, 
    // required: true,
    coordinates: [Number]},
  comment: String ,
  // img: {}
}, 
{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;