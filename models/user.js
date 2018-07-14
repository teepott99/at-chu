const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// function capitalize(val) {
//   if (typeof val !== 'string') val = '';
//   return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
// };

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
